import axios from 'axios';
import { Product } from './types';

const API = axios.create({ baseURL: '' });

export async function fetchProducts(): Promise<Product[]> {
  const res = await API.get<Product[]>('/products.json');
  return res.data;
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  const products = await fetchProducts();
  return products.find(p => p._id === id);
}
