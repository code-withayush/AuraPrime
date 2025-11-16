// src/components/Filters.tsx
import React from 'react';
import { Product } from '../types';

interface FiltersType {
  category: string;
  sort: string;
  min: number;
  max: number;
  query?: string;
  rating?: string;
}

interface Props {
  setFilters: (fn: (f: FiltersType) => FiltersType) => void;
  filters: FiltersType;
  products: Product[];
}

export default function Filters({ setFilters, filters, products }: Props) {
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="font-medium mb-2">Category</h4>
      <select
        className="w-full border rounded-md p-2 mb-3"
        value={filters.category}
        onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
      >
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <h4 className="font-medium mb-2">Price</h4>
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          placeholder="Min"
          className="w-1/2 border rounded-md p-2"
          value={filters.min || ''}
          onChange={e => setFilters(f => ({ ...f, min: Number(e.target.value || 0) }))}
        />
        <input
          type="number"
          placeholder="Max"
          className="w-1/2 border rounded-md p-2"
          value={filters.max || ''}
          onChange={e => setFilters(f => ({ ...f, max: Number(e.target.value || 0) }))}
        />
      </div>

      <h4 className="font-medium mb-2">Rating</h4>
      <select
        className="w-full border rounded-md p-2"
        value={filters.rating || ''}
        onChange={e => setFilters(f => ({ ...f, rating: e.target.value }))}
      >
        <option value="">Any</option>
        <option value="4">4+</option>
        <option value="4.5">4.5+</option>
      </select>

      <h4 className="font-medium mb-2 mt-4">Sort</h4>
      <select
        className="w-full border rounded-md p-2"
        value={filters.sort}
        onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
}
