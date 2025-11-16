import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import { currencyFormat } from '../dataHelpers';
import { Product } from '../types';

export default function ProductPage(){
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => { if (id) fetchProductById(id).then(p => setProduct(p ?? null)); }, [id]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as (Product & { qty: number })[];
    const idx = cart.findIndex(i=>i._id === product._id);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({...product, qty: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    nav('/cart');
  };

  const addToWishlist = () => {
    const w = JSON.parse(localStorage.getItem('wishlist') || '[]') as Product[];
    if (!w.find(i=>i._id === product._id)) w.push(product);
    localStorage.setItem('wishlist', JSON.stringify(w));
    alert('Added to wishlist');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm grid lg:grid-cols-2 gap-6">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-md" />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-yellow-600 mt-2">{(product.rating ?? 0).toFixed(1)} ★ ({product.numReviews})</div>
        <div className="text-2xl font-bold my-4">{currencyFormat(product.price)}</div>
        <p className="text-gray-700">{product.description}</p>
        <div className="mt-4">Stock: {product.countInStock}</div>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
          <button className="btn btn-ghost" onClick={addToWishlist}>Wishlist</button>
        </div>
      </div>
    </div>
  );
}
