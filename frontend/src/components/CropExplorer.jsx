import React, { useState, useEffect } from 'react';
import { Sprout, Droplets, Calendar, Bug, MapPin, Layers } from 'lucide-react';
import RedButton from './RedButton';
import { api } from '../services/api';

export default function CropExplorer({ filterQuery }) {
  const [crops, setCrops] = useState([]);
  const [activeSeason, setActiveSeason] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    async function loadCrops() {
      setLoading(true);
      const data = await api.getStaticCrops();
      setCrops(data);
      setLoading(false);
    }
    loadCrops();
  }, []);

  const seasons = [
    { id: 'all', label: 'All Crops' },
    { id: 'kharif', label: 'Kharif (Monsoon)' },
    { id: 'rabi', label: 'Rabi (Winter)' },
    { id: 'zaid', label: 'Zaid (Summer)' },
  ];

  // Filtering
  const filteredCrops = crops.filter((crop) => {
    const matchesSeason = activeSeason === 'all' || crop.type?.toLowerCase() === activeSeason;
    const matchesQuery = !filterQuery ||
      crop.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      crop.type.toLowerCase().includes(filterQuery.toLowerCase()) ||
      crop.commonPests?.some(p => p.toLowerCase().includes(filterQuery.toLowerCase())) ||
      crop.majorStates?.some(s => s.toLowerCase().includes(filterQuery.toLowerCase()));
    return matchesSeason && matchesQuery;
  });

  return (
    <section id="crops" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Pacifico Font */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-subtext text-xs uppercase tracking-widest text-emerald-300 font-semibold px-3 py-1 rounded-full glass-card border border-emerald-400/30">
            Agricultural Knowledge Base
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-amber-200 mt-4 mb-4">
            Crop Intelligence & Seasons
          </h2>
          <p className="font-subtext text-base sm:text-lg text-emerald-100/80">
            Real-time crop advisory covering lifecycle duration, soil compatibility, water demand, and integrated pest prevention.
          </p>
        </div>

        {/* Season Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {seasons.map((season) => {
            const isActive = activeSeason === season.id;
            return (
              <button
                key={season.id}
                onClick={() => setActiveSeason(season.id)}
                className={`px-5 py-2 rounded-xl text-sm font-subtext transition-all ${
                  isActive
                    ? 'bg-emerald-500/40 border border-emerald-300 text-white shadow-lg shadow-emerald-500/20'
                    : 'glass-card text-emerald-200/80 hover:text-white'
                } active:!bg-red-600 active:!border-red-300 active:shadow-red-glow`}
              >
                {season.label}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-subtext text-emerald-200">Loading comprehensive crop catalog...</p>
          </div>
        ) : filteredCrops.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <Sprout className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-60" />
            <h3 className="font-heading text-2xl text-emerald-200 mb-2">No Crops Found</h3>
            <p className="font-subtext text-sm text-emerald-100/70 mb-4">
              No crops matched your current filter or search criteria.
            </p>
            <RedButton onClick={() => setActiveSeason('all')} className="text-xs">
              Reset Filters
            </RedButton>
          </div>
        ) : (
          /* Crops Grid - Glassmorphism Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop, index) => (
              <div
                key={crop.name + index}
                className="glass-card p-6 flex flex-col justify-between group hover:border-emerald-400/40"
              >
                <div>
                  {/* Top Badge: Season */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-2xl text-white group-hover:text-emerald-300 transition-colors">
                      {crop.name}
                    </span>
                    <span className="px-2.5 py-1 text-xs rounded-full uppercase tracking-wider font-semibold font-subtext bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {crop.type}
                    </span>
                  </div>

                  {/* Crop Metadata Details */}
                  <div className="space-y-3 font-subtext text-xs text-emerald-100/80 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Season:</strong> {crop.season} ({crop.durationDays} days)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span><strong>Water Need:</strong> <span className="capitalize">{crop.waterRequirement}</span></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Soil:</strong> {crop.soilPreference?.join(', ') || 'Varied'}</span>
                    </div>

                    <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                      <Bug className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span><strong>Common Pests:</strong> {crop.commonPests?.join(', ')}</span>
                    </div>

                    {crop.majorStates && (
                      <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                        <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                        <span className="line-clamp-2"><strong>Regions:</strong> {crop.majorStates.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Button - Goes Red on Click */}
                <RedButton
                  variant="secondary"
                  onClick={() => setSelectedCrop(crop)}
                  className="w-full text-xs !py-2.5"
                >
                  View Agronomic Guide
                </RedButton>
              </div>
            ))}
          </div>
        )}

        {/* Modal Guide Detail Overlay */}
        {selectedCrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="glass-card max-w-lg w-full p-8 border border-white/30 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
                <h3 className="font-heading text-3xl text-emerald-200">
                  {selectedCrop.name}
                </h3>
                <span className="px-3 py-1 text-xs rounded-full uppercase tracking-wider font-semibold font-subtext bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  {selectedCrop.type}
                </span>
              </div>

              <div className="space-y-4 font-subtext text-sm text-emerald-100/90 mb-6">
                <p>
                  <strong>Active Growing Window:</strong> {selectedCrop.season}
                </p>
                <p>
                  <strong>Total Lifecycle Duration:</strong> ~{selectedCrop.durationDays} days from sowing to harvest
                </p>
                <p>
                  <strong>Ideal Soil Types:</strong> {selectedCrop.soilPreference?.join(', ')}
                </p>
                <p>
                  <strong>Water Requirement:</strong> {selectedCrop.waterRequirement} (ensure scheduled drip/irrigation cycles)
                </p>
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-100">
                  <h4 className="font-heading text-lg text-red-200 mb-1">Pest Management Protocol</h4>
                  <p className="text-xs">
                    Watch for: <strong>{selectedCrop.commonPests?.join(', ')}</strong>. Apply prophylactic neem-based spray or biocides in early vegetative stages.
                  </p>
                </div>
              </div>

              <RedButton onClick={() => setSelectedCrop(null)} className="w-full">
                Close Guide
              </RedButton>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
