import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { getQuickStyleAdvice } from '../services/geminiService';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [styleTip, setStyleTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);

  if (!product) {
    return <div className="p-12 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color.");
      return;
    }
    setIsAdding(true);
    // Simulate network delay for nice UX
    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor);
      setIsAdding(false);
      navigate('/cart');
    }, 600);
  };

  const handleGetStyleTip = async () => {
    setLoadingTip(true);
    try {
      const tip = await getQuickStyleAdvice(product.name);
      setStyleTip(tip);
    } catch (e) {
      console.error(e);
      setStyleTip("Pair this with confidence and simple accessories.");
    } finally {
      setLoadingTip(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <div className="bg-gray-100 aspect-[3/4] rounded-sm overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <h1 className="text-4xl font-serif text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-medium text-gray-900 mb-8">${product.price}</p>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>
          
          {/* AI Tip Section */}
          <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-lg">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Style Guide</span>
                <button 
                  onClick={handleGetStyleTip} 
                  disabled={loadingTip}
                  className="text-xs text-black underline hover:text-gray-600 disabled:opacity-50"
                >
                  {styleTip ? 'Refresh Tip' : 'Get Style Tip'}
                </button>
             </div>
             {loadingTip ? (
                <p className="text-sm text-gray-500 animate-pulse">Consulting the stylist...</p>
             ) : (
                <p className="text-sm text-gray-800 italic">
                  {styleTip || "Click 'Get Style Tip' for a quick AI-powered suggestion on how to wear this."}
                </p>
             )}
          </div>

          <div className="space-y-6">
            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color: <span className="text-gray-900">{selectedColor}</span></label>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-none ${
                      selectedColor === color ? 'border-black' : 'border-transparent hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() === 'white' ? '#f0f0f0' : color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size: <span className="text-gray-900">{selectedSize}</span></label>
              <div className="grid grid-cols-5 gap-2 w-full max-w-sm">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border rounded-sm transition-all ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 text-gray-900 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-4 px-8 flex items-center justify-center text-base font-bold uppercase tracking-widest text-white transition-all rounded-sm ${
                isAdding ? 'bg-gray-800 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
              }`}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;