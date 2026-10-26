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
  const html = await fetchPage('http://localhost:3010/destinations/dubai-to-canada');

  const tests = [
    // 1. HERO / INTRO
    { name: 'Hero Eyebrow', test: html.includes('DUBAI ↔ CANADA PET RELOCATION') },
    { name: 'Hero H1', test: html.includes("Moving Your Pet Between Dubai &amp; Canada? Let&#x27;s Plan the Journey.") || html.includes("Moving Your Pet Between Dubai & Canada? Let's Plan the Journey.") },
    { name: 'Hero Copy 1', test: html.includes('Moving your pet to another country is a big move — and there is a lot to think about before travel day.') },
    { name: 'Hero Copy 2', test: html.includes('Whether your pet is leaving Dubai for Canada or coming home to Dubai from Canada') },
    { name: 'Hero Primary CTA', test: html.includes('Get a Free Pet Relocation Quote →') },
    { name: 'Hero Secondary CTA', test: html.includes('WhatsApp Us') },

    // 2. INTERNATIONAL PET RELOCATION QUOTE
    { name: 'Quote Badge', test: html.includes('DUBAI ↔ CANADA RELOCATION') },
    { name: 'Quote H2', test: html.includes('International Pet Relocation — Request Your Quote') },
    { name: 'Quote Intro', test: html.includes('Every pet and every journey is different. Tell us where your pet is travelling from') },
    { name: 'Quote Route Overview', test: html.includes('Dubai (DXB) ↔ Canada (YYZ / YVR / YUL)') },
    { name: 'Quote Form Present', test: html.includes('id="international-quote-form"') },

    // 3. CANADA ROUTE INTRODUCTION BANNER
    { name: 'Route Intro Eyebrow', test: html.includes("YOUR PET&#x27;S JOURNEY TO CANADA") || html.includes("YOUR PET'S JOURNEY TO CANADA") },
    { name: 'Route Intro H2', test: html.includes('More Than Just Getting From Dubai to Canada') },
    { name: 'Route Intro Copy 1', test: html.includes('A pet relocation involves more than getting your pet onto a flight.') },
    { name: 'Route Intro Copy 2', test: html.includes('There is preparation before departure, travel arrangements to organise and documents that need to be in place.') },
    { name: 'Route Intro Copy 3', test: html.includes("That&#x27;s why we start by understanding your pet, your journey and your timeline") || html.includes("That's why we start by understanding your pet, your journey and your timeline") },
    { name: 'Route Intro Copy 4', test: html.includes("Whether you&#x27;re relocating for work, moving back home or starting a new chapter in Canada") || html.includes("Whether you're relocating for work, moving back home or starting a new chapter in Canada") },

    // 4. WHAT WE HELP YOU COORDINATE (6 STEPS)
    { name: 'Coordinate Eyebrow', test: html.includes('HOW WE SUPPORT YOUR MOVE') },
    { name: 'Coordinate H2', test: html.includes('One Journey. Many Moving Parts. One Team to Help Coordinate Them.') },
    { name: 'Step 1', test: html.includes('01 — Route Planning') },
    { name: 'Step 2', test: html.includes('02 — Pet Travel Preparation') },
    { name: 'Step 3', test: html.includes('03 — Travel Crate &amp; Flight Preparation') || html.includes('03 — Travel Crate & Flight Preparation') },
    { name: 'Step 4', test: html.includes('04 — Export &amp; Import Coordination') || html.includes('04 — Export & Import Coordination') },
    { name: 'Step 5', test: html.includes('05 — Airport &amp; Ground Transport') || html.includes('05 — Airport & Ground Transport') },
    { name: 'Step 6', test: html.includes('06 — Arrival Arrangements') },

    // 5. LOCAL SUPPORT BEFORE THE BIG MOVE
    { name: 'Local Support Eyebrow', test: html.includes('BEFORE TRAVEL DAY') },
    { name: 'Local Support H2', test: html.includes('Need Help Getting Your Pet Ready?') },
    { name: 'Local Support Copy', test: html.includes("Sometimes the international journey isn&#x27;t the only thing on your plate.") || html.includes("Sometimes the international journey isn't the only thing on your plate.") },
    { name: 'Local Support Grooming', test: html.includes('If your pet needs to visit a veterinarian, groomer or other pet-care appointment before travelling') },
    { name: 'Local Support Journey', test: html.includes('Because sometimes getting ready to travel is a journey of its own.') },
    { name: 'Local Support Pet Taxi CTA', test: html.includes('Explore Dubai Pet Taxi') },

    // 6. DUBAI → CANADA / CANADA → DUBAI
    { name: 'Direction Eyebrow', test: html.includes('KNOW WHICH WAY YOUR PET IS TRAVELLING') },
    { name: 'Direction H2', test: html.includes('From Dubai to Canada? Or Canada to Dubai?') },
    { name: 'Export Card Title', test: html.includes('Moving FROM Dubai / UAE to Canada') },
    { name: 'Export Card Desc', test: html.includes('Your pet is leaving the UAE, so this is an export from the UAE and an import into Canada.') },
    { name: 'Import Card Title', test: html.includes('Moving INTO Dubai / UAE from Canada') },
    { name: 'Import Card Desc', test: html.includes('Your pet is entering the UAE, so this is an import into Dubai/UAE.') },
    { name: 'Direction Supporting Line', test: html.includes("Not sure which requirements apply to your pet? Start with your route and travel date, and we&#x27;ll help you understand what needs to be planned.") || html.includes("Not sure which requirements apply to your pet? Start with your route and travel date, and we'll help you understand what needs to be planned.") },

    // 7. WHY PET PARENTS CHOOSE GLOBAL PET CAB
    { name: 'Why Us Eyebrow', test: html.includes('WHY GLOBAL PET CAB') },
    { name: 'Why Us H2', test: html.includes("Because Your Pet Isn&#x27;t Just Another Piece of Luggage.") || html.includes("Because Your Pet Isn't Just Another Piece of Luggage.") },
    { name: 'Why Us Intro', test: html.includes("International relocation can feel complicated when you&#x27;re trying to figure everything out yourself.") || html.includes("International relocation can feel complicated when you're trying to figure everything out yourself.") },
    { name: 'Why Us Box 1', test: html.includes('Pet-first planning') },
    { name: 'Why Us Box 2', test: html.includes('Clear communication') },
    { name: 'Why Us Box 3', test: html.includes('Dubai &amp; worldwide support') || html.includes('Dubai & worldwide support') },
    { name: 'Why Us Box 4', test: html.includes('Professional relocation network') },
    { name: 'Why Us Box 5', test: html.includes('IPATA Member') },

    // 8. TRUST SECTION
    { name: 'Trust H2', test: html.includes("Your Pet&#x27;s Journey Deserves More Than a Booking Confirmation.") || html.includes("Your Pet's Journey Deserves More Than a Booking Confirmation.") },
    { name: 'Trust Copy', test: html.includes("We know you&#x27;re not simply sending a pet from one airport to another.") || html.includes("We know you're not simply sending a pet from one airport to another.") },
    { name: 'Trust Family', test: html.includes("You&#x27;re sending a family member.") || html.includes("You're sending a family member.") },
    { name: 'Trust Badges Label', test: html.includes('Trust Badges — Verify Before Publishing') },
    { name: 'Badge IATA', test: html.includes('IATA-Compliant Handling') },
    { name: 'Badge Countries', test: html.includes('45+ Countries') },
    { name: 'Badge Pets', test: html.includes('2,000+ Pets Transported') },

    // 9. FAQS
    { name: 'FAQ Eyebrow', test: html.includes('QUESTIONS PET PARENTS ASK') },
    { name: 'FAQ H2', test: html.includes('Dubai ↔ Canada Pet Relocation FAQs') },
    { name: 'FAQ Q1', test: html.includes('Can Global Pet Cab help move my pet from Dubai to Canada?') },
    { name: 'FAQ Q2', test: html.includes('What does it mean to export a pet from Dubai?') },
    { name: 'FAQ Q3', test: html.includes('What does it mean to import a pet into Dubai?') },
    { name: 'FAQ Q4', test: html.includes('Do I need a special travel crate for my pet?') },
    { name: 'FAQ Q5', test: html.includes('Can you help with airport transportation in Dubai?') },
    { name: 'FAQ Q6', test: html.includes("Can you help if I can&#x27;t take my pet to the vet or groomer myself?") || html.includes("Can you help if I can't take my pet to the vet or groomer myself?") },
    { name: 'FAQ Q7', test: html.includes("How early should I start planning my pet&#x27;s relocation?") || html.includes("How early should I start planning my pet's relocation?") },
    { name: 'FAQ Q8', test: html.includes('Can I get a quote before I have a confirmed travel date?') },

    // 10. FINAL CTA
    { name: 'Final CTA Eyebrow', test: html.includes("READY TO PLAN YOUR PET&#x27;S MOVE?") || html.includes("READY TO PLAN YOUR PET'S MOVE?") },
    { name: 'Final CTA H2', test: html.includes("Let&#x27;s Figure Out the Journey Together.") || html.includes("Let's Figure Out the Journey Together.") },
    { name: 'Final CTA Copy', test: html.includes("Tell us where your pet is travelling from, where they&#x27;re going and roughly when you want to travel.") || html.includes("Tell us where your pet is travelling from, where they're going and roughly when you want to travel.") },
    { name: 'Final CTA Button 1', test: html.includes('Get a Free Canada Relocation Quote →') },
    { name: 'Final CTA Button 2', test: html.includes('WhatsApp the Relocation Team') }
  ];

  let passed = 0;
  for (const t of tests) {
    if (t.test) {
      passed++;
    } else {
      console.log('FAIL:', t.name);
    }
  }

  console.log(`Canada Page Verification: ${passed}/${tests.length} tests passed.`);
}

run().catch(console.error);
