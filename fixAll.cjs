const fs = require('fs');
const path = require('path');

const seoData = {
  "index.html": {
    desc: "Explore Amsterdam by private electric pedicab. Eco-friendly bike taxi tours from €12. Canal rides, history tours and romantic rides. Book instantly via WhatsApp.",
    canon: "https://amsterdam-bike-taxi.com/",
    title: "Amsterdam Bike Taxi | Electric Pedicab Tours from €12"
  },
  "about.html": {
    desc: "Meet the Amsterdam Bike Taxi team — Bobby, Marco and Slawek. Local guides offering private electric pedicab tours through Amsterdam since 2021.",
    canon: "https://amsterdam-bike-taxi.com/about",
    title: "About Us | Amsterdam Bike Taxi Local Guides"
  },
  "services.html": {
    desc: "Book your Amsterdam bike taxi tour online. 12 tour packages from €12. City tours, romantic canal rides, accessible tours and full day experiences.",
    canon: "https://amsterdam-bike-taxi.com/services",
    title: "Book a Tour | Amsterdam Bike Taxi Services"
  },
  "tours.html": {
    desc: "Amsterdam city sightseeing tours by private electric pedicab. Fun rides from €12, history tours from €25. 12 landmark stops. Book today.",
    canon: "https://amsterdam-bike-taxi.com/tours",
    title: "City Sightseeing Tours | Amsterdam Bike Taxi from €12"
  },
  "blog.html": {
    desc: "Amsterdam travel tips, bike taxi guides and local insights. Learn the best way to explore Amsterdam by electric pedicab.",
    canon: "https://amsterdam-bike-taxi.com/blog",
    title: "Amsterdam Travel Blog | Bike Taxi Tips & Guides"
  },
  "gallery.html": {
    desc: "See real photos from Amsterdam Bike Taxi tours. Customers from around the world exploring Amsterdam by private electric rickshaw.",
    canon: "https://amsterdam-bike-taxi.com/gallery",
    title: "Photo Gallery | Amsterdam Bike Taxi Tours"
  },
  "contact.html": {
    desc: "Contact Amsterdam Bike Taxi. WhatsApp +31 612 977 991. Located at Koningsplein 7-9 Amsterdam. Open daily 8AM to 6PM.",
    canon: "https://amsterdam-bike-taxi.com/contact",
    title: "Contact Us | Amsterdam Bike Taxi WhatsApp"
  },
  "app.html": {
    desc: "Download the I Am Bike Taxi app. Book your Amsterdam electric pedicab instantly. Real-time tracking, no prepayment. iOS and Android.",
    canon: "https://amsterdam-bike-taxi.com/app",
    title: "I Am Bike Taxi App | Book Amsterdam Pedicab Instantly"
  },
  "reviews.html": {
    desc: "Read 856+ verified customer reviews for Amsterdam Bike Taxi. 4.8 star rating on Google, TripAdvisor and Trustpilot.",
    canon: "https://amsterdam-bike-taxi.com/reviews",
    title: "Customer Reviews | Amsterdam Bike Taxi 4.8 Stars"
  },
  "romantic-tours.html": {
    desc: "Romantic Amsterdam canal tours by private pedicab. Perfect for couples, proposals and anniversaries. From €30 per person.",
    canon: "https://amsterdam-bike-taxi.com/romantic-tours",
    title: "Romantic Amsterdam Canal Tours | Pedicab from €30"
  },
  "city-tours.html": {
    desc: "Amsterdam city sightseeing tours by electric bike taxi. Visit Rijksmuseum, Anne Frank House, canals and more. From €12 per person.",
    canon: "https://amsterdam-bike-taxi.com/city-tours",
    title: "City Tours Amsterdam | Electric Bike Taxi from €12"
  },
  "historical-center.html": {
    desc: "Explore 400 years of Amsterdam history by private rickshaw. Old Town tours from €25. Anne Frank, Royal Palace, Jewish Quarter and more.",
    canon: "https://amsterdam-bike-taxi.com/historical-center",
    title: "Amsterdam Historical Tours | Rickshaw from €25"
  },
  "privacy-policy.html": {
    desc: "Amsterdam Bike Taxi privacy policy. Learn how we collect and protect your personal data. GDPR compliant.",
    canon: "https://amsterdam-bike-taxi.com/privacy-policy",
    title: "Privacy Policy | Amsterdam Bike Taxi"
  },
  "our-network.html": {
    title: "Our Network | Amsterdam Bike Taxi 6 Official Sites"
  }
};

const schemaMarkup = [
  '<script type="application/ld+json">',
  '{',
  '  "@context": "https://schema.org",',
  '  "@type": "LocalBusiness",',
  '  "name": "Amsterdam Bike Taxi",',
  '  "image": "https://amsterdam-bike-taxi.com/wp-content/uploads/2026/04/photo_2_2025-07-10_18-48-32-1.webp",',
  '  "url": "https://amsterdam-bike-taxi.com",',
  '  "telephone": "+31612977991",',
  '  "email": "Amsterdam.Rickshaw.tours@gmail.com",',
  '  "address": {',
  '    "@type": "PostalAddress",',
  '    "streetAddress": "Koningsplein 7-9",',
  '    "addressLocality": "Amsterdam",',
  '    "postalCode": "1017 BB",',
  '    "addressCountry": "NL"',
  '  },',
  '  "geo": {',
  '    "@type": "GeoCoordinates",',
  '    "latitude": 52.3676,',
  '    "longitude": 4.8945',
  '  },',
  '  "openingHours": "Mo-Su 08:00-18:00",',
  '  "priceRange": "€12-€230",',
  '  "aggregateRating": {',
  '    "@type": "AggregateRating",',
  '    "ratingValue": "4.8",',
  '    "reviewCount": "856"',
  '  }',
  '}',
  '</script>'
].join('\n');

function updateHead(content, filename) {
  const data = seoData[filename];
  if (!data) return content;

  // Replace Title
  if (data.title) {
    if (content.includes('<title>')) {
      content = content.replace(/<title>.*?<\/title>/s, '<title>' + data.title + '</title>');
    } else {
      content = content.replace('</head>', '    <title>' + data.title + '</title>\n</head>');
    }
  }

  // Remove existing meta desc, canonical, and schema if they exist to prevent duplicates
  content = content.replace(/<meta name="description" content="[^"]*">\s*/g, '');
  content = content.replace(/<link rel="canonical" href="[^"]*">\s*/g, '');
  content = content.replace(/<script type="application\/ld\+json">.*?<\/script>\s*/gs, '');

  let injections = '';

  if (data.desc) {
    injections += '    <meta name="description" content="' + data.desc + '">\n';
  }
  if (data.canon) {
    injections += '    <link rel="canonical" href="' + data.canon + '">\n';
  }
  injections += '    ' + schemaMarkup.trim().split('\n').join('\n    ') + '\n';

  // Inject right before </head>
  content = content.replace('</head>', injections + '</head>');

  return content;
}

const htmlFiles = Object.keys(seoData).filter(f => fs.existsSync(f));

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // Issue 3: GLOBAL TEXT FIX "since 2024" -> "since 2021"
  content = content.replace(/since 2024/g, 'since 2021');

  // Issues 4, 5, 6, 8: Meta, Canonical, Schema, Title
  content = updateHead(content, file);

  // Issue 7: FIX index.html ONLY
  if (file === 'index.html') {
    // 1. Remove duplicate gallery link from mobile nav (around `<div id="mobile-menu"`)
    content = content.replace(
      '<a href="gallery.html" class="block py-3 border-b border-white/10 hover:text-accent-gold transition-colors" onclick="document.getElementById(\'close-menu\').click();">Gallery</a>\n            <a href="gallery.html" class="block py-3 border-b border-white/10 hover:text-accent-gold transition-colors" onclick="document.getElementById(\'close-menu\').click();">Gallery</a>',
      '<a href="gallery.html" class="block py-3 border-b border-white/10 hover:text-accent-gold transition-colors" onclick="document.getElementById(\'close-menu\').click();">Gallery</a>'
    );
    // Also handle just looking for multiple Gallery links in mobile menu section.
    let mobileNavMatch = content.match(/<div id="mobile-menu"[\s\S]*?<\/div>\s*<\/nav>/);
    if (mobileNavMatch) {
      let mobileNav = mobileNavMatch[0];
      const galleryLinkRegex = /<a href="gallery\.html"[^>]*>Gallery<\/a>\s*/g;
      let matches = [];
      let match;
      while ((match = galleryLinkRegex.exec(mobileNav)) !== null) {
        matches.push(match);
      }
      if (matches.length > 1) {
        mobileNav = mobileNav.slice(0, matches[1].index) + mobileNav.slice(matches[1].index + matches[1][0].length);
        content = content.substring(0, mobileNavMatch.index) + mobileNav + content.substring(mobileNavMatch.index + mobileNavMatch[0].length);
      }
    }

    // 2. Replace John Doe review
    const oldReview = ['<div class="text-text-secondary italic mb-6 text-lg">"Absolutely the best way to see Amsterdam. Our guide was incredibly knowledgeable and the rickshaw was very comfortable even over the cobblestones."</div>',
'                <div class="flex items-center justify-center gap-3">',
'                    <div class="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center text-black font-bold">JD</div>',
'                    <div class="text-left">',
'                        <h4 class="font-bold">John Doe</h4>',
'                        <p class="text-xs text-text-muted">🇨🇦 Canada</p>',
'                    </div>'].join('\n');

    const newReview = ['<div class="text-text-secondary italic mb-6 text-lg">"The Bike Taxi tour was incredible! Bobby showed us hidden landmarks we would never have found. His Dutch jokes made it so much fun!"</div>',
'                <div class="flex items-center justify-center gap-3">',
'                    <div class="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center text-black font-bold">J</div>',
'                    <div class="text-left">',
'                        <h4 class="font-bold">Janny</h4>',
'                        <p class="text-xs text-text-muted">Business Visit Amsterdam ★★★★★</p>',
'                    </div>'].join('\n');
    content = content.replace(oldReview, newReview);

    // 3. Footer Popular Rides section - separate gallery link and network link
    const oldListItems = ['<li><a href="gallery.html" class="hover:text-accent-gold transition-colors block py-2 min-h-[44px]">Gallery</a>',
'            <a href="our-network.html" class="text-gray-400 hover:text-accent-gold hover:translate-x-2 flex items-center gap-2 transition-all duration-300 before:content-[\'\'] before:w-0 before:h-[1px] before:bg-accent-gold hover:before:w-3 before:transition-all before:duration-300">Become a Driver</a></li>'].join('\n');
    const newListItems = ['<li><a href="gallery.html" class="text-gray-400 hover:text-accent-gold hover:translate-x-2 flex items-center gap-2 transition-all duration-300 before:content-[\'\'] before:w-0 before:h-[1px] before:bg-accent-gold hover:before:w-3 before:transition-all before:duration-300">Gallery</a></li>',
'                    <li><a href="our-network.html" class="text-gray-400 hover:text-accent-gold hover:translate-x-2 flex items-center gap-2 transition-all duration-300 before:content-[\'\'] before:w-0 before:h-[1px] before:bg-accent-gold hover:before:w-3 before:transition-all before:duration-300">Become a Driver</a></li>'].join('\n');
    content = content.replace(oldListItems, newListItems);
  }

  fs.writeFileSync(file, content, 'utf8');
}

console.log("Processed global edits successfully.");
