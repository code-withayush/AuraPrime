// src/App.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import { fetchProducts } from './api';
import { Product } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  // derive categories once from products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => { if (p.category) set.add(p.category); });
    return ['All', ...Array.from(set)];
  }, [products]);

  return (
    <div>
      {/* pass categories into header */}
      <Header categories={categories} />

      <main className="container py-6">
        <Routes>
          <Route path="/" element={<ProductGrid products={products} categories={categories} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
