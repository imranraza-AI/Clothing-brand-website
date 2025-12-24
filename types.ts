export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isTrending?: boolean;
  gender: 'men' | 'women' | 'unisex';
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Ordered' | 'Packed' | 'Shipped' | 'Delivered';
  items: CartItem[];
  total: number;
}

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};