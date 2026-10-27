import React, { useState } from 'react';
import { Search, Sprout, ShoppingBag, Calendar, User, Menu, X } from 'lucide-react';
import RedButton from './RedButton';

export default function Navbar({ onSearchClick, onOpenAuth, currentUser, onLogout, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchClick) onSearchClick(searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Pacifico Font */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-transform group-hover:scale-105">
                <Sprout className="w-7 h-7 text-slate-950" />
              </div>
              <span className="font-heading text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-amber-200 drop-shadow-sm">
                Agritech
              </span>
            </a>
          </div>

          {/* Desktop Search Option - Glassmorphic Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, seeds, equipment..."
                className="glass-input w-full pl-11 pr-24 py-2.5 text-sm font-subtext placeholder-emerald-100/50"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-300/80" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1 text-xs font-subtext rounded-lg bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-200 border border-emerald-400/30 transition-all active:!bg-red-600 active:!border-red-300 active:shadow-red-glow"
              >
                Search
              </button>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 font-subtext text-sm">
            <a href="#crops" className="text-emerald-100/80 hover:text-emerald-300 transition-colors flex items-center gap-1.5 py-1">
              <Sprout className="w-4 h-4 text-emerald-400" />
              Crops
            </a>
            <a href="#marketplace" className="text-emerald-100/80 hover:text-emerald-300 transition-colors flex items-center gap-1.5 py-1">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              Marketplace
            </a>
            <a href="#bookings" className="text-emerald-100/80 hover:text-emerald-300 transition-colors flex items-center gap-1.5 py-1">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Services & Booking
            </a>
          </div>

          {/* User Auth CTA with Red-on-Click Button */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-200 font-subtext px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  👋 {currentUser.name}
                </span>
                <RedButton
                  variant="secondary"
                  onClick={onLogout}
                  className="text-xs !py-1.5 !px-3"
                >
                  Logout
                </RedButton>
              </div>
            ) : (
              <RedButton onClick={onOpenAuth} className="text-sm">
                <User className="w-4 h-4" />
                Sign In
              </RedButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-emerald-200 hover:text-white glass-card"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card mx-3 mb-3 p-4 border border-white/20 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, seeds, tools..."
              className="glass-input w-full pl-10 pr-4 py-2 text-sm font-subtext"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-300" />
          </form>

          <div className="flex flex-col gap-3 font-subtext text-sm">
            <a
              href="#crops"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-100 hover:text-emerald-300 py-1 flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-emerald-400" />
              Crops Catalog
            </a>
            <a
              href="#marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-100 hover:text-emerald-300 py-1 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              Marketplace
            </a>
            <a
              href="#bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-100 hover:text-emerald-300 py-1 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              Services & Booking
            </a>
          </div>

          <div className="pt-2 border-t border-white/10">
            {currentUser ? (
              <RedButton variant="secondary" onClick={onLogout} className="w-full text-xs">
                Logout ({currentUser.name})
              </RedButton>
            ) : (
              <RedButton onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }} className="w-full">
                <User className="w-4 h-4" />
                Sign In / Register
              </RedButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
