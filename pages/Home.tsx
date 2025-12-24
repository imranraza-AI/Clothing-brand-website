import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const Home: React.FC = () => {
  const { products } = useProducts();
  const newArrivals = products.filter(p => p.isNew).slice(0, 3);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Valvaire Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 animate-fade-in-up">
            Timeless Styles.<br/>Everyday Comfort.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-10 leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Essentials designed for the modern individual. Minimalist aesthetics meets premium quality.
          </p>
          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link 
              to="/shop" 
              className="inline-block bg-white text-black px-10 py-4 font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors rounded-sm"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured / New Arrivals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-500">The latest additions to our premium collection.</p>
            </div>
            <Link to="/shop" className="text-sm font-semibold border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 bg-valvaire-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Conscious Design.<br/>Lasting Quality.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Valvaire, we believe that fashion shouldn't be complicated. We focus on creating versatile pieces that seamlessly blend into your daily life.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every stitch is intentional, every fabric selected for its touch and durability. We don't chase trends; we set the standard for modern essentials.
              </p>
              <Link to="/about" className="text-sm font-semibold uppercase tracking-wider hover:text-gray-600 transition-colors">
                Read Our Story &rarr;
              </Link>
            </div>
            <div className="order-1 md:order-2 h-96 md:h-[600px] bg-gray-200 overflow-hidden relative rounded-sm">
               <img 
                 src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
                 alt="Valvaire Studio"
                 className="absolute inset-0 w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;