import fs from 'fs';

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://localhost:3010/_next/static/css/9c2ce42aad51f819.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
    body { font-family: 'Plus Jakarta Sans', Inter, sans-serif; margin: 0; background: #041a2c; }
    .intl-hero-gradient {
      background: linear-gradient(to right, #041a2c 0%, #041a2c 34%, rgba(4,26,44,0.92) 50%, rgba(4,26,44,0.55) 68%, rgba(4,26,44,0.15) 86%, transparent 100%);
    }
    @media (max-width: 768px) {
      .intl-hero-gradient {
        background: linear-gradient(to bottom, rgba(4,26,44,0.94) 0%, rgba(4,26,44,0.85) 50%, rgba(4,26,44,0.95) 100%) !important;
      }
    }
  </style>
</head>
<body>

  <div style="position: relative; overflow: hidden; background: #041a2c;">
    <div style="position: absolute; inset: 0;" aria-hidden="true">
      <img src="http://localhost:3010/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75"
           style="position: absolute; width: 100%; height: 100%; object-fit: cover; object-position: 82% center;" />
      
      <!-- Primary Darkening & Gradient matched to Dubai Pet Taxi -->
      <div class="intl-hero-gradient" style="position: absolute; inset: 0;"></div>
      <!-- Soft bottom vignette to ground the section -->
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%);"></div>
    </div>

    <div style="position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; padding: 56px 32px 70px;">
      <div style="max-width: 680px;">
        <div style="display: inline-flex; align-items: center; gap: 8px; color: #7ED7F0; font-size: 13px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#26EFE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          INTERNATIONAL PET RELOCATION
        </div>
        
        <h1 style="font-size: 44px; font-weight: 900; line-height: 1.15; color: white; margin: 16px 0 18px; letter-spacing: -0.02em;">
          International Pet Relocation from Dubai, Made Simple
        </h1>

        <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.85); margin: 0 0 14px; font-family: Inter, sans-serif;">
          Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.
        </p>

        <p style="font-size: 15px; color: #7ED7F0; font-weight: 600; margin: 0 0 22px; font-family: Inter, sans-serif;">
          Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai.
        </p>

        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #7ED7F0; margin-bottom: 26px;">
          <span style="padding: 6px 14px; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);">IPATA Member*</span>
          <span style="color: rgba(255,255,255,0.4);">|</span>
          <span style="padding: 6px 14px; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);">IATA-Compliant Handling*</span>
          <span style="color: rgba(255,255,255,0.4);">|</span>
          <span style="padding: 6px 14px; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);">MOCCAE Support*</span>
          <span style="color: rgba(255,255,255,0.4);">|</span>
          <span style="padding: 6px 14px; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);">International Pet Relocation</span>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 30px;">
          <a style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #C2410C; color: white; font-weight: 800; padding: 16px 34px; border-radius: 9999px; font-size: 16px; text-decoration: none; box-shadow: 0 12px 28px -10px rgba(251,111,76,0.65);">
            <span>Request an Expert Quote</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
          <a style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #10B981; color: white; font-weight: 800; padding: 16px 34px; border-radius: 9999px; font-size: 16px; text-decoration: none;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
            <span>WhatsApp Us</span>
          </a>
        </div>

        <!-- Banner Copy 2 -->
        <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 18px; padding: 20px 24px; backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: space-between; gap: 20px;">
          <div>
            <div style="font-weight: 800; font-size: 17px; color: white;">Moving Your Pet Across Borders?</div>
            <div style="font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 4px; font-family: Inter, sans-serif;">From Dubai to the world and back again, we help coordinate the important details of your pet’s international journey.</div>
          </div>
          <a style="background: #1AA8D4; color: #041A2C; font-weight: 800; padding: 12px 22px; border-radius: 12px; font-size: 13px; white-space: nowrap; text-decoration: none; shrink-0;">
            Get a Free Relocation Quote →
          </a>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('/tmp/test_hero_overlay.html', html);
console.log('Saved /tmp/test_hero_overlay.html with intl-hero-gradient');
