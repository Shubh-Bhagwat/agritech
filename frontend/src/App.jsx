import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CropExplorer from './components/CropExplorer';
import Marketplace from './components/Marketplace';
import BookingSection from './components/BookingSection';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearchAction = (query) => {
    setSearchQuery(query);
    // Smooth scroll to crops or marketplace
    const targetSection = document.getElementById('crops');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="glass-bg min-h-screen text-white relative selection:bg-red-500 selection:text-white">
      
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchClick={handleSearchAction}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Hero Section with Agritech, Search Option & Red Click Buttons */}
      <main>
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchAction}
        />

        {/* Crops Intelligence Section */}
        <CropExplorer filterQuery={searchQuery} />

        {/* Products & Agro Marketplace */}
        <Marketplace filterQuery={searchQuery} />

        {/* Services & Equipment Booking */}
        <BookingSection
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Glassmorphic Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
