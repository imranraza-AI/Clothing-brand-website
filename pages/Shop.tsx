import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { useProducts } from '../context/ProductContext';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortOption, setSortOption] = useState('newest');

  // Initialize gender from URL query param if present
  useEffect(() => {
    const genderParam = searchParams.get('gender');
    if (genderParam) {
      if (genderParam.toLowerCase() === 'men') setSelectedGender('Men');
      else if (genderParam.toLowerCase() === 'women') setSelectedGender('Women');
      else setSelectedGender('All');
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by Gender
    // Logic: 'Men' shows Men + Unisex. 'Women' shows Women + Unisex.
    if (selectedGender !== 'All') {
      const g = selectedGender.toLowerCase();
      filtered = filtered.filter(p => p.gender === g || p.gender === 'unisex');
    }
    
    // Sort
    if (sortOption === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } 
    // For 'newest', we assume the array order or check id/isNew but existing logic used array order
    
    return filtered;
  }, [products, selectedCategory, sortOption, selectedGender]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-4xl font-serif text-gray-900 mb-4 md:mb-0">
              {selectedGender !== 'All' ? `Shop ${selectedGender}` : 'All Products'}
            </h1>
            
            <div className="flex items-center space-x-4">
                {/* Gender Toggle for easy switching */}
                <div className="flex bg-gray-100 rounded-sm p-1">
                    {['All', 'Men', 'Women'].map((g) => (
                        <button
                            key={g}
                            onClick={() => setSelectedGender(g)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all ${
                                selectedGender === g ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'
                            }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent border-b border-gray-300 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-black cursor-pointer"
                >
                    <option value="newest">Sort by: Newest</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
        </div>
        
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-100">
            {CATEGORIES.map(cat => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    selectedCategory === cat 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-200'
                }`}
                >
                {cat}
                </button>
            ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg">No products found in this selection.</p>
          <button onClick={() => {setSelectedCategory('All'); setSelectedGender('All');}} className="mt-4 text-black underline hover:text-gray-600">Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default Shop;