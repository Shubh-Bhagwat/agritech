import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, Tag, Filter } from 'lucide-react';
import RedButton from './RedButton';
import { api } from '../services/api';

export default function Marketplace({ filterQuery, onProductSelect }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'fertilizers', label: 'Fertilizers' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'pesticides', label: 'Bio-Pesticides' },
    { id: 'tools', label: 'Smart Tools' },
  ];

  const handleAddToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.category?.toLowerCase() === selectedCategory;
    const matchesQuery = !filterQuery ||
      prod.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      prod.category?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      prod.description?.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="marketplace" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Pacifico Font */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-subtext text-xs uppercase tracking-widest text-emerald-300 font-semibold px-3 py-1 rounded-full glass-card border border-emerald-400/30">
            Certified Inputs & Implements
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-amber-200 mt-4 mb-4">
            Agro Marketplace
          </h2>
          <p className="font-subtext text-base sm:text-lg text-emerald-100/80">
            Verified hybrid seeds, organic microbial bio-fertilizers, and smart mechanized farming implements with transparent pricing.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-subtext transition-all ${
                  isActive
                    ? 'bg-emerald-500/40 border border-emerald-300 text-white shadow-lg shadow-emerald-500/20'
                    : 'glass-card text-emerald-200/80 hover:text-white'
                } active:!bg-red-600 active:!border-red-300 active:shadow-red-glow`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-subtext text-emerald-200">Loading verified agricultural goods...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <Filter className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-60" />
            <h3 className="font-heading text-2xl text-emerald-200 mb-2">No Products Matched</h3>
            <p className="font-subtext text-sm text-emerald-100/70 mb-4">
              Try adjusting your category filter or search keywords.
            </p>
            <RedButton onClick={() => setSelectedCategory('all')} className="text-xs">
              Show All Products
            </RedButton>
          </div>
        ) : (
          /* Products Grid - Glass Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const inCartCount = cartItems[product._id] || 0;
              return (
                <div
                  key={product._id}
                  className="glass-card overflow-hidden flex flex-col justify-between group hover:border-emerald-400/50"
                >
                  {/* Product Image Thumbnail */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900/60">
                    <img
                      src={product.imgUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    
                    {/* Category pill on image */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold font-subtext uppercase tracking-wider bg-slate-950/70 backdrop-blur-md text-emerald-300 border border-white/20">
                      {product.category}
                    </span>

                    {/* Price tag */}
                    <span className="absolute bottom-3 right-3 px-3.5 py-1 rounded-xl text-lg font-bold font-subtext bg-emerald-500/90 backdrop-blur-md text-slate-950 shadow-md">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-2xl text-white group-hover:text-emerald-200 transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="font-subtext text-xs sm:text-sm text-emerald-100/80 line-clamp-3 mb-6 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Actions with Red-on-Click Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-subtext text-emerald-300">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Ready in Stock</span>
                      </div>

                      <RedButton
                        onClick={() => handleAddToCart(product._id)}
                        className="text-xs !py-2.5 !px-4"
                      >
                        {inCartCount > 0 ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Added ({inCartCount})</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Order Now</span>
                          </>
                        )}
                      </RedButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
