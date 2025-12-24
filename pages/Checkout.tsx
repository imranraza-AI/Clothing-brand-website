import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
     navigate('/cart');
     return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/tracking?order=ORD-2024-8832');
    }, 2000);
  };

  const inputClasses = "w-full bg-black border border-gray-600 rounded-sm px-4 py-3 text-white font-bold placeholder-gray-500 focus:outline-none focus:border-white transition-colors";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-gray-900 mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Form */}
        <div>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Contact Information</h3>
              <input required type="email" placeholder="Email Address" className={inputClasses} />
            </div>

            {/* Shipping */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className={`${inputClasses} col-span-1`} />
                <input required type="text" placeholder="Last Name" className={`${inputClasses} col-span-1`} />
                <input required type="text" placeholder="Address" className={`${inputClasses} col-span-2`} />
                <input required type="text" placeholder="City" className={`${inputClasses} col-span-1`} />
                <input required type="text" placeholder="Zip Code" className={`${inputClasses} col-span-1`} />
              </div>
            </div>

            {/* Payment (Mock) */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Payment</h3>
              <div className="flex gap-4">
                <div className="border border-black bg-gray-50 px-6 py-4 rounded-sm flex-1 text-center font-medium cursor-pointer">
                  Credit Card
                </div>
                <div className="border border-gray-200 px-6 py-4 rounded-sm flex-1 text-center text-gray-500 cursor-not-allowed">
                  Razorpay
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <input required type="text" placeholder="Card Number" className={inputClasses} />
                <div className="grid grid-cols-2 gap-4">
                   <input required type="text" placeholder="MM / YY" className={`${inputClasses} col-span-1`} />
                   <input required type="text" placeholder="CVC" className={`${inputClasses} col-span-1`} />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-8 rounded-sm h-fit">
           <h3 className="text-lg font-medium text-gray-900 mb-6">Your Order</h3>
           <div className="space-y-4 mb-8">
             {cart.map(item => (
               <div key={item.id + item.selectedSize} className="flex justify-between text-sm">
                 <span className="text-gray-600">{item.name} x {item.quantity}</span>
                 <span className="font-medium text-gray-900">${item.price * item.quantity}</span>
               </div>
             ))}
           </div>
           
           <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold">
             <span>Total</span>
             <span>${(cartTotal * 1.08).toFixed(2)}</span>
           </div>

           <button 
             form="checkout-form"
             type="submit"
             disabled={isProcessing}
             className="w-full mt-8 bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm disabled:bg-gray-400"
           >
             {isProcessing ? 'Processing...' : 'Place Order'}
           </button>
           <p className="text-xs text-gray-400 text-center mt-4">This is a mock checkout. No real payment will be processed.</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;