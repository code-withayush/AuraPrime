import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

export default function Wishlist(){
  const [w, setW] = useState<Product[]>([]);
  useEffect(()=> setW(JSON.parse(localStorage.getItem('wishlist') || '[]')), []);
  if (!w.length) return <div className="text-center py-20"><h3>Wishlist is empty</h3><Link to="/" className="text-amber-600">Browse products</Link></div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {w.map(item => (
        <div key={item._id} className="bg-white p-4 rounded shadow-sm">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
          <div className="mt-3">
            <Link to={`/product/${item._id}`} className="font-medium">{item.name}</Link>
            <div className="text-sm text-gray-600 mt-1">₹ {item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
