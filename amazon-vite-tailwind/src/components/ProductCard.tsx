// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { currencyFormat } from '../dataHelpers';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="card p-3">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-md" />
      </Link>
      <div className="mt-3">
        <Link to={`/product/${product._id}`} className="font-medium text-gray-800 line-clamp-2">
          {product.name}
        </Link>
        <div className="text-sm text-yellow-600 mt-1">
          {(product.rating ?? 0).toFixed(1)} ★ <span className="text-gray-400 text-xs">({product.numReviews})</span>
        </div>
        <div className="mt-2 text-lg font-semibold">{currencyFormat(product.price)}</div>
        <div className="mt-3 flex gap-2">
          <Link to={`/product/${product._id}`} className="btn btn-primary text-sm">View</Link>
        </div>
      </div>
    </div>
  );
}
