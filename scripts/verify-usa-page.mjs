import http from 'http';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetchPage('http://localhost:3010/destinations/dubai-to-usa');

  const tests = [
    // 1. Hero
    { name: 'Hero Eyebrow', test: html.includes('DUBAI → USA PET RELOCATION') },
    { name: 'Hero H1', test: html.includes('Pet Relocation from Dubai to the USA, Made Easier') },
    { name: 'Hero Copy', test: html.includes('Taking your pet from Dubai to the United States involves more than booking a flight.') },
    { name: 'Hero Supporting Line', test: html.includes('Pet relocation from Dubai to the USA with route planning, travel preparation and arrival coordination.') },
    { name: 'Hero CTA 1', test: html.includes('Get a Free Pet Relocation Quote') },
    { name: 'Hero CTA 2', test: html.includes('WhatsApp Us') },

    // 2. What Global Pet Cab Handles
    { name: 'Handles Eyebrow', test: html.includes('WHAT GLOBAL PET CAB HANDLES') },
    { name: 'Handles H2', test: html.includes('What We Can Help With on Your Dubai to USA Pet Move') },
    { name: 'Handles Card 1', test: html.includes('Route &amp; Airline Planning') || html.includes('Route & Airline Planning') },
    { name: 'Handles Card 2', test: html.includes('UAE Export Permit Support') },
    { name: 'Handles Card 3', test: html.includes('USA Entry Preparation') },
    { name: 'Handles Card 4', test: html.includes('Veterinary Preparation') },
    { name: 'Handles Card 5', test: html.includes('Travel Crate Preparation') },
    { name: 'Handles Card 6', test: html.includes('Airport Ground Handling') },
    { name: 'Handles Card 7', test: html.includes('Customs &amp; Arrival Support') || html.includes('Customs & Arrival Support') },
    { name: 'Handles Card 8', test: html.includes('Doorstep Pickup &amp; Delivery') || html.includes('Doorstep Pickup & Delivery') },

    // 3. Documents
    { name: 'Docs Eyebrow', test: html.includes('DOCUMENTS GENERALLY REQUIRED') },
    { name: 'Docs H2', test: html.includes('Documents to Prepare for a Dubai to USA Pet Journey') },
    { name: 'Doc 1', test: html.includes('CDC Rabies Vaccination &amp; Microchip Record') || html.includes('CDC Rabies Vaccination & Microchip Record') },
    { name: 'Doc 2', test: html.includes('UAE MOCCAE Export Health Certificate') },
    { name: 'Doc 3', test: html.includes('ISO 11784/11785 Microchip') },
    { name: 'Doc 4', test: html.includes('Airline Cargo Booking Confirmation') },
    { name: 'Doc 5', test: html.includes('CDC Dog Import Form &amp; USDA Compliance') || html.includes('CDC Dog Import Form & USDA Compliance') },
    { name: 'Important Box', test: html.includes('Important: Regulatory and airline requirements can change.') },

    // 4. Human-First Support
    { name: 'Human Eyebrow', test: html.includes('HUMAN-FIRST SUPPORT') },
    { name: 'Human H2', test: html.includes("The Paperwork Is Important. So Is Knowing What Happens Next.") },
    { name: 'Human Copy', test: html.includes('International pet travel can feel overwhelming because there are several things to keep track of at the same time.') },

    // 5. Quote Form
    { name: 'Quote Form Eyebrow', test: html.includes('DUBAI ↔ WORLDWIDE RELOCATION') },
    { name: 'Quote Form H2', test: html.includes("Tell Us About Your Pet&#x27;s Journey") || html.includes("Tell Us About Your Pet's Journey") },
    { name: 'Quote Route Details', test: html.includes('Dubai (DXB) → USA (JFK / LAX / ORD / IAH)') },

    // 6. The Journey
    { name: 'Journey Eyebrow', test: html.includes('THE JOURNEY') },
    { name: 'Journey H2', test: html.includes('From Dubai to the USA, One Step at a Time') },
    { name: 'Journey Step 1', test: html.includes('01 — Start With the Route') },
    { name: 'Journey Step 2', test: html.includes('02 — Review the Requirements') },
    { name: 'Journey Step 3', test: html.includes('03 — Get Travel-Ready') },
    { name: 'Journey Step 4', test: html.includes('04 — Coordinate the Flight') },
    { name: 'Journey Step 5', test: html.includes('05 — Arrival') },

    // 7. FAQs
    { name: 'FAQ H2', test: html.includes('Dubai to USA Pet Relocation Questions, Answered') },
    { name: 'FAQ Q1', test: html.includes('What is involved in relocating a pet from Dubai to the USA?') },
    { name: 'FAQ Q2', test: html.includes('What documents does my pet need to travel from Dubai to the USA?') },
    { name: 'FAQ Q3', test: html.includes('Does my pet need a microchip for travel to the USA?') },
    { name: 'FAQ Q4', test: html.includes('Do I need a rabies vaccination record?') },
    { name: 'FAQ Q5', test: html.includes('Will my pet travel as excess baggage or manifest cargo?') },
    { name: 'FAQ Q6', test: html.includes('Do you help with the UAE export process?') },
    { name: 'FAQ Q7', test: html.includes('Can you help with the travel crate?') },
    { name: 'FAQ Q8', test: html.includes('Can you pick up my pet from my home in Dubai?') },
    { name: 'FAQ Q9', test: html.includes("How early should I start planning my pet&#x27;s move to the USA?") || html.includes("How early should I start planning my pet's move to the USA?") },
    { name: 'FAQ Q10', test: html.includes('How do I get a quote for pet relocation from Dubai to the USA?') },

    // 8. Final CTA
    { name: 'Final CTA Eyebrow', test: html.includes("READY TO PLAN YOUR PET&#x27;S MOVE?") || html.includes("READY TO PLAN YOUR PET'S MOVE?") },
    { name: 'Final CTA H2', test: html.includes("Let&#x27;s Start With Your Route") || html.includes("Let's Start With Your Route") },
    { name: 'Final CTA Copy', test: html.includes("You don&#x27;t have to work out every part of an international pet move on your own.") || html.includes("You don't have to work out every part of an international pet move on your own.") },
    { name: 'Final CTA Button 1', test: html.includes('Get a Free Pet Relocation Quote →') },
    { name: 'Final CTA Button 2', test: html.includes('WhatsApp Us') }
  ];

  let passed = 0;
  for (const t of tests) {
    if (t.test) {
      passed++;
    } else {
      console.log('FAIL:', t.name);
    }
  }

  console.log(`USA Page Verification: ${passed}/${tests.length} tests passed.`);
}

run().catch(console.error);
