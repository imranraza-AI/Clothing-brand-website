import React from 'react';
import { Link } from 'react-router-dom';

const Collections: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white py-12 md:py-20 text-center px-4">
         <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">The Collections</h1>
         <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
           Curated essentials for every aspect of your life. Explore our dedicated lines for men and women.
         </p>
      </div>

      {/* Men's Collection */}
      <section className="relative h-[70vh] w-full overflow-hidden group cursor-pointer">
        <Link to="/shop?gender=men" className="block w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=2000&auto=format&fit=crop" 
            alt="Men's Collection" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
             <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Spring / Summer 2025</span>
             <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8">Men's Collection</h2>
             <span className="inline-block border border-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors bg-black/20 backdrop-blur-sm">
               Shop Men
             </span>
          </div>
        </Link>
      </section>

      {/* Women's Collection */}
      <section className="relative h-[70vh] w-full overflow-hidden group cursor-pointer">
        <Link to="/shop?gender=women" className="block w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop" 
            alt="Women's Collection" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
             <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Timeless Elegance</span>
             <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8">Women's Collection</h2>
             <span className="inline-block border border-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors bg-black/20 backdrop-blur-sm">
               Shop Women
             </span>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Collections;