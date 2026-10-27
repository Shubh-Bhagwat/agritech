# UML & System Architecture Diagrams
## Agritech — Precision Agriculture Platform

This document presents the complete architectural, structural, and behavioral UML diagrams for the **Agritech** ecosystem. All diagrams are authored using standard **Mermaid** syntax for dynamic visualization directly inside GitHub and Markdown viewers.

---

## Table of Contents
1. [System Architecture Diagram](#1-system-architecture-diagram)
2. [Use Case Diagram](#2-use-case-diagram)
3. [Class Diagram](#3-class-diagram)
4. [Entity-Relationship (ER) Diagram](#4-entity-relationship-er-diagram)
5. [Sequence Diagrams](#5-sequence-diagrams)
   - [5.1 User Authentication Flow](#51-user-authentication-flow)
   - [5.2 Service & Equipment Booking Flow](#52-service--equipment-booking-flow)
6. [Data Flow Diagrams (DFD)](#6-data-flow-diagrams-dfd)
   - [6.1 DFD Level 0 (Context Diagram)](#61-dfd-level-0-context-diagram)
   - [6.2 DFD Level 1 (Decomposition Diagram)](#62-dfd-level-1-decomposition-diagram)
7. [Component Deployment Diagram](#7-component-deployment-diagram)

---

## 1. System Architecture Diagram

High-level client-serverless architecture running on Vercel with MongoDB Atlas.

```mermaid
graph TD
    subgraph ClientLayer["Frontend Client (React + Vite SPA)"]
        UI["Glassmorphic UI (Pacifico & Droid Serif)"]
        NAV["Navbar & Integrated Search"]
        HERO["Hero Banner & Quick Actions"]
        MOD_CROP["Crop Intelligence Explorer"]
        MOD_MKT["Agro Marketplace"]
        MOD_SVC["Service & Equipment Booking"]
        MOD_AUTH["Auth Modal (JWT Client)"]
    end

    subgraph HostingEdge["Vercel Edge & Serverless Platform"]
        VROUTER["Vercel Gateway (vercel.json)"]
        STATICS["Static Asset CDN (frontend/dist)"]
        SFUNC["Serverless Function (api/index.js)"]
    end

    subgraph BackendAPI["Express.js Application (backend/)"]
        MW_CORS["CORS Middleware"]
        MW_PARSE["JSON & URL Parser"]
        MW_AUTH["JWT Auth Guard (middleware/auth.js)"]
        MW_DB["Mongoose Connection Middleware"]
        
        R_USER["routes/user.js"]
        R_ADMIN["routes/admin.js"]
        R_FARM["routes/farm.js"]
        R_CROP["routes/crop.js"]
        R_PROD["routes/product.js"]
        R_BOOK["routes/booking.js"]
    end

    subgraph DatabaseLayer["Cloud Database Cluster (MongoDB Atlas)"]
        COL_USERS[("Users Collection")]
        COL_ADMINS[("Admins Collection")]
        COL_FARMS[("Farms Collection")]
        COL_CROPS[("Crops Collection")]
        COL_PRODS[("Products Collection")]
        COL_BOOKS[("Bookings Collection")]
        STATIC_JSON[("crops.json Knowledge Base")]
    end

    UI --> VROUTER
    VROUTER -->|Static Web Assets| STATICS
    VROUTER -->|/api/* Requests| SFUNC
    SFUNC --> MW_CORS
    MW_CORS --> MW_PARSE
    MW_PARSE --> MW_DB
    MW_DB --> MW_AUTH
    
    MW_AUTH --> R_USER
    MW_AUTH --> R_ADMIN
    MW_AUTH --> R_FARM
    MW_AUTH --> R_CROP
    MW_AUTH --> R_PROD
    MW_AUTH --> R_BOOK

    R_USER --> COL_USERS
    R_ADMIN --> COL_ADMINS
    R_FARM --> COL_FARMS
    R_CROP --> COL_CROPS
    R_CROP --> STATIC_JSON
    R_PROD --> COL_PRODS
    R_BOOK --> COL_BOOKS
```

---

## 2. Use Case Diagram

Identifies platform actors (Farmer, Supplier, Buyer, Admin) and their operational use cases.

```mermaid
flowchart LR
    Farmer(("👨‍🌾 Farmer"))
    Supplier(("🏪 Supplier"))
    Buyer(("🛒 Buyer"))
    Admin(("🛡️ System Admin"))

    subgraph AgritechPlatform["Agritech Platform System Boundary"]
        UC1["Register & Authenticate"]
        UC2["Manage Profile Details"]
        UC3["Search Crops & Pests"]
        UC4["View Seasonal Advisory"]
        UC5["Register & Manage Farms"]
        UC6["Track Crop Growth Stages"]
        UC7["Log Crop Treatments"]
        UC8["Browse & Order Inputs"]
        UC9["List & Update Products"]
        UC10["Book Machinery & Drones"]
        UC11["Schedule Soil Diagnostic Tests"]
        UC12["Verify User Profiles"]
        UC13["Monitor System Analytics & Reports"]
    end

    Farmer --> UC1
    Farmer --> UC2
    Farmer --> UC3
    Farmer --> UC4
    Farmer --> UC5
    Farmer --> UC6
    Farmer --> UC7
    Farmer --> UC8
    Farmer --> UC10
    Farmer --> UC11

    Supplier --> UC1
    Supplier --> UC2
    Supplier --> UC9
    Supplier --> UC8

    Buyer --> UC1
    Buyer --> UC3
    Buyer --> UC8

    Admin --> UC1
    Admin --> UC12
    Admin --> UC13
```

---

## 3. Class Diagram

Object Data Model representing Mongoose schemas, attributes, datatypes, and associations.

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +String phone
        +String role
        +Object address
        +Boolean isVerified
        +Date createdAt
        +Date updatedAt
        +register(data)
        +login(credentials)
        +updateProfile(data)
    }

    class Admin {
        +ObjectId _id
        +String name
        +String email
        +String password
        +String role
        +ObjectId userId
        +Date createdAt
        +login(credentials)
        +verifyUser(userId)
        +getAnalytics()
    }

    class Farm {
        +ObjectId _id
        +ObjectId owner
        +String name
        +Object location
        +Number sizeInAcres
        +String soilType
        +String irrigationType
        +ObjectId[] crops
        +Date createdAt
        +createFarm()
        +updateFarm()
        +deleteFarm()
    }

    class Crop {
        +ObjectId _id
        +ObjectId farm
        +String name
        +String type
        +String stage
        +Date sowingDate
        +Date expectedHarvestDate
        +Treatment[] treatments
        +Date createdAt
        +addCrop()
        +updateStage()
        +addTreatment()
    }

    class Treatment {
        +String name
        +Date date
        +String description
    }

    class Product {
        +ObjectId _id
        +String name
        +String category
        +Number price
        +String description
        +String imgUrl
        +Number quantity
        +ObjectId seller
        +Date createdAt
        +createProduct()
        +updateProduct()
        +deleteProduct()
    }

    class Booking {
        +ObjectId _id
        +ObjectId user
        +ObjectId product
        +String serviceType
        +Date bookingDate
        +Date returnDate
        +String status
        +Number totalAmount
        +String notes
        +Date createdAt
        +createBooking()
        +updateStatus()
        +cancelBooking()
    }

    User "1" <-- "0..*" Farm : owns
    Farm "1" *-- "0..*" Crop : cultivates
    Crop "1" *-- "0..*" Treatment : logs
    User "1" <-- "0..*" Product : sells
    User "1" <-- "0..*" Booking : requests
    Product "0..1" <-- "0..*" Booking : involves
    User "0..1" <-- "0..1" Admin : references
```

---

## 4. Entity-Relationship (ER) Diagram

Relational model mapped into MongoDB document collections with foreign key references.

```mermaid
erDiagram
    USERS ||--o{ FARMS : "owns"
    USERS ||--o{ PRODUCTS : "supplies"
    USERS ||--o{ BOOKINGS : "places"
    FARMS ||--o{ CROPS : "contains"
    CROPS ||--o{ TREATMENTS : "records"
    PRODUCTS ||--o{ BOOKINGS : "reserved in"
    USERS ||--o| ADMINS : "elevates"

    USERS {
        ObjectId _id PK
        string name
        string email UK
        string password
        string phone
        string role
        object address
        boolean isVerified
        date createdAt
    }

    ADMINS {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role
        ObjectId userId FK
        date createdAt
    }

    FARMS {
        ObjectId _id PK
        ObjectId owner FK
        string name
        object location
        number sizeInAcres
        string soilType
        string irrigationType
        ObjectId_arr crops
        date createdAt
    }

    CROPS {
        ObjectId _id PK
        ObjectId farm FK
        string name
        string type
        string stage
        date sowingDate
        date expectedHarvestDate
        array treatments
        date createdAt
    }

    TREATMENTS {
        string name
        date date
        string description
    }

    PRODUCTS {
        ObjectId _id PK
        ObjectId seller FK
        string name
        string category
        number price
        string description
        string imgUrl
        number quantity
        date createdAt
    }

    BOOKINGS {
        ObjectId _id PK
        ObjectId user FK
        ObjectId product FK
        string serviceType
        date bookingDate
        date returnDate
        string status
        number totalAmount
        string notes
        date createdAt
    }
```

---

## 5. Sequence Diagrams

### 5.1 User Authentication Flow

Illustrates registration, duplicate validation, and JWT generation.

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as User / Farmer
    participant UI as Glassmorphic Frontend
    participant API as Express API (/api/users)
    participant Auth as JWT Auth Guard
    participant DB as MongoDB Atlas

    Farmer->>UI: Enter name, email, password, role
    UI->>API: POST /api/users/register (JSON payload)
    API->>DB: User.findOne({ email })
    alt Email already exists
        DB-->>API: Existing user record found
        API-->>UI: HTTP 400 ("User already exists with this email")
        UI-->>Farmer: Display error banner
    else Email is unique
        DB-->>API: null
        API->>DB: User.create({ name, email, password, role... })
        DB-->>API: Saved user document with _id
        API->>Auth: generateToken(user._id)
        Auth-->>API: Signed JWT token (30d expiry)
        API-->>UI: HTTP 201 Created (User profile + token)
        UI->>UI: Store token in state / localStorage
        UI-->>Farmer: Welcome banner & authenticated view
    end
```

### 5.2 Service & Equipment Booking Flow

Illustrates reservation of tractors, drones, or soil diagnostic services.

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer
    participant UI as Frontend Booking UI
    participant RedBtn as RedButton (Click Visuals)
    participant API as Express API (/api/bookings)
    participant MW as JWT Middleware
    participant DB as MongoDB Atlas

    Farmer->>UI: Selects "Autonomous Drone Spraying"
    UI->>UI: Opens Booking Modal with rate details
    Farmer->>UI: Selects date (2026-11-05) & enters notes
    Farmer->>RedBtn: Clicks "Confirm & Reserve"
    RedBtn->>RedBtn: Transitions to vivid crimson red glow
    UI->>API: POST /api/bookings (Bearer Token + Payload)
    API->>MW: Verify Bearer JWT
    alt Token Invalid / Expired
        MW-->>API: Error ("Token failed")
        API-->>UI: HTTP 401 Unauthorized
        UI-->>Farmer: Prompt Sign-In Modal
    else Token Verified
        MW-->>API: Attach req.user (id, role)
        API->>DB: Booking.create({ user, serviceType, bookingDate, status: "pending" })
        DB-->>API: Booking record created with ID
        API-->>UI: HTTP 201 Created (Booking details)
        UI-->>Farmer: Display "Booking Confirmed!" badge
    end
```

---

## 6. Data Flow Diagrams (DFD)

### 6.1 DFD Level 0 (Context Diagram)

High-level boundary representation of inputs, outputs, and external entities.

```mermaid
flowchart TD
    FARMER["👨‍🌾 Farmer Entity"]
    SUPPLIER["🏪 Supplier Entity"]
    ADMIN["🛡️ Administrator Entity"]
    
    SYSTEM(["Agritech Platform System"])

    FARMER -->|"1. Registration, Farm Data, Booking Requests"| SYSTEM
    SYSTEM -->|"2. Crop Advisory, Booking Confirmations, Products"| FARMER

    SUPPLIER -->|"3. Product Listings, Inventory Updates"| SYSTEM
    SYSTEM -->|"4. Order Notifications, Sales Summary"| SUPPLIER

    ADMIN -->|"5. User Verification Commands, Review Directives"| SYSTEM
    SYSTEM -->|"6. System Analytics, Booking Summaries, Audit Logs"| ADMIN
```

### 6.2 DFD Level 1 (Decomposition Diagram)

Subsystem processing and bidirectional data store interaction.

```mermaid
flowchart TD
    User["User / Client"]

    P1["1.0 Authentication & User Management"]
    P2["2.0 Farm Land Management"]
    P3["3.0 Crop Intelligence Engine"]
    P4["4.0 Agro Marketplace Store"]
    P5["5.0 Service Reservation Engine"]
    P6["6.0 Admin Oversight & Analytics"]

    D1[("D1: Users Store")]
    D2[("D2: Farms Store")]
    D3[("D3: Crops Knowledge Base")]
    D4[("D4: Products Store")]
    D5[("D5: Bookings Store")]

    User -->|Credentials| P1
    P1 <-->|Read / Write User| D1
    P1 -->|JWT Session| User

    User -->|Farm Dimensions & Soil| P2
    P2 <-->|Store & Retrieve Farm Data| D2

    User -->|Crop Inquiries & Treatments| P3
    P3 <-->|Query Crops & Pests| D3
    P3 -->|Agronomic Protocols| User

    User -->|Product Listings & Orders| P4
    P4 <-->|Inventory Records| D4
    P4 -->|Catalog View| User

    User -->|Equipment Rental & Dates| P5
    P5 <-->|Reservation Records| D5
    P5 -->|Booking Status| User

    User -->|Administrative Commands| P6
    P6 <-->|Aggregate Metrics| D1
    P6 <-->|Aggregate Metrics| D2
    P6 <-->|Aggregate Metrics| D4
    P6 <-->|Aggregate Metrics| D5
    P6 -->|Dashboard Analytics| User
```

---

## 7. Component Deployment Diagram

Physical deployment mapping onto Vercel global infrastructure and MongoDB Atlas.

```mermaid
graph TD
    subgraph UserDevices["User Devices (Mobile, Tablet, Desktop)"]
        Browser["Modern Web Browser (Blink / WebKit / Gecko)"]
    end

    subgraph VercelCloud["Vercel Global Edge Network"]
        CDN["Vercel Global Edge CDN"]
        subgraph LambdaContainers["Vercel Serverless Functions"]
            Handler["Node.js 20.x Lambda Handler (api/index.js)"]
            ExpressApp["Express.js 4.21 Application"]
            MongoosePool["Mongoose Cached Connection Pool"]
        end
    end

    subgraph MongoCloud["MongoDB Atlas Cloud Cluster"]
        AtlasReplica["Primary Replica Set (M0 / Dedicated Cluster)"]
        AtlasSecondary["Secondary Replica Set (High Availability)"]
    end

    Browser -->|HTTPS / TLS 1.3| CDN
    CDN -->|Static Files| Browser
    CDN -->|Rewrite /api/*| Handler
    Handler --> ExpressApp
    ExpressApp --> MongoosePool
    MongoosePool -->|TCP + TLS with Connection Reuse| AtlasReplica
    AtlasReplica -.->|Automatic Replication| AtlasSecondary
```
