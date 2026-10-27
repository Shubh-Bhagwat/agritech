# REST API Documentation
## Agritech — Precision Agriculture Platform

This document describes the complete RESTful API contract for the **Agritech** platform.

**Base URL (Local):** `http://localhost:5000/api`  
**Base URL (Production on Vercel):** `https://<your-vercel-domain>.vercel.app/api`  
**Content-Type:** `application/json`  

---

## Authentication Mechanism
All protected endpoints require a valid JSON Web Token (JWT) provided in the request headers:
```http
Authorization: Bearer <your_jwt_token_here>
```

---

## Endpoint Summary

| Module | Method | Endpoint | Access | Purpose |
|---|---|---|---|---|
| **Users** | `POST` | `/api/users/register` | Public | Register a new user account |
| | `POST` | `/api/users/login` | Public | Authenticate user & retrieve JWT token |
| | `GET` | `/api/users/profile` | Protected | Retrieve authenticated user profile |
| | `PUT` | `/api/users/profile` | Protected | Update profile (name, phone, address) |
| **Crops** | `GET` | `/api/crops/static` | Public | Fetch static catalog of 16+ Indian crops |
| | `POST` | `/api/crops/:farmId` | Protected | Add a crop to an owned farm |
| | `GET` | `/api/crops/farm/:farmId` | Protected | Retrieve all crops cultivated on a farm |
| | `GET` | `/api/crops/:id` | Protected | Get detailed crop profile by ID |
| | `PUT` | `/api/crops/:id/stage` | Protected | Update physiological growth stage |
| | `PUT` | `/api/crops/:id/treatment`| Protected | Log fertilizer/pesticide treatment |
| | `DELETE`| `/api/crops/:id` | Protected | Remove crop record |
| **Farms** | `POST` | `/api/farms` | Protected | Create a new farm plot |
| | `GET` | `/api/farms` | Protected | Retrieve all farms owned by user |
| | `GET` | `/api/farms/:id` | Protected | Retrieve single farm plot detail |
| | `PUT` | `/api/farms/:id` | Protected | Update farm dimensions/soil |
| | `DELETE`| `/api/farms/:id` | Protected | Delete farm and cascade remove crops |
| **Products** | `GET` | `/api/products` | Public | Query marketplace goods with filters |
| | `GET` | `/api/products/:id` | Public | Retrieve single product details |
| | `POST` | `/api/products` | Protected | Publish new product listing |
| | `PUT` | `/api/products/:id` | Protected | Update product price/description |
| | `DELETE`| `/api/products/:id` | Protected | Remove product listing |
| **Bookings**| `POST` | `/api/bookings` | Protected | Reserve equipment or farm service |
| | `GET` | `/api/bookings` | Protected | Retrieve user's booking history |
| | `GET` | `/api/bookings/:id` | Protected | Retrieve single booking detail |
| | `PUT` | `/api/bookings/:id/status`| Protected| Update status (confirmed/completed/cancelled)|
| | `DELETE`| `/api/bookings/:id` | Protected | Cancel/delete booking record |
| **Admin** | `POST` | `/api/admin/login` | Public | Admin portal authentication |
| | `GET` | `/api/admin/users` | Admin | Retrieve all registered users |
| | `PUT` | `/api/admin/verify/:userId`| Admin | Verify user account (`isVerified = true`) |
| | `GET` | `/api/admin/analytics` | Admin | Retrieve system analytics & counters |
| | `GET` | `/api/admin/reports` | Admin | Retrieve aggregated inventory & crop reports |

---

## Detailed Endpoint Specifications

### 1. User Registration
`POST /api/users/register`

#### Request Payload
```json
{
  "name": "Kisan Sharma",
  "email": "kisan@agritech.com",
  "password": "securepassword123",
  "phone": "+91 9876543210",
  "role": "farmer",
  "address": {
    "state": "Punjab",
    "district": "Ludhiana",
    "village": "Khanna",
    "pincode": "141401"
  }
}
```

#### Response (201 Created)
```json
{
  "_id": "671e7d82fc13ae5678000101",
  "name": "Kisan Sharma",
  "email": "kisan@agritech.com",
  "role": "farmer",
  "isVerified": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. User Login
`POST /api/users/login`

#### Request Payload
```json
{
  "email": "kisan@agritech.com",
  "password": "securepassword123"
}
```

#### Response (200 OK)
```json
{
  "_id": "671e7d82fc13ae5678000101",
  "name": "Kisan Sharma",
  "email": "kisan@agritech.com",
  "role": "farmer",
  "isVerified": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Static Crop Intelligence Catalog
`GET /api/crops/static`  
*Access: Public (No Authorization required)*

#### Response (200 OK)
```json
[
  {
    "name": "Rice",
    "type": "kharif",
    "season": "June - November",
    "durationDays": 150,
    "soilPreference": ["alluvial", "clay"],
    "waterRequirement": "high",
    "commonPests": ["Stem Borer", "Brown Plant Hopper", "Leaf Folder"],
    "majorStates": ["West Bengal", "Uttar Pradesh", "Punjab", "Andhra Pradesh"]
  },
  {
    "name": "Wheat",
    "type": "rabi",
    "season": "November - April",
    "durationDays": 140,
    "soilPreference": ["alluvial", "clay"],
    "waterRequirement": "moderate",
    "commonPests": ["Aphids", "Termites", "Rust"],
    "majorStates": ["Uttar Pradesh", "Punjab", "Haryana", "Madhya Pradesh"]
  }
]
```

---

### 4. Query Marketplace Products
`GET /api/products?category=fertilizers&minPrice=500&maxPrice=3000`  
*Access: Public*

#### Response (200 OK)
```json
{
  "count": 1,
  "products": [
    {
      "_id": "671e7d82fc13ae5678000104",
      "name": "Organic NPK Bio-Fertilizer (50kg)",
      "category": "fertilizers",
      "price": 1250,
      "description": "Enriched with mycorrhiza and beneficial bacteria for soil revitalization.",
      "imgUrl": "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600"
    }
  ]
}
```

---

### 5. Equipment & Service Reservation
`POST /api/bookings`  
*Access: Protected (`Authorization: Bearer <token>`)*

#### Request Payload
```json
{
  "serviceType": "equipment_rental",
  "bookingDate": "2026-11-15T09:00:00.000Z",
  "returnDate": "2026-11-16T18:00:00.000Z",
  "totalAmount": 2400,
  "notes": "50HP tractor needed for 2-acre rotavator tilling."
}
```

#### Response (201 Created)
```json
{
  "_id": "671e7d82fc13ae5678000107",
  "user": "671e7d82fc13ae5678000101",
  "product": null,
  "serviceType": "equipment_rental",
  "bookingDate": "2026-11-15T09:00:00.000Z",
  "returnDate": "2026-11-16T18:00:00.000Z",
  "status": "pending",
  "totalAmount": 2400,
  "notes": "50HP tractor needed for 2-acre rotavator tilling.",
  "createdAt": "2026-10-27T22:15:00.000Z"
}
```

---

### 6. Administrative Analytics
`GET /api/admin/analytics`  
*Access: Admin Only (`Authorization: Bearer <admin_token>`)*

#### Response (200 OK)
```json
{
  "totalUsers": 128,
  "verifiedUsers": 94,
  "unverifiedUsers": 34,
  "totalFarms": 65,
  "totalCrops": 142,
  "totalBookings": 87,
  "totalProducts": 32,
  "bookingsByStatus": [
    { "_id": "pending", "count": 12 },
    { "_id": "confirmed", "count": 48 },
    { "_id": "completed", "count": 27 }
  ],
  "usersByRole": [
    { "_id": "farmer", "count": 98 },
    { "_id": "supplier", "count": 22 },
    { "_id": "buyer", "count": 8 }
  ]
}
```
