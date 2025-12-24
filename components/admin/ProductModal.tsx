import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { CATEGORIES } from '../../constants';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  initialData?: Product;
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36'];
const ALL_COLORS = ['Black', 'White', 'Navy', 'Grey', 'Camel', 'Olive', 'Cream', 'Red', 'Blue'];

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'T-shirts',
    image: '',
    description: '',
    sizes: [],
    colors: [],
    gender: 'unisex',
    isNew: false,
    isTrending: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        price: 0,
        category: 'T-shirts',
        image: '',
        description: '',
        sizes: [],
        colors: [],
        gender: 'unisex',
        isNew: false,
        isTrending: false
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleSize = (size: string) => {
    setFormData(prev => {
      const current = prev.sizes || [];
      return {
        ...prev,
        sizes: current.includes(size) ? current.filter(s => s !== size) : [...current, size]
      };
    });
  };

  const toggleColor = (color: string) => {
    setFormData(prev => {
      const current = prev.colors || [];
      return {
        ...prev,
        colors: current.includes(color) ? current.filter(c => c !== color) : [...current, color]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;
    
    onSubmit(formData as Omit<Product, 'id'>);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="col-span-2 md:col-span-1">
                 <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                 <input name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none" />
               </div>
               <div className="col-span-2 md:col-span-1">
                 <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                 <input name="price" type="number" required min="0" step="0.01" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none" />
               </div>

               <div className="col-span-2">
                 <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                 <div className="flex gap-2">
                   <input name="image" required value={formData.image} onChange={handleChange} placeholder="https://..." className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none" />
                   <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                      {formData.image && <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />}
                   </div>
                 </div>
               </div>
               
               <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none bg-white">
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
               </div>

               <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none bg-white">
                    <option value="unisex">Unisex</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
               </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea name="description" required rows={3} value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none" />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Available Sizes</label>
               <div className="flex flex-wrap gap-2">
                 {ALL_SIZES.map(size => (
                   <button 
                     key={size} 
                     type="button" 
                     onClick={() => toggleSize(size)}
                     className={`px-3 py-1 text-xs font-medium rounded border ${formData.sizes?.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                   >
                     {size}
                   </button>
                 ))}
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Available Colors</label>
               <div className="flex flex-wrap gap-2">
                 {ALL_COLORS.map(color => (
                   <button 
                     key={color} 
                     type="button" 
                     onClick={() => toggleColor(color)}
                     className={`px-3 py-1 text-xs font-medium rounded border ${formData.colors?.includes(color) ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                   >
                     {color}
                   </button>
                 ))}
               </div>
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
                <span className="text-sm font-medium text-gray-900">New Arrival</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
                <span className="text-sm font-medium text-gray-900">Trending</span>
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
           <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black">Cancel</button>
           <button form="product-form" type="submit" className="px-6 py-2 bg-black text-white text-sm font-bold rounded hover:bg-gray-800 transition-colors">
             {initialData ? 'Save Changes' : 'Create Product'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;