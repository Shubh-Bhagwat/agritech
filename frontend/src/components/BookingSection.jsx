import React, { useState } from 'react';
import { Tractor, FlaskConical, Plane, Users, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import RedButton from './RedButton';

export default function BookingSection({ onOpenAuth, currentUser }) {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');

  const services = [
    {
      id: 'equipment_rental',
      title: '50HP 4WD Farm Tractor',
      category: 'Equipment Rental',
      icon: Tractor,
      rate: '₹1,200 / hr',
      rateValue: 1200,
      description: 'Equipped with rotary tiller, disc plow, and experienced certified field operator.',
      features: ['Fuel Included', 'Free Delivery within 20km', 'Zero Deposit for Registered Farmers']
    },
    {
      id: 'drone_spraying',
      title: 'Autonomous Drone Spraying',
      category: 'Precision Agriculture',
      icon: Plane,
      rate: '₹450 / acre',
      rateValue: 450,
      description: 'Ultrasonic sensor-guided micro-droplet foliar nutrition and pest spray in under 15 minutes.',
      features: ['90% Water Savings', 'Zero Crop Damage', 'Comprehensive Coverage Map']
    },
    {
      id: 'soil_testing',
      title: 'Rapid Soil Health Card & Testing',
      category: 'Diagnostic Lab',
      icon: FlaskConical,
      rate: '₹850 / sample',
      rateValue: 850,
      description: 'Laboratory analysis of Organic Carbon, N-P-K levels, pH, electrical conductivity, and zinc.',
      features: ['Sample Picked from Farm', 'Digital Report in 48 Hours', 'Custom Fertilizer Prescription']
    },
    {
      id: 'consultation',
      title: 'Expert Agronomist On-Site Visit',
      category: 'Consultation',
      icon: Users,
      rate: '₹1,500 / session',
      rateValue: 1500,
      description: 'One-on-one farm inspection with tailored advice on crop rotation, drip setup, and disease cures.',
      features: ['Certified Agricultural Scientist', 'Yield Forecasting', 'Post-Harvest Market Strategy']
    }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert('Please select a preferred date for the service.');
      return;
    }
    // Simulate booking
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      setBookingDate('');
      setBookingNotes('');
    }, 3500);
  };

  return (
    <section id="bookings" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Pacifico Font */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-subtext text-xs uppercase tracking-widest text-emerald-300 font-semibold px-3 py-1 rounded-full glass-card border border-emerald-400/30">
            On-Demand Farm Services
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-amber-200 mt-4 mb-4">
            Services & Equipment Booking
          </h2>
          <p className="font-subtext text-base sm:text-lg text-emerald-100/80">
            Modernize your fields without capital investment. Rent top-tier farm machinery and schedule precision agro-diagnostics on your schedule.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="glass-card p-8 flex flex-col justify-between group hover:border-emerald-400/40 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wider font-semibold font-subtext text-emerald-300/80">
                        {svc.category}
                      </span>
                      <p className="font-subtext text-xl font-bold text-white mt-1">
                        {svc.rate}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-heading text-3xl text-white group-hover:text-emerald-200 transition-colors mb-3">
                    {svc.title}
                  </h3>

                  <p className="font-subtext text-sm text-emerald-100/80 mb-6 leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-8 font-subtext text-xs text-emerald-100/90">
                    {svc.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Trigger Button - Turns Red on Click */}
                <RedButton
                  onClick={() => setSelectedService(svc)}
                  className="w-full text-sm !py-3 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Service Now</span>
                </RedButton>
              </div>
            );
          })}
        </div>

        {/* Interactive Booking Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <div className="glass-card max-w-lg w-full p-8 border border-white/30 shadow-2xl relative">
              
              {bookingSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-400/40 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-3xl text-emerald-200">
                    Booking Confirmed!
                  </h3>
                  <p className="font-subtext text-sm text-emerald-100/80">
                    Your request for <strong>{selectedService.title}</strong> on <strong>{bookingDate}</strong> has been logged. Our local agricultural coordinator will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div>
                      <span className="text-xs text-emerald-300 font-subtext uppercase tracking-wider">
                        {selectedService.category}
                      </span>
                      <h3 className="font-heading text-2xl text-white">
                        {selectedService.title}
                      </h3>
                    </div>
                    <span className="font-subtext text-sm font-bold text-emerald-300 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                      {selectedService.rate}
                    </span>
                  </div>

                  <div className="space-y-4 font-subtext text-sm">
                    <div>
                      <label className="block text-xs text-emerald-200 mb-1.5 font-semibold">
                        Select Preferred Service Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="glass-input w-full px-4 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-emerald-200 mb-1.5 font-semibold">
                        Field Details or Special Notes
                      </label>
                      <textarea
                        rows="3"
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="Specify acre size, crop stage, or village landmark..."
                        className="glass-input w-full px-4 py-2 text-sm"
                      ></textarea>
                    </div>

                    {!currentUser && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-300" />
                        <span>You can book as a guest or sign in to track live status in your dashboard.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <RedButton
                      type="button"
                      variant="secondary"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 text-sm"
                    >
                      Cancel
                    </RedButton>
                    <RedButton type="submit" className="flex-1 text-sm">
                      Confirm & Reserve
                    </RedButton>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
