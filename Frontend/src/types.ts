export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  category: string;
  rating?: number;
  numReviews?: number;
  image?: string;
}
