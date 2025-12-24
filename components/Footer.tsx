import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-valvaire-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-xl font-serif">VALVAIRE</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Timeless styles for the modern individual. Quality materials, ethical production, and understated elegance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#/shop" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#/shop" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#/shop" className="hover:text-white transition-colors">Essentials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Join our list for exclusive drops.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:outline-none focus:border-white w-full transition-colors"
              />
              <button className="ml-2 text-sm font-semibold uppercase tracking-wide hover:text-gray-300">Join</button>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Valvaire. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;