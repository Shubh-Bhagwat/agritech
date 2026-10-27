const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Crop data
  getStaticCrops: async () => {
    try {
      const res = await fetch(`${API_BASE}/crops/static`);
      if (!res.ok) throw new Error('Failed to fetch static crops');
      return await res.json();
    } catch (err) {
      console.warn('API fallback for crops:', err.message);
      // Fallback local sample data if backend isn't running yet
      return [
        {
          name: "Rice",
          type: "kharif",
          season: "June - November",
          durationDays: 150,
          soilPreference: ["alluvial", "clay"],
          waterRequirement: "high",
          commonPests: ["Stem Borer", "Brown Plant Hopper"],
          majorStates: ["West Bengal", "Uttar Pradesh", "Punjab"]
        },
        {
          name: "Wheat",
          type: "rabi",
          season: "November - April",
          durationDays: 140,
          soilPreference: ["alluvial", "clay"],
          waterRequirement: "moderate",
          commonPests: ["Aphids", "Termites", "Rust"],
          majorStates: ["Uttar Pradesh", "Punjab", "Haryana"]
        },
        {
          name: "Cotton",
          type: "kharif",
          season: "April - October",
          durationDays: 180,
          soilPreference: ["black", "alluvial"],
          waterRequirement: "moderate",
          commonPests: ["Bollworm", "Whitefly"],
          majorStates: ["Gujarat", "Maharashtra", "Telangana"]
        },
        {
          name: "Mustard",
          type: "rabi",
          season: "October - March",
          durationDays: 130,
          soilPreference: ["alluvial", "sandy"],
          waterRequirement: "low",
          commonPests: ["Aphids", "Sawfly"],
          majorStates: ["Rajasthan", "Uttar Pradesh", "Haryana"]
        }
      ];
    }
  },

  // Products
  getProducts: async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      return data.products || [];
    } catch (err) {
      console.warn('API fallback for products:', err.message);
      return [
        {
          _id: '1',
          name: 'Organic NPK Bio-Fertilizer (50kg)',
          category: 'fertilizers',
          price: 1250,
          description: 'Enriched with mycorrhiza and beneficial bacteria for soil microbiome revitalization.',
          imgUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80',
        },
        {
          _id: '2',
          name: 'Hybrid Basmati Rice Seeds (Pusa 1121)',
          category: 'seeds',
          price: 850,
          description: 'High-yield aromatic long-grain paddy seeds with disease resistance.',
          imgUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
        },
        {
          _id: '3',
          name: 'Smart Drip Irrigation Kit (1 Acre)',
          category: 'equipment',
          price: 15400,
          description: 'Automated pressure-compensating drip system with timer & solenoid valves.',
          imgUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=80',
        },
        {
          _id: '4',
          name: 'Neem-Based Bio-Pesticide (5L Concentrate)',
          category: 'pesticides',
          price: 1100,
          description: 'Cold-pressed azadirachtin 10000 PPM effective against 200+ chewing pests.',
          imgUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
        },
        {
          _id: '5',
          name: 'Multi-Crop High Speed Seed Drill',
          category: 'equipment',
          price: 45000,
          description: 'Tractor mounted 9-row automated seed and fertilizer distributor.',
          imgUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=600&auto=format&fit=crop&q=80',
        },
        {
          _id: '6',
          name: 'Soil pH & Nitrogen Digital Analyzer',
          category: 'tools',
          price: 3200,
          description: 'Instant 4-in-1 digital sensor for moisture, pH, temperature and NPK estimation.',
          imgUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80',
        }
      ];
    }
  },

  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    return await res.json();
  },

  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }
    return await res.json();
  },

  // Bookings
  createBooking: async (bookingData, token) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Booking failed');
    }
    return await res.json();
  }
};
