import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-gray-100 rounded-sm aspect-[3/4]">
        {/* Badge */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10">
            New
          </span>
        )}
        {product.isTrending && !product.isNew && (
          <span className="absolute top-2 left-2 bg-black/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10">
            Trending
          </span>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
           <button className="w-full bg-white text-black py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
             View Details
           </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
