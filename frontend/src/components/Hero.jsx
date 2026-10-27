import React from 'react';
import { Search, Sparkles, TrendingUp, ShieldCheck, Tractor, ArrowRight } from 'lucide-react';
import RedButton from './RedButton';

export default function Hero({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const quickTags = ['Basmati Rice', 'Bio-Fertilizer', 'Drip Irrigation', 'Wheat', 'Tractor Rental'];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative Floating Glass Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-green-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Floating pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-400/30 text-emerald-200 text-xs font-subtext mb-8 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Intelligent Agriculture & Modern Farming Ecosystem</span>
        </div>

        {/* Hero Title - Required: "Agritech" in Pacifico font */}
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-amber-200 drop-shadow-lg mb-6 leading-tight">
          Agritech
        </h1>

        {/* Hero Subtitle - Required: Droid Serif font */}
        <p className="font-subtext text-lg sm:text-xl md:text-2xl text-emerald-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Empowering farmers, growers, and agricultural enterprises with precision crop intelligence, verified agro-marketplace goods, and on-demand equipment booking.
        </p>

        {/* Integrated Hero Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit(searchQuery);
            }}
            className="glass-card p-2 sm:p-2.5 flex items-center gap-2 border border-white/25 shadow-2xl"
          >
            <div className="pl-3 text-emerald-300">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, seeds, fertilizers, or services..."
              className="w-full bg-transparent border-none text-white font-subtext placeholder-emerald-200/50 focus:outline-none text-base px-2"
            />
            <RedButton type="submit" className="!py-3 !px-6 text-sm shrink-0">
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </RedButton>
          </form>

          {/* Quick Search Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="font-subtext text-xs text-emerald-200/60">Trending:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  if (onSearchSubmit) onSearchSubmit(tag);
                }}
                className="text-xs font-subtext px-3 py-1 rounded-full glass-card text-emerald-200 hover:text-white hover:border-emerald-400/50 transition-all active:!bg-red-600 active:!border-red-300 active:shadow-red-glow"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons - Go Red When Clicked */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#marketplace">
            <RedButton className="!py-3.5 !px-7 text-base shadow-lg">
              Explore Marketplace
            </RedButton>
          </a>
          <a href="#crops">
            <RedButton variant="secondary" className="!py-3.5 !px-7 text-base shadow-lg">
              Browse Crop Catalog
            </RedButton>
          </a>
          <a href="#bookings">
            <RedButton variant="secondary" className="!py-3.5 !px-7 text-base shadow-lg">
              <Tractor className="w-4 h-4" />
              Book Equipment
            </RedButton>
          </a>
        </div>

        {/* Glassmorphic Metrics / Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          <div className="glass-card p-6 text-center border border-white/15">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl text-emerald-200 mb-1">16+ Crop Guides</h3>
            <p className="font-subtext text-xs text-emerald-100/70">
              Season durations, water requirements, and proactive pest monitoring.
            </p>
          </div>

          <div className="glass-card p-6 text-center border border-white/15">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-300 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl text-green-200 mb-1">Verified Agro Goods</h3>
            <p className="font-subtext text-xs text-emerald-100/70">
              Quality-certified bio-fertilizers, high-yield seeds, and organic protectors.
            </p>
          </div>

          <div className="glass-card p-6 text-center border border-white/15">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-3">
              <Tractor className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl text-amber-200 mb-1">Instant Bookings</h3>
            <p className="font-subtext text-xs text-emerald-100/70">
              Rent tractors, harvesters, and order soil testing directly to your farm.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
