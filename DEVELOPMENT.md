# Architecture & Developer Guide — Global Pet Cab Dubai

> **Comprehensive Technical Specification & AI Agent Context Document**

This guide details the architectural decisions, design system implementation, core calculation algorithms, and developer patterns used in **Global Pet Cab Dubai (`globalpetcab.ae`)**. It is designed to assist human developers and AI coding agents in understanding, extending, and maintaining the codebase.

---

## 🏛️ 1. Core Business Architecture

Global Pet Cab operates strictly on **two separated service models** for the Dubai / UAE market:

```
                      ┌─────────────────────────────────────────┐
                      │        Global Pet Cab Dubai             │
                      │           globalpetcab.ae               │
                      └────────────────────┬────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
┌───────────────────────────────┐                           ┌───────────────────────────────┐
│     SERVICE 1 — DUBAI TAXI    │                           │    SERVICE 2 — INTERNATIONAL  │
│    (Local Ground Mobility)    │                           │    (Cross-Border Relocation)   │
├───────────────────────────────┤                           ├───────────────────────────────┤
│ • Home ↔ Vet Clinic           │                           │ • Dubai ↔ India (BOM/DEL/BLR) │
│ • Home ↔ Grooming Salon       │                           │ • Dubai ↔ UK (London LHR)     │
│ • Home ↔ Pet Hotel / Boarding │                           │ • Dubai ↔ USA (JFK/LAX/ORD)   │
│ • Home ↔ DXB / DWC Airports   │                           │ • Dubai ↔ Canada & Australia  │
├───────────────────────────────┤                           ├───────────────────────────────┤
│ Instant Distance Fare Engine  │                           │ Custom Multi-Step Quote Engine│
│ Reference: GPC-DXB-XXXX       │                           │ Reference: GPC-INT-XXXX       │
└───────────────────────────────┘                           └───────────────────────────────┘
```

---

## 🧮 2. Dynamic Fare Calculation Engine (`src/lib/pricing.ts`)

The Dubai Pet Taxi fare engine computes transparent fares based on actual driving road distance using a pre-calculated distance matrix of Dubai landmarks with a Haversine formula fallback:

### Mathematical Formula
$$\text{Billable KM} = \max(0, \text{Total Distance KM} - \text{Included KM})$$

$$\text{Subtotal} = \text{Base Fare} + (\text{Billable KM} \times \text{Rate per KM}) + (\text{Extra Pets} \times \text{Pet Charge})$$

$$\text{Subtotal After Min Floor} = \max(\text{Minimum Fare Floor}, \text{Subtotal})$$

$$\text{Surcharges} = \text{Airport Fee} + \text{Night Fee}$$

$$\text{Pre-Tax Subtotal} = (\text{Subtotal After Min Floor} + \text{Surcharges}) \times (1 - \text{Round Trip Discount})$$

$$\text{Total Fare} = \text{Pre-Tax Subtotal} \times (1 + \text{VAT \%})$$

### Default Dubai Pricing Configuration (Stored in `PricingSettings` Table)
| Parameter | Default Value | Notes |
| :--- | :--- | :--- |
| **Base Fare** | AED 60.00 | Includes first 5 km |
| **Included KM** | 5.0 km | First 5 km covered in base fare |
| **Rate / KM** | AED 4.50 / km | Applied to billable KM above 5 km |
| **Minimum Fare Floor** | AED 80.00 | Minimum charge per ride |
| **Additional Pet Charge** | AED 30.00 | Applied per extra pet beyond 1st |
| **Airport Location Fee** | AED 35.00 | Applied for DXB / DWC pickups or drops |
| **Night Time Fee** | AED 40.00 | Applied between 22:00 and 06:00 GST |
| **Round Trip Discount** | 10% | Applied to subtotal for round trips |
| **UAE VAT** | 5.0% | Statutory UAE Value Added Tax |

---

## 🎨 3. FidoJet UI/UX Design System Implementation

### Typography Tokens (`tailwind.config.js`)
- **Heading Font**: `Plus Jakarta Sans` (Weights `600`, `700`, `800`, `900`). Used for section headers, CTA buttons, card titles, and badges.
- **Body Font**: `Inter` (Weights `400`, `500`). Used for form inputs, paragraph text, and review quotes.
- **Minimum Body Size Rule**: Paragraph text defaults to `0.95rem` (~`15.2px`) with `1.65` line height to prevent tiny text on high-DPI displays.

### Color Palette Tokens
```javascript
navy: {
  DEFAULT: '#052D49',  // Dark hero background & primary headers
  dark: '#041A2C',     // Card accents & dark footers
  light: '#0A3A5C',    // Subheader highlights
},
teal: {
  DEFAULT: '#0C7F8A',  // Brand accent & active state
  bright: '#0FA3B1',   // Glowing status lights
  light: '#7FDBE5',    // Hero chips & route text
  soft: '#F6F8FA',     // Soft container backgrounds
  border: '#E3E9EE',   // Crisp subtle borders
},
coral: {
  DEFAULT: '#C2410C',  // Primary conversion CTA button
  bright: '#FB6F4C',   // Hover state & glowing badges
  hover: '#A8380A',    // Active click state
}
```

### 4. Overlapping Floating Search Card Mechanics
The floating estimate card in `HeroServiceSelector.tsx` bridges 50% over the dark hero section into the light `TrustBar` section below:

```tsx
/* Hero Container */
<section className="relative bg-[#052D49] pb-24 font-body">
  ...
  /* Floating Card Wrapper */
  <div className="relative z-30 translate-y-1/2 -mt-6 sm:-mt-8 lg:-mt-10">
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-border">
      {/* 5-Column Inline Form Row */}
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        ...
      </form>
    </div>
  </div>
</section>

/* Subsequent TrustBar Container */
<div className="bg-white border-y border-teal-border pt-32 sm:pt-36 lg:pt-44 pb-12">
  ...
</div>
```

### 5. Animated Vector Globe Implementation
The globe graphic uses vector SVG curves with pure CSS animations (`@keyframes`):
- `globe-grid-spin`: Continuous 90s grid rotation (`transform-origin: 250px 250px`).
- `route-dash-animated`: Animated stroke dashoffset (`stroke-dasharray: 6 4`) simulating flight line flow from **Dubai (DXB)** to **London (LHR)**, **Frankfurt (FRA)**, and **Delhi (DEL)**.
- Pulsing radar rings over Dubai coordinates (`(320, 210)`).

---

## 🛠️ 4. How to Extend & Add New Features

### Pattern A: Adding a New Destination Route (e.g. `Dubai ↔ Singapore`)
1. Open `src/app/destinations/[slug]/page.tsx`.
2. Add a new entry to `DESTINATION_DATA`:
```typescript
'dubai-to-singapore': {
  slug: 'dubai-to-singapore',
  title: 'Pet Relocation from Dubai to Singapore',
  route: 'Dubai (DXB) → Singapore (SIN)',
  origin: 'Dubai, UAE',
  destination: 'Singapore',
  overview: 'Importing or exporting pets between Dubai and Singapore requires AVA/NParks import permits, rabies titer verification, and quarantine booking.',
  documentsNeeded: [
    'ISO Microchip',
    'UAE MOCCAE Export Certificate',
    'Singapore NParks Import Permit & Quarantine Booking',
    'Rabies Titer (RNATT) Certificate',
  ],
  flightTimeApprox: '7 Hours Direct Flight',
}
```
3. Update header dropdown in `src/components/Header.tsx` and footer links in `src/components/Footer.tsx`.

### Pattern B: Modifying Pricing Settings Programmatically
Execute an HTTP `POST` request to `/api/admin/pricing` or update via Prisma:
```typescript
import { db } from '@/lib/db';

await db.pricingSettings.updateMany({
  data: {
    baseFare: 65.0,
    ratePerKm: 5.0,
  },
});
```

### Pattern C: Adding New API Endpoints
All API endpoints follow Next.js 14 App Router specifications in `src/app/api/[feature]/route.ts`:
- Handle input validation strictly.
- Return structured JSON responses `{ success: true, data: ... }`.
- Log errors gracefully.

---

## 🧪 5. Testing & Build Verification Checklist

Before pushing any changes to Git, perform the following verification workflow:

```bash
# 1. Regenerate Prisma Client
npx prisma generate

# 2. Test Production Bundle Compilation
rm -rf .next
npm run build

# 3. Verify Static & Dynamic Route Compilation
# Ensure 22 static and dynamic routes compile with 0 errors.

# 4. Start Production Server & Check Response
npm start
curl -I http://localhost:3000
```

---

## 🤝 Guidelines for AI Coding Agents

1. **Obey Design System**: Always use `Plus Jakarta Sans` for headings, `Inter` for body copy, `#C2410C` for primary conversion buttons, and `#052D49` for dark navy containers.
2. **Never Break Dubai Scope**: Ensure all taxi fare calculations, landmarks, phone numbers (`+971`), currency (`AED`), and permit names (`MOCCAE`) remain 100% Dubai/UAE focused.
3. **Preserve Form Layout**: Maintain the 5-column inline horizontal row on desktop for the quick estimate bar.
4. **Always Run Build Verification**: Never declare success without executing `npm run build` to confirm 0 compilation errors.
