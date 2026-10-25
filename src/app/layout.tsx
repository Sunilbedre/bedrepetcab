import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';

export const metadata: Metadata = {
  title: 'Global Pet Cab Dubai — Dubai Pet Taxi & International Pet Relocation',
  description: 'Safe, comfortable pet transportation across Dubai and international pet relocation worldwide. Instant Dubai pet taxi distance fare calculation & expert IATA relocation quotes.',
  keywords: [
    'pet taxi Dubai',
    'pet relocation Dubai',
    'dog taxi Dubai',
    'cat taxi Dubai',
    'pet transport UAE',
    'international pet relocation Dubai',
    'pet export Dubai',
    'pet import Dubai',
  ],
  openGraph: {
    title: 'Global Pet Cab Dubai — Safe Journeys for Pets',
    description: 'Instant Dubai pet taxi distance fare calculation & expert international relocation to and from Dubai.',
    url: 'https://globalpetcab.com',
    siteName: 'Global Pet Cab Dubai',
    locale: 'en_AE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Global Pet Cab Dubai',
              description: 'Premier pet taxi ground transport inside Dubai and international pet relocation services worldwide.',
              url: 'https://globalpetcab.com',
              telephone: '+971-50-123-4567',
              priceRange: 'AED 60 - AED 15000',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dubai',
                addressCountry: 'AE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 25.2048,
                longitude: 55.2708,
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FBFBFA] text-[#0A2540] antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
