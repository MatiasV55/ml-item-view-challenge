export interface User {
  id: string;
  name: string;
  email: string;
  rating?: number;
}

export interface Review {
  user: User;
  rating: number;
  comment: string;
}

export interface Item {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  images: string[];
  seller: User;
  stock: number;
  reviews: Review[];
}
