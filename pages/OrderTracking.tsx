import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OrderTracking: React.FC = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'found'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('order');
    if (id) {
      setOrderId(id);
      setStatus('found'); // Simulate auto-find
    }
  }, [location]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setStatus('searching');
    setTimeout(() => setStatus('found'), 1000);
  };

  const steps = [
    { label: 'Ordered', date: 'Oct 24', completed: true },
    { label: 'Packed', date: 'Oct 25', completed: true },
    { label: 'Shipped', date: 'Oct 26', completed: false, current: true },
    { label: 'Delivered', date: 'Est. Oct 28', completed: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-gray-500">Enter your order ID to see the current status.</p>
      </div>

      <div className="max-w-md mx-auto mb-16">
        <form onSubmit={handleTrack} className="flex gap-2">
          <input 
            type="text" 
            value={orderId} 
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. ORD-2024-8832" 
            className="flex-1 border border-gray-300 px-4 py-3 rounded-sm focus:outline-none focus:border-black uppercase"
          />
          <button type="submit" className="bg-black text-white px-6 py-3 font-medium uppercase tracking-wider rounded-sm hover:bg-gray-800">
            Track
          </button>
        </form>
      </div>

      {status === 'searching' && (
        <div className="text-center text-gray-500 animate-pulse">Searching for order...</div>
      )}

      {status === 'found' && (
        <div className="bg-white border border-gray-100 shadow-xl rounded-lg p-8 md:p-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order #{orderId}</h2>
              <p className="text-gray-500 text-sm">Placed on October 24, 2024</p>
            </div>
            <span className="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              In Transit
            </span>
          </div>

          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
            
            <div className="flex flex-col md:flex-row justify-between relative">
              {steps.map((step, idx) => (
                <div key={step.label} className="flex md:flex-col items-center mb-8 md:mb-0 relative z-10 group">
                  
                  {/* Vertical Line for Mobile */}
                  {idx !== steps.length - 1 && (
                     <div className="absolute left-4 top-8 bottom-[-32px] w-0.5 bg-gray-200 md:hidden"></div>
                  )}

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step.completed ? 'bg-black border-black text-white' : 
                    step.current ? 'bg-white border-black text-black' : 'bg-white border-gray-300 text-gray-300'
                  }`}>
                    {step.completed ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <span className="text-xs">{idx + 1}</span>
                    )}
                  </div>
                  
                  <div className="ml-4 md:ml-0 md:mt-4 text-left md:text-center">
                    <p className={`text-sm font-bold ${step.completed || step.current ? 'text-black' : 'text-gray-400'}`}>{step.label}</p>
                    <p className="text-xs text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
