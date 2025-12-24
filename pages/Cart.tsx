import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 py-6 border-b border-gray-100">
              <div className="w-24 h-32 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900"><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                    <p className="text-lg font-medium text-gray-900">${item.price * item.quantity}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                </div>

                <div className="flex justify-between items-end">
                   <div className="flex items-center border border-gray-200 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="px-3 py-1 text-gray-600 hover:text-black"
                      >-</button>
                      <span className="px-2 py-1 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black"
                      >+</button>
                   </div>
                   <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="text-sm text-red-500 hover:text-red-700 underline"
                   >
                     Remove
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-sm h-fit">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (Est.)</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">${(cartTotal * 1.08).toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full mt-8 bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
