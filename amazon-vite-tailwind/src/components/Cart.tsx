import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { currencyFormat } from '../dataHelpers';
import { Link } from 'react-router-dom';

type CartItem = Product & { qty: number; };

export default function Cart(){
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(()=> setCart(JSON.parse(localStorage.getItem('cart') || '[]')), []);

  const updateQty = (id: string, qty: number) => {
    const newC = cart.map(i => i._id === id ? {...i, qty} : i);
    setCart(newC);
    localStorage.setItem('cart', JSON.stringify(newC));
  };
  const removeItem = (id:string) => {
    const newC = cart.filter(i => i._id !== id);
    setCart(newC);
    localStorage.setItem('cart', JSON.stringify(newC));
  };

  const total = cart.reduce((s,i) => s + i.qty * i.price, 0);
  if (!cart.length) return <div className="text-center py-20"><h3>Cart is empty</h3><Link to="/" className="text-amber-600">Go shopping</Link></div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your cart</h2>
      {cart.map(item => (
        <div key={item._id} className="bg-white p-4 rounded-lg flex items-center gap-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">{currencyFormat(item.price)}</div>
            <div className="mt-2">
              Qty: <input type="number" className="border rounded w-20 p-1" value={item.qty} min={1} onChange={e=>updateQty(item._id, Math.max(1, Number(e.target.value)))} />
              <button className="ml-3 text-sm text-red-600" onClick={()=>removeItem(item._id)}>Remove</button>
            </div>
          </div>
          <div className="font-semibold">{currencyFormat(item.price * item.qty)}</div>
        </div>
      ))}
      <div className="text-right">
        <div className="text-lg font-bold">Total: {currencyFormat(total)}</div>
        <button className="btn btn-primary mt-3" onClick={()=>alert('Checkout placeholder')}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
