# Global Pet Cab Dubai (`globalpetcab.ae`)

> **Premier Pet Transportation & Relocation Logistics in Dubai, UAE**

Official web platform for **Global Pet Cab Dubai**, built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM. Re-architected with a high-converting UI/UX design system inspired by **FidoJet**, tailored strictly for the Dubai and UAE market (`globalpetcab.ae`).

> 📚 **Developer & AI Agent Documentation**: For detailed architectural specifications, mathematical fare formulas, FidoJet design system tokens, and extension patterns, see [DEVELOPMENT.md](file:///Users/bedre/globalpecab/DEVELOPMENT.md).

---

## 🚀 Key Business Models & Features

### 🚕 Service 1 — Dubai Pet Taxi (Local Ground Transport)
- Dedicated, climate-controlled rides across all Dubai emirate districts (Dubai Marina, DXB Airport, Business Bay, Palm Jumeirah, Downtown, JBR, Mirdif, Silicon Oasis).
- **Instant Distance Fare Calculator**: Real-time road distance calculation using Dubai landmarks database & Haversine fallback.
- **Dynamic Fare Engine**: Base fare (AED 60 incl. 5 km) + distance rate (AED 4.5/km) + extra pet surcharges + airport location fee + round trip discount + 5% UAE VAT.
- **Direct WhatsApp Confirmation**: Generates structured booking reference (`GPC-DXB-XXXX`) and launches instant WhatsApp booking.

### ✈️ Service 2 — International Pet Relocation (Dubai ↔ Worldwide)
- Cross-border pet moving between Dubai and global hubs (India, UK, USA, Canada, Australia, Europe, Singapore).
- **Multi-Step Quote Engine**: Collects relocation direction, pet specs, microchip/RNATT readiness, IATA crate requirements, and service selections.
- Generates official quote request reference (`GPC-INT-XXXX`).

### ⚙️ Admin Portal & Live Pricing Dashboard
- Secured admin dashboard (`/admin/dashboard`) to configure live taxi fare settings (Base fare, Included km, Rate/km, Pet charge, Airport surcharge, VAT %).
- Live lead management for taxi bookings and international relocation requests.

---

## 🎨 Design System (FidoJet UI/UX Blueprint)

- **Typography**: 
  - Headings & Buttons: **Plus Jakarta Sans** (Weights 600, 700, 800, 900)
  - Body & Form Inputs: **Inter** (Weights 400, 500)
- **Color Palette**:
  - Deep Navy (`#052D49` / `#041A2C`)
  - Teal Accent (`#0C7F8A` / `#0FA3B1` / `#7FDBE5`)
  - Conversion Coral (`#C2410C` / `#FB6F4C`)
  - Soft Backgrounds (`#F6F8FA` / `#E3E9EE`)
- **Hero & Interactive Globe**:
  - Animated SVG globe graphic with spinning grid lines, glowing flight arcs (`DXB → LHR`, `DXB → BOM`, `DXB → JFK`), and live route indicators.
  - Floating 5-column inline quick estimate bar overlapping 50% across section boundaries.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **Database**: SQLite (via Prisma ORM)
- **Icons**: Lucide React
- **ORM**: Prisma Client v5

---

## 📁 Project Structure

```
/globalpecab
├── DEVELOPMENT.md                         # Architecture & Developer Guide for Engineers & AI Agents
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root layout (Google Fonts & Metadata)
│   │   ├── globals.css                    # Tailwind directives & luxury styles
│   │   ├── page.tsx                       # Homepage (Hero, Estimate bar, Calculator, Reviews)
│   │   ├── dubai-pet-taxi/                # Dubai Pet Taxi page
│   │   ├── international-pet-relocation/  # International Relocation page
│   │   ├── how-it-works/                  # Process breakdown page
│   │   ├── why-global-pet-cab/            # Trust & value page
│   │   ├── about/                         # About company page
│   │   ├── contact/                       # Contact & office details page
│   │   ├── resources/                     # UAE pet travel guides page
│   │   ├── reviews/                       # Verified customer reviews page
│   │   ├── faq/                           # Help & FAQ center page
│   │   ├── get-a-quote/                   # Quote portal page
│   │   ├── admin/                         # Admin portal & live pricing dashboard
│   │   └── api/                           # API routes (calculate, enquiry, admin)
│   ├── components/
│   │   ├── Header.tsx                     # FidoJet header & navigation
│   │   ├── Footer.tsx                     # Footer with Dubai & international links
│   │   ├── HeroServiceSelector.tsx        # Hero with animated globe & estimate bar
│   │   ├── DubaiFareCalculator.tsx        # Interactive distance & fare calculator
│   │   ├── InternationalQuoteForm.tsx     # Multi-step relocation quote form
│   │   ├── TrustBar.tsx                   # Google ratings & metrics bar
│   │   ├── PetJourneyGallery.tsx          # Review cards & pet stories
│   │   ├── WhyChooseUs.tsx                # Feature cards grid
│   │   └── FAQAccordion.tsx               # Categorized FAQ accordion
│   └── lib/
│       ├── db.ts                          # Prisma Client instance
│       └── pricing.ts                     # Fare calculation & distance matrix
├── prisma/
│   ├── schema.prisma                      # Database schema
│   └── dev.db                             # SQLite database file
└── scripts/
    └── seed.js                            # Database seed script
```

---

## 💻 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup & Seeding
```bash
npx prisma db push
node scripts/seed.js
```

### 3. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
npm run build
npm start
```

---

## 🔑 Default Admin Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@globalpetcab.com`
- **Password**: `Admin123!`

---

## 📄 License & Ownership

Copyright © 2026 **Global Pet Cab Dubai (`globalpetcab.ae`)**. All rights reserved.
