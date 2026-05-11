const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const mainStart = index.indexOf('<main>');
const mainEnd = index.indexOf('</main>') + '</main>'.length;

const header = index.substring(0, mainStart);
const footer = index.substring(mainEnd);

const replaceHead = (headerStr, desc, canonical, title) => {
  let content = headerStr;
  if (title && content.includes('<title>')) {
    content = content.replace(/<title>.*?<\/title>/s, '<title>' + title + '</title>');
  }
  content = content.replace(/<meta name="description" content="[^"]*">\s*/g, '');
  content = content.replace(/<link rel="canonical" href="[^"]*">\s*/g, '');

  let injections = '';
  if (desc) injections += '    <meta name="description" content="' + desc + '">\n';
  if (canonical) injections += '    <link rel="canonical" href="' + canonical + '">\n';
  content = content.replace('</head>', injections + '</head>');
  return content;
};

// ============================================
// blog.html
// ============================================
const blogDesc = "Amsterdam travel tips, bike taxi guides and local insights. Learn the best way to explore Amsterdam by electric pedicab.";
const blogCan = "https://amsterdam-bike-taxi.com/blog";
const blogTitle = "Amsterdam Travel Blog | Bike Taxi Tips & Guides";
const blogHeader = replaceHead(header, blogDesc, blogCan, blogTitle);

const blogContent = `
    <main>
        <section class="relative pt-32 pb-20 bg-bg-secondary border-b border-border">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6">Amsterdam Travel Blog</h1>
                    <p class="text-text-secondary text-lg">Your local guide to navigating, exploring, and falling in love with Amsterdam's canals, history, and hidden treasures.</p>
                </div>
            </div>
        </section>

        <section class="py-12 bg-bg-primary border-b border-border">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="flex flex-wrap justify-center gap-4 mb-16">
                    <button class="px-6 py-2 rounded-full border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black transition-colors font-bold tracking-wide">All</button>
                    <button class="px-6 py-2 rounded-full border border-border text-text-secondary hover:border-accent-gold hover:text-accent-gold transition-colors font-bold tracking-wide">Tours</button>
                    <button class="px-6 py-2 rounded-full border border-border text-text-secondary hover:border-accent-gold hover:text-accent-gold transition-colors font-bold tracking-wide">Travel Tips</button>
                    <button class="px-6 py-2 rounded-full border border-border text-text-secondary hover:border-accent-gold hover:text-accent-gold transition-colors font-bold tracking-wide">Romantic</button>
                </div>

                <div class="grid md:grid-cols-2 gap-10">
                    <!-- Post 1 -->
                    <article class="bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-accent-gold transition-colors flex flex-col h-full group">
                        <div class="h-64 overflow-hidden relative">
                            <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2026/04/photo_2_2025-07-10_18-48-32-1.webp" alt="Top 10 Amsterdam Landmarks" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <div class="flex items-center gap-3 text-sm text-text-muted mb-4">
                                <span class="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Tours</span>
                                <span>May 10, 2026</span>
                            </div>
                            <h2 class="text-2xl font-bold font-heading mb-4 group-hover:text-accent-gold transition-colors">Top 10 Amsterdam Landmarks by Bike Taxi</h2>
                            <p class="text-text-secondary mb-4">Amsterdam is a city best explored outdoors, but walking everywhere can literally wear you down. Taking an electric bike taxi is increasingly becoming the top choice for travelers wanting to see the major landmarks in comfort.</p>
                            <p class="text-text-secondary mb-4">From the iconic Rijksmuseum to the poignant Anne Frank House, our electric pedicabs navigate the intricate canal rings with ease, giving you an unobstructed view without the fatigue of walking or the closed windows of a bus.</p>
                            <p class="text-text-secondary mb-6 flex-1">Our guides stop exactly where you want, giving you the perfect photo op at places like the Skinny Bridge. Here is our curated list of the absolute must-see places you can hit on a one-hour ride.</p>
                            <button class="text-accent-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2 group/btn border border-transparent hover:border-accent-gold border-b-accent-gold hover:bg-accent-gold hover:text-black py-2 px-4 rounded transition-all inline-block text-center w-fit">Read Article &rarr;</button>
                        </div>
                    </article>

                    <!-- Post 2 -->
                    <article class="bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-accent-gold transition-colors flex flex-col h-full group">
                        <div class="h-64 overflow-hidden relative">
                            <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/IMG_2264-683x1024-1.webp" alt="Why Pedicab is Faster" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <div class="flex items-center gap-3 text-sm text-text-muted mb-4">
                                <span class="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Travel Tips</span>
                                <span>April 22, 2026</span>
                            </div>
                            <h2 class="text-2xl font-bold font-heading mb-4 group-hover:text-accent-gold transition-colors">Why a Pedicab is Faster Than a Car in Amsterdam</h2>
                            <p class="text-text-secondary mb-4">If you try to drive a car through the Amsterdam city center, you're going to have a bad time. The historical center was built for horses and pedestrians, and today it is dominated by bicycles.</p>
                            <p class="text-text-secondary mb-4">Cars are restricted by one-way streets, endless traffic jams, and bridges that frequently open. An electric pedicab, however, uses the extensive network of bike lanes, bypassing automotive gridlock completely.</p>
                            <p class="text-text-secondary mb-6 flex-1">Not only is a bike taxi faster for point-to-point travel in the historic center, but it's also vastly cheaper than an Uber and far more environmentally friendly. Save time, save money, and enjoy the open air.</p>
                            <button class="text-accent-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2 group/btn border border-transparent hover:border-accent-gold border-b-accent-gold hover:bg-accent-gold hover:text-black py-2 px-4 rounded transition-all inline-block text-center w-fit">Read Article &rarr;</button>
                        </div>
                    </article>

                    <!-- Post 3 -->
                    <article class="bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-accent-gold transition-colors flex flex-col h-full group">
                        <div class="h-64 overflow-hidden relative">
                            <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/IMG_2523-scaled-1-683x1024-2.webp" alt="First time in Amsterdam" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <div class="flex items-center gap-3 text-sm text-text-muted mb-4">
                                <span class="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Travel Tips</span>
                                <span>March 05, 2026</span>
                            </div>
                            <h2 class="text-2xl font-bold font-heading mb-4 group-hover:text-accent-gold transition-colors">First Time in Amsterdam? Read This First</h2>
                            <p class="text-text-secondary mb-4">Amsterdam can be overwhelming for first-time visitors. The combination of trams, pedestrians, and thousands of speeding bicycles requires a bit of awareness to navigate safely.</p>
                            <p class="text-text-secondary mb-4">Rule number one: Never stand in the red bike lanes! The locals treat these as highways. Rule number two: Bring layers. The Dutch weather is notoriously unpredictable, switching from sun to rain in minutes.</p>
                            <p class="text-text-secondary mb-6 flex-1">Taking a guided bike taxi tour on your first day is the best way to get your bearings. A local guide can explain the layout of the canal rings and give you insights that you simply won't find in a generic guidebook.</p>
                            <button class="text-accent-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2 group/btn border border-transparent hover:border-accent-gold border-b-accent-gold hover:bg-accent-gold hover:text-black py-2 px-4 rounded transition-all inline-block text-center w-fit">Read Article &rarr;</button>
                        </div>
                    </article>

                    <!-- Post 4 -->
                    <article class="bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-accent-gold transition-colors flex flex-col h-full group">
                        <div class="h-64 overflow-hidden relative">
                            <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-1-2025-07-12-01-59-06.webp" alt="Romantic Amsterdam" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <div class="flex items-center gap-3 text-sm text-text-muted mb-4">
                                <span class="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Romantic</span>
                                <span>February 14, 2026</span>
                            </div>
                            <h2 class="text-2xl font-bold font-heading mb-4 group-hover:text-accent-gold transition-colors">Romantic Amsterdam — The Perfect Date Night Guide</h2>
                            <p class="text-text-secondary mb-4">There is arguably no city more romantic in Europe than Amsterdam at night. When the sun goes down, the city's 1,200 bridges light up, casting golden reflections across the dark canal waters.</p>
                            <p class="text-text-secondary mb-4">For the perfect date, skip the crowded tourist restaurants. Opt instead for a quiet dinner in the Jordaan district, followed by an evening pedicab ride along the Reguliersgracht—known as the canal of seven bridges.</p>
                            <p class="text-text-secondary mb-6 flex-1">Our drivers come prepared with cozy blankets and inside knowledge of the most secluded, beautiful spots for couples. It's the ultimate memorable experience, and yes, we've helped facilitate more than a few proposals!</p>
                            <button class="text-accent-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2 group/btn border border-transparent hover:border-accent-gold border-b-accent-gold hover:bg-accent-gold hover:text-black py-2 px-4 rounded transition-all inline-block text-center w-fit">Read Article &rarr;</button>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup Section at bottom -->
        <section class="py-20 bg-[#0f1f15] text-white">
            <div class="container mx-auto px-6 max-w-4xl text-center">
                <h2 class="text-3xl md:text-4xl font-bold font-heading mb-6">Join the Ride</h2>
                <p class="text-gray-300 mb-10 text-lg">Subscribe to our newsletter for the latest Amsterdam travel tips, exclusive discounts, and seasonal tour announcements.</p>
                <form class="flex flex-col sm:flex-row gap-4 justify-center">
                    <input type="email" placeholder="Your email address" class="px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent-gold sm:w-96">
                    <button type="submit" class="bg-accent-gold text-black font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-accent-hover transition-colors">Subscribe</button>
                </form>
            </div>
        </section>
    </main>
`;

fs.writeFileSync('blog.html', blogHeader + blogContent + footer, 'utf8');

// ============================================
// reviews.html
// ============================================
const reviewDesc = "Read 856+ verified customer reviews for Amsterdam Bike Taxi. 4.8 star rating on Google, TripAdvisor and Trustpilot.";
const reviewCan = "https://amsterdam-bike-taxi.com/reviews";
const reviewTitle = "Customer Reviews | Amsterdam Bike Taxi 4.8 Stars";
const reviewHeader = replaceHead(header, reviewDesc, reviewCan, reviewTitle);

const reviewContent = `
    <main>
        <section class="relative pt-32 pb-20 bg-bg-secondary border-b border-border">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="text-center max-w-3xl mx-auto mb-12">
                    <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6">4.8★ from 856+ Happy Travelers</h1>
                    <p class="text-text-secondary text-lg">Don't just take our word for it. See what our riders are saying about their Amsterdam Bike Taxi experiences.</p>
                </div>

                <div class="bg-bg-card p-10 rounded-2xl border border-border shadow-lg flex flex-col md:flex-row gap-12 items-center">
                    <div class="text-center md:w-1/3">
                        <div class="text-7xl font-bold font-heading text-white mb-2">4.8</div>
                        <div class="flex justify-center text-accent-gold text-2xl mb-2">
                            ★★★★★
                        </div>
                        <p class="text-text-secondary">Based on 856+ Reviews</p>
                        <p class="text-text-muted text-sm mt-1">Across 6 Platforms</p>
                    </div>
                    
                    <div class="md:w-2/3 flex flex-col gap-3 w-full">
                        <div class="flex items-center gap-4">
                            <span class="w-8 text-right font-bold text-sm">5★</span>
                            <div class="h-3 flex-1 bg-border rounded-full overflow-hidden">
                                <div class="h-full bg-accent-gold w-[88%]"></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="w-8 text-right font-bold text-sm">4★</span>
                            <div class="h-3 flex-1 bg-border rounded-full overflow-hidden">
                                <div class="h-full bg-accent-gold/80 w-[8%]"></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="w-8 text-right font-bold text-sm">3★</span>
                            <div class="h-3 flex-1 bg-border rounded-full overflow-hidden">
                                <div class="h-full bg-accent-gold/60 w-[2%]"></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="w-8 text-right font-bold text-sm">2★</span>
                            <div class="h-3 flex-1 bg-border rounded-full overflow-hidden">
                                <div class="h-full bg-accent-gold/40 w-[1%]"></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="w-8 text-right font-bold text-sm">1★</span>
                            <div class="h-3 flex-1 bg-border rounded-full overflow-hidden">
                                <div class="h-full bg-accent-gold/20 w-[1%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-10 flex justify-center gap-8 items-center flex-wrap opacity-70">
                    <div class="flex items-center gap-2 text-xl font-bold"><span class="text-blue-500">G</span>oogle</div>
                    <div class="flex items-center gap-2 text-xl font-bold text-green-500">TripAdvisor</div>
                    <div class="flex items-center gap-2 text-xl font-bold text-[#00b67a]">★ Trustpilot</div>
                </div>

                <div class="mt-12 text-center">
                    <a href="https://g.page/r/YOUR_GOOGLE_MAPS_LINK/review" target="_blank" class="inline-block bg-accent-gold text-black font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-accent-hover transition-colors shadow-lg hover:shadow-xl">Leave a Review</a>
                </div>
            </div>
        </section>

        <section class="py-20 bg-bg-primary">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Real Review 1 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"The Bike Taxi tour was incredible! Bobby showed us hidden landmarks we would never have found. His Dutch jokes made it so much fun!"</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">J</div>
                            <div>
                                <h4 class="font-bold text-white">Janny</h4>
                                <p class="text-xs text-text-muted">Business Visit</p>
                            </div>
                        </div>
                    </div>

                    <!-- Real Review 2 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"Absolutely the best way to see Amsterdam. Our guide was incredibly knowledgeable and the rickshaw was very comfortable even over the cobblestones."</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-[#ca4848] text-white rounded-full flex items-center justify-center font-bold">SJ</div>
                            <div>
                                <h4 class="font-bold text-white">Sarah J</h4>
                                <p class="text-xs text-text-muted">🇨🇦 Canada</p>
                            </div>
                        </div>
                    </div>

                    <!-- Real Review 3 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"Smooth booking, right on time, and completely stress-free. Marco picked us up right at the cruise terminal and took us straight to our hotel, showing us the sites on the way."</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">SS</div>
                            <div>
                                <h4 class="font-bold text-white">Sarah Smith</h4>
                                <p class="text-xs text-text-muted">Cruise passenger</p>
                            </div>
                        </div>
                    </div>

                    <!-- Real Review 4 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"Slawek was a fantastic guide! He navigated the busy Amsterdam streets like a pro. We saw more in one hour on the bike taxi than we did walking for three hours."</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">ZT</div>
                            <div>
                                <h4 class="font-bold text-white">Zhang T</h4>
                                <p class="text-xs text-text-muted">🇨🇳 China</p>
                            </div>
                        </div>
                    </div>

                    <!-- Real Review 5 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"We booked a romantic evening tour and it exceeded all expectations. Traveling through the illuminated canals with a warm blanket was the highlight of our trip."</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">S&amp;A</div>
                            <div>
                                <h4 class="font-bold text-white">Sarah &amp; Anne</h4>
                                <p class="text-xs text-text-muted">Cruise passengers</p>
                            </div>
                        </div>
                    </div>

                    <!-- Real Review 6 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"Very professional service. The electric bikes are quiet and clean. A much nicer experience than being crammed into a loud diesel bus. Highly recommended!"</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">L&amp;M</div>
                            <div>
                                <h4 class="font-bold text-white">Lynda &amp; Marta</h4>
                                <p class="text-xs text-text-muted">Tour Visit</p>
                            </div>
                        </div>
                    </div>

                    <!-- Real Review 7 -->
                    <div class="bg-bg-card border border-border p-8 rounded-xl flex flex-col">
                        <div class="text-accent-gold mb-4 text-xl">★★★★★</div>
                        <div class="text-text-secondary italic mb-6 flex-1 text-lg">"Excellent communication via WhatsApp. We arranged a pickup from our hotel to the museum district. Prompt, friendly, and fairly priced."</div>
                        <div class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <div class="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">M&amp;A</div>
                            <div>
                                <h4 class="font-bold text-white">Manar &amp; Ali</h4>
                                <p class="text-xs text-text-muted">🇦🇪 Dubai</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </main>
`;

fs.writeFileSync('reviews.html', reviewHeader + reviewContent + footer, 'utf8');

// ============================================
// app.html
// ============================================
const appDesc = "Download the I Am Bike Taxi app. Book your Amsterdam electric pedicab instantly. Real-time tracking, no prepayment. iOS and Android.";
const appCan = "https://amsterdam-bike-taxi.com/app";
const appTitle = "I Am Bike Taxi App | Book Amsterdam Pedicab Instantly";
const appHeader = replaceHead(header, appDesc, appCan, appTitle);

const appContent = `
    <main>
        <section class="relative pt-32 pb-20 bg-bg-secondary border-b border-border overflow-hidden">
            <div class="container mx-auto px-6 max-w-6xl relative z-10">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div class="inline-block bg-accent-gold/20 text-accent-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Official App</div>
                        <h1 class="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">Book Your Amsterdam Ride in 60 Seconds</h1>
                        <p class="text-text-secondary text-lg md:text-xl mb-10 leading-relaxed">Download <strong class="text-white">I Am Bike Taxi</strong> to request an eco-friendly pedicab instantly. See your driver approaching in real-time, pay later, and hit the canals.</p>
                        
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="https://apps.apple.com/ee/app/i-am-bike-taxi-lets-ride/id6636472992" target="_blank" class="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.82 3.59-.85 1.76-.04 3.12.63 3.96 1.83-3.3 1.95-2.77 6.07.38 7.33-.78 1.86-1.87 3.54-3.01 3.86zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                                <div>
                                    <div class="text-[10px] uppercase font-bold text-gray-600">Download on the</div>
                                    <div class="text-lg font-bold">App Store</div>
                                </div>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.dispatchblackfox.user" target="_blank" class="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M3.5 1.5v21l16-10.5L3.5 1.5z" fill="#4CAF50"/><path d="M3.5 1.5v21l10-10.5L3.5 1.5z" fill="#8BC34A"/><path d="M19.5 12l-6-5.5L3.5 1.5l16 10.5z" fill="#388E3C"/></svg>
                                <div>
                                    <div class="text-[10px] uppercase font-bold text-gray-600">GET IT ON</div>
                                    <div class="text-lg font-bold">Google Play</div>
                                </div>
                            </a>
                        </div>

                        <div class="mt-8 flex items-center gap-4 text-sm text-text-muted">
                            <span class="flex text-accent-gold">★★★★★</span>
                            <span>4.9★ on Trustpilot</span>
                        </div>
                    </div>
                    
                    <div class="relative flex justify-center">
                        <div class="w-64 h-[500px] bg-black border-[8px] border-gray-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
                            <div class="bg-bg-primary h-full w-full p-6 text-center pt-12 flex flex-col gap-4">
                                <div class="text-accent-gold font-heading text-xl font-bold mb-4">I Am Bike Taxi</div>
                                <div class="bg-bg-card flex-1 rounded-xl border border-border flex items-center justify-center p-4">
                                    <p class="text-sm text-text-secondary">Interactive map mock-up here</p>
                                </div>
                                <button class="bg-accent-gold text-black font-bold uppercase tracking-widest py-3 rounded w-full">Request Now</button>
                            </div>
                        </div>
                        <div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-gold/5 blur-[100px] rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-bg-primary">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">6 Reasons to Use the App</h2>
                    <p class="text-text-secondary">The fastest, safest, and most convenient way to book.</p>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-bg-card border border-border p-8 rounded-2xl">
                        <div class="text-3xl mb-4">📍</div>
                        <h3 class="text-xl font-bold mb-2">Real-Time GPS Tracking</h3>
                        <p class="text-text-secondary">Watch your driver approach on the live map so you know exactly when to step outside.</p>
                    </div>
                    <div class="bg-bg-card border border-border p-8 rounded-2xl">
                        <div class="text-3xl mb-4">⚡</div>
                        <h3 class="text-xl font-bold mb-2">Instant Confirmation</h3>
                        <p class="text-text-secondary">No waiting for email replies. Get matched with an available rider in seconds.</p>
                    </div>
                    <div class="bg-bg-card border border-border p-8 rounded-2xl">
                        <div class="text-3xl mb-4">💳</div>
                        <h3 class="text-xl font-bold mb-2">No Prepayment Required</h3>
                        <p class="text-text-secondary">Book with confidence. You only pay after your ride is safely completed.</p>
                    </div>
                    <div class="bg-bg-card border border-border p-8 rounded-2xl">
                        <div class="text-3xl mb-4">⏰</div>
                        <h3 class="text-xl font-bold mb-2">Available 24/7</h3>
                        <p class="text-text-secondary">Whether it's an early museum tour or a late night out, we are always available.</p>
                    </div>
                    <div class="bg-bg-card border border-border p-8 rounded-2xl">
                        <div class="text-3xl mb-4">📱</div>
                        <h3 class="text-xl font-bold mb-2">iOS + Android</h3>
                        <p class="text-text-secondary">Fully optimized native apps for both Apple and Android devices.</p>
                    </div>
                    <div class="bg-bg-card border border-border p-8 rounded-2xl">
                        <div class="text-3xl mb-4">🛡️</div>
                        <h3 class="text-xl font-bold mb-2">Safe &amp; Trusted</h3>
                        <p class="text-text-secondary">All drivers are licensed professionals and part of our verified network.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#0f1f15] text-white">
            <div class="container mx-auto px-6 max-w-4xl text-center">
                <h2 class="text-3xl md:text-4xl font-bold font-heading mb-12">How it Works</h2>
                <div class="grid sm:grid-cols-4 gap-8 relative">
                    <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden sm:block -z-10 -translate-y-1/2"></div>
                    
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-bg-card border-2 border-accent-gold rounded-full flex items-center justify-center text-xl font-bold text-accent-gold mb-4 relative z-10">1</div>
                        <h4 class="font-bold mb-2">Download</h4>
                        <p class="text-sm text-gray-400">Get the free app for your device.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-bg-card border-2 border-accent-gold rounded-full flex items-center justify-center text-xl font-bold text-accent-gold mb-4 relative z-10">2</div>
                        <h4 class="font-bold mb-2">Set Location</h4>
                        <p class="text-sm text-gray-400">Enter where you are and where you want to go.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-bg-card border-2 border-accent-gold rounded-full flex items-center justify-center text-xl font-bold text-accent-gold mb-4 relative z-10">3</div>
                        <h4 class="font-bold mb-2">Track Ride</h4>
                        <p class="text-sm text-gray-400">See your driver coming in real-time.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-bg-card border-2 border-accent-gold rounded-full flex items-center justify-center text-xl font-bold text-accent-gold mb-4 relative z-10">4</div>
                        <h4 class="font-bold mb-2">Enjoy</h4>
                        <p class="text-sm text-gray-400">Sit back, relax, and explore Amsterdam.</p>
                    </div>
                </div>

                <div class="mt-20 p-8 border border-accent-gold/30 rounded-2xl bg-black/40 backdrop-blur-sm max-w-2xl mx-auto">
                    <h3 class="text-2xl font-bold font-heading mb-2">Don't want to download?</h3>
                    <p class="text-gray-300 mb-6">You can also book directly via WhatsApp.</p>
                    <a href="https://wa.me/31612977991" target="_blank" class="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#1ebe5d] transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> WhatsApp +31 612 977 991</a>
                </div>
            </div>
        </section>
    </main>
`;

fs.writeFileSync('app.html', appHeader + appContent + footer, 'utf8');

// ============================================
// city-tours.html
// ============================================
const ctDesc = "Amsterdam city sightseeing tours by electric bike taxi. Visit Rijksmuseum, Anne Frank House, canals and more. From €12 per person.";
const ctCan = "https://amsterdam-bike-taxi.com/city-tours";
const ctTitle = "City Tours Amsterdam | Electric Bike Taxi from €12";
const ctHeader = replaceHead(header, ctDesc, ctCan, ctTitle);

// Fetch existing maps embed from city-tours if it exists
let existingMap = '';
if (fs.existsSync('city-tours.html')) {
    const oldCt = fs.readFileSync('city-tours.html', 'utf8');
    const mapMatch = oldCt.match(/<iframe.*?<\/iframe>/s);
    if (mapMatch) existingMap = mapMatch[0];
}

if (!existingMap) {
    existingMap = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.4259580456577!2d4.890693076991196!3d52.367205166687484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c1221b79ad%3A0xc39f82d2fc573c09!2sKoningsplein%207-9%2C%201017%20BB%20Amsterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1714080120287!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-2xl filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"></iframe>';
}

const ctContent = `
    <main>
        <section class="h-[60vh] flex items-center justify-center text-center relative overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2026/04/photo_2_2025-07-10_18-48-32-1.webp" class="w-full h-full object-cover opacity-60" alt="Amsterdam City Sightseeing">
                <div class="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/80 via-[#0e0e0e]/60 to-[#0e0e0e]"></div>
            </div>
            <div class="relative z-10 max-w-4xl px-6 fade-in-up">
                <h1 class="text-5xl md:text-6xl font-extrabold mb-6 font-heading">Amsterdam City Sightseeing<br/><span class="text-accent-gold">by Bike Taxi</span></h1>
                <p class="text-lg text-gray-300 font-medium tracking-wide mb-8">Comfortable, eco-friendly, and personal electric pedicab tours through the heart of the historic center.</p>
                <div class="flex gap-4 justify-center">
                    <a href="https://wa.me/31612977991" target="_blank" class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading transition-colors">Book Now &rarr;</a>
                </div>
            </div>
        </section>

        <section class="py-24 bg-bg-primary">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">Choose Your Package</h2>
                    <p class="text-text-secondary">All prices are per person. Minimum 2 persons per rickshaw.</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 mb-20">
                    <!-- Pack 1 -->
                    <div class="bg-bg-card border border-border p-8 rounded-2xl flex flex-col hover:border-accent-gold transition-colors relative overlay-glow">
                        <h3 class="text-2xl font-bold font-heading mb-2">Fun City Ride</h3>
                        <div class="text-text-secondary mb-6 15-20 min">15-20 min total ride time</div>
                        <div class="text-4xl font-bold text-accent-gold mb-6 border-b border-border pb-6">€12<span class="text-sm text-text-muted font-normal block mt-1">per person</span></div>
                        <ul class="space-y-4 text-text-secondary mb-8 flex-1">
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Quick overview of the center</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Canal district highlights</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Fun photo stops</li>
                        </ul>
                        <a href="https://wa.me/31612977991" class="block text-center w-full bg-bg-secondary border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black py-4 rounded font-bold uppercase tracking-widest transition-colors font-heading text-sm">Book This Ride</a>
                    </div>

                    <!-- Pack 2 -->
                    <div class="bg-bg-card border border-accent-gold p-8 rounded-2xl flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(229,192,123,0.1)]">
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-black font-bold uppercase tracking-widest text-xs px-4 py-1 rounded-full">Most Popular</div>
                        <h3 class="text-2xl font-bold font-heading mb-2">Old Town History</h3>
                        <div class="text-text-secondary mb-6">35 min total ride time</div>
                        <div class="text-4xl font-bold text-accent-gold mb-6 border-b border-border pb-6">€25<span class="text-sm text-text-muted font-normal block mt-1">per person</span></div>
                        <ul class="space-y-4 text-text-secondary mb-8 flex-1">
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Deep dive into Red Light District</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Jordaan neighborhood tour</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Guide explains history &amp; architecture</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Secret courtyard visits</li>
                        </ul>
                        <a href="https://wa.me/31612977991" class="block text-center w-full bg-accent-gold text-black hover:bg-accent-hover py-4 rounded font-bold uppercase tracking-widest transition-colors font-heading text-sm">Book This Ride</a>
                    </div>

                    <!-- Pack 3 -->
                    <div class="bg-bg-card border border-border p-8 rounded-2xl flex flex-col hover:border-accent-gold transition-colors relative overlay-glow">
                        <h3 class="text-2xl font-bold font-heading mb-2">Old Town Extended</h3>
                        <div class="text-text-secondary mb-6">1h 10min total ride time</div>
                        <div class="text-4xl font-bold text-accent-gold mb-6 border-b border-border pb-6">€35<span class="text-sm text-text-muted font-normal block mt-1">per person</span></div>
                        <ul class="space-y-4 text-text-secondary mb-8 flex-1">
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Complete city coverage</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Vondelpark &amp; Museum District</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Stops for coffee/snacks</li>
                            <li class="flex items-start gap-3"><span class="text-accent-gold">✓</span> Fully customized route option</li>
                        </ul>
                        <a href="https://wa.me/31612977991" class="block text-center w-full bg-bg-secondary border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black py-4 rounded font-bold uppercase tracking-widest transition-colors font-heading text-sm">Book This Ride</a>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 class="text-3xl font-bold font-heading mb-6">12-Stop Landmark Route</h3>
                        <p class="text-text-secondary mb-8">Our comprehensive routes cover all major attractions in the historical center.</p>
                        
                        <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-text-secondary">
                            <div class="flex items-center gap-2"><span class="text-accent-gold">1.</span> <span>Rijksmuseum</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">2.</span> <span>Vondelpark</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">3.</span> <span>Leidseplein</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">4.</span> <span>Anne Frank House</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">5.</span> <span>Jordaan District</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">6.</span> <span>Nine Streets</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">7.</span> <span>Dam Square</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">8.</span> <span>Royal Palace</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">9.</span> <span>Red Light District</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">10.</span> <span>Oude Kerk</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">11.</span> <span>Nieuwmarkt</span></div>
                            <div class="flex items-center gap-2"><span class="text-accent-gold">12.</span> <span>Rembrandtplein</span></div>
                        </div>

                        <div class="bg-[#111111] p-6 rounded-xl mt-10 border-l-4 border-accent-gold">
                            <h4 class="font-bold mb-3 text-white">What is included:</h4>
                            <ul class="text-gray-400 space-y-2 text-sm">
                                <li class="flex items-center gap-2">✓ Professional local guide</li>
                                <li class="flex items-center gap-2">✓ Cozy blankets for cold days</li>
                                <li class="flex items-center gap-2">✓ Stop-and-go photography moments</li>
                                <li class="flex items-center gap-2">✓ Safety canopy for rain</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <img src="https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/IMG_2523-scaled-1-683x1024-2.webp" alt="Route Highlights" class="w-full h-auto rounded-2xl border border-border shadow-2xl">
                        <div class="absolute -bottom-8 -left-8 bg-bg-card border border-border p-6 rounded-xl shadow-xl max-w-xs">
                            <div class="flex gap-1 text-accent-gold mb-2">★★★★★</div>
                            <p class="text-sm italic text-gray-300">"We saw so much more than we could have by walking. The 35min tour was perfect!"</p>
                            <p class="text-xs font-bold mt-2">— Sarah Miller</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Meeting Point Map Section -->
        <section class="py-24 bg-bg-secondary border-t border-border">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="text-center mb-12">
                     <h3 class="text-3xl font-bold font-heading mb-4">Meeting Point</h3>
                     <p class="text-text-secondary text-lg">Koningsplein 7-9, 1017 BB Amsterdam</p>
                </div>
                <div class="rounded-2xl overflow-hidden shadow-2xl border border-border">
                    ` + existingMap + `
                </div>
                <div class="mt-12 text-center">
                    <a href="https://wa.me/31612977991" target="_blank" class="inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20b858] text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest transition-colors shadow-lg shadow-[#25d366]/20">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Book Now via WhatsApp
                    </a>
                </div>
            </div>
        </section>
    </main>
`;

fs.writeFileSync('city-tours.html', ctHeader + ctContent + footer, 'utf8');

console.log("Written blog, reviews, app and city-tours html files");
