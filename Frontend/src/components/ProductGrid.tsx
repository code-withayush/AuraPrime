// src/components/ProductGrid.tsx
import React, { useMemo, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';

function useQuery() { return new URLSearchParams(useLocation().search); }

type FiltersType = {
  category: string;
  sort: string;
  min: number;
  max: number;
  rating?: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const location = useLocation();
  const qparams = useQuery();
  const urlQuery = qparams.get('q') || '';
  const urlCat = qparams.get('cat') || '';
  const urlExact = qparams.get('exact') === '1';

  const [page, setPage] = useState(1);
  const perPage = 12;

  const [filters, setFilters] = useState<FiltersType>({
    category: 'All',
    sort: 'newest',
    min: 0,
    max: 0,
    rating: ''
  });

  // Sync filters.category with URL category when URL changes (header sets cat param)
  useEffect(() => {
    // Only update if URL has category and it's different from current filters.category
    if (urlCat && urlCat !== filters.category) {
      setFilters(prev => ({ ...prev, category: urlCat }));
    }
    // If URL doesn't have category but filters.category is not All, keep as is
    // (so header can clear urlCat to show all)
    // Also reset page when URL or category/query changes
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // run whenever the URL query string changes

  // Use combined where URL query/category override component filters when present
  const combined = {
    ...filters,
    query: urlQuery,
    // prefer urlCat if present otherwise local filter
    category: urlCat || filters.category,
    exact: urlExact
  };

  const filtered = useMemo(() => {
    let data = products.slice();

    // TEXT SEARCH (supports exact via urlExact)
    if (combined.query) {
      const qRaw = combined.query.trim();
      const exactMode = combined.exact === true;
      if (exactMode) {
        const qLower = qRaw.toLowerCase();
        data = data.filter(p =>
          (p.name.toLowerCase() === qLower) ||
          (p.description && p.description.toLowerCase().includes(qLower))
        );
      } else {
        const low = qRaw.toLowerCase();
        data = data.filter(p =>
          p.name.toLowerCase().includes(low) ||
          (p.description && p.description.toLowerCase().includes(low))
        );
      }
    }

    // CATEGORY
    if (combined.category && combined.category !== 'All') {
      data = data.filter(p => p.category === combined.category);
    }

    // PRICE bounds
    if (combined.min) data = data.filter(p => p.price >= combined.min);
    if (combined.max) data = data.filter(p => p.price <= combined.max);

    // RATING filter (if set in filters)
    if ((combined as any).rating) {
      const minRating = parseFloat((combined as any).rating);
      if (!isNaN(minRating)) data = data.filter(p => (p.rating ?? 0) >= minRating);
    }

    // SORTING
    if (combined.sort === 'price-asc') data.sort((a, b) => a.price - b.price);
    if (combined.sort === 'price-desc') data.sort((a, b) => b.price - a.price);
    if (combined.sort === 'rating') data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (combined.sort === 'newest') data.sort((a, b) => (b._id > a._id ? 1 : -1));

    return data;
  }, [products, combined]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="grid-page">
      <div className="grid lg:grid-cols-6 gap-6">
        <aside className="lg:col-span-1">
          {/* Pass filters and setter so the Filters panel remains functional */}
          <Filters setFilters={setFilters} filters={filters} products={products} />
        </aside>

        <section className="lg:col-span-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">{total} results</div>
            <div>
              <select
                className="border rounded-md px-2 py-1"
                value={filters.sort}
                onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map(p => <ProductCard key={p._id} product={p} />)}
          </div>

          <div className="mt-6">
            <Pagination page={page} pages={pages} setPage={setPage} />
          </div>
        </section>
      </div>
    </div>
  );
}
