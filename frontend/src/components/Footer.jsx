import React, { useState } from 'react';
import { Sprout, Mail, Heart } from 'lucide-react';
import RedButton from './RedButton';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="relative pt-16 pb-12 mt-20 border-t border-white/15 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-heading text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-amber-200">
                Agritech
              </span>
            </div>
            <p className="font-subtext text-sm text-emerald-100/75 max-w-sm leading-relaxed">
              Bridging modern technology with traditional farming wisdom. Comprehensive agronomic intelligence, verified marketplace goods, and rapid agricultural rentals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-subtext text-xs">
            <h4 className="font-heading text-xl text-emerald-200 mb-2">Platform</h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li><a href="#crops" className="hover:text-emerald-300 transition-colors">Crop Intelligence</a></li>
              <li><a href="#marketplace" className="hover:text-emerald-300 transition-colors">Agro Marketplace</a></li>
              <li><a href="#bookings" className="hover:text-emerald-300 transition-colors">Equipment Rentals</a></li>
              <li><a href="#home" className="hover:text-emerald-300 transition-colors">Search & Advisory</a></li>
            </ul>
          </div>

          {/* Newsletter with Red-on-Click Button */}
          <div className="space-y-3">
            <h4 className="font-heading text-xl text-emerald-200 mb-2">Agro Updates</h4>
            <p className="font-subtext text-xs text-emerald-100/75">
              Receive weekly weather forecasts, mandi price updates, and pest warnings.
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-300 font-subtext">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter farmer email..."
                  className="glass-input w-full px-3 py-2 text-xs"
                />
                <RedButton type="submit" className="w-full text-xs !py-2">
                  <Mail className="w-3.5 h-3.5" />
                  Subscribe Free
                </RedButton>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-subtext text-emerald-100/50 gap-4">
          <p>© {new Date().getFullYear()} Agritech Ecosystem. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Sustainable Farming
          </p>
        </div>

      </div>
    </footer>
  );
}
