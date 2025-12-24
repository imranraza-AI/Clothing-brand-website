import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Essential Oversized Tee',
    price: 45,
    category: 'T-shirts',
    image: 'https://picsum.photos/600/800?random=1',
    description: 'Crafted from heavyweight organic cotton, this oversized tee redefines everyday comfort with a boxy, modern silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Sand'],
    isNew: true,
    isTrending: true,
    gender: 'unisex'
  },
  {
    id: '2',
    name: 'Structured Wool Coat',
    price: 280,
    category: 'Outerwear',
    image: 'https://picsum.photos/600/800?random=2',
    description: 'A timeless wool blend coat featuring a tailored fit, notched lapels, and a minimal single-breasted closure.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Camel'],
    isTrending: true,
    gender: 'women'
  },
  {
    id: '3',
    name: 'Relaxed Fit Cargo Trousers',
    price: 120,
    category: 'Bottoms',
    image: 'https://picsum.photos/600/800?random=3',
    description: 'Utility meets luxury. These cargo trousers offer a relaxed fit with subtle pockets and premium hardware.',
    sizes: ['30', '32', '34', '36'],
    colors: ['Olive', 'Black'],
    isNew: true,
    gender: 'men'
  },
  {
    id: '4',
    name: 'Merino Knit Sweater',
    price: 150,
    category: 'Sweatshirts',
    image: 'https://picsum.photos/600/800?random=4',
    description: 'Ultra-soft merino wool knit designed for layering. Lightweight yet warm, perfect for transitional seasons.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Grey', 'Cream'],
    gender: 'unisex'
  },
  {
    id: '5',
    name: 'Everyday Oxford Shirt',
    price: 85,
    category: 'Shirts',
    image: 'https://picsum.photos/600/800?random=5',
    description: 'The classic button-down, elevated. Crisp cotton oxford fabric with a tailored fit that looks good tucked or untucked.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue'],
    gender: 'men'
  },
  {
    id: '6',
    name: 'Technical Bomber Jacket',
    price: 195,
    category: 'Outerwear',
    image: 'https://picsum.photos/600/800?random=6',
    description: 'Water-resistant nylon shell with a minimal aesthetic. Ribbed cuffs and hem provide a secure fit.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    isTrending: true,
    gender: 'unisex'
  }
];

export const CATEGORIES = ['All', 'T-shirts', 'Sweatshirts', 'Outerwear', 'Bottoms'];