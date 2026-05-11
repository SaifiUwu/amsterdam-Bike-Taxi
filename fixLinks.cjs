const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
    /<button class="hidden md:block bg-accent-gold hover:bg-accent-hover text-black px-8 py-3 rounded font-bold uppercase text-xs tracking-widest transition-colors font-heading shadow-md">Book Now →<\/button>/g,
    '<button class="hidden md:block bg-accent-gold hover:bg-accent-hover text-black px-8 py-3 rounded font-bold uppercase text-xs tracking-widest transition-colors font-heading shadow-md" onclick="window.location.href=\'services.html#book\'">Book Now →</button>'
);

content = content.replace(
    /<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading">Book Your Ride<\/button>/g,
    '<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading" onclick="window.location.href=\'services.html#book\'">Book Your Ride</button>'
);

content = content.replace(
    /<button class="border-2 border-accent-gold text-white hover:bg-accent-gold  px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading">View Tours ↓<\/button>/g,
    '<button class="border-2 border-accent-gold text-white hover:bg-accent-gold  px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading" onclick="window.location.href=\'tours.html\'">View Tours ↓</button>'
);

content = content.replace(
    /<button class="bg-bg-card border border-border text-text-primary hover:bg-accent-gold hover:text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors">Meet Our Team →<\/button>/g,
    '<button class="bg-bg-card border border-border text-text-primary hover:bg-accent-gold hover:text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors" onclick="window.location.href=\'about.html\'">Meet Our Team →</button>'
);

content = content.replace(
    /<button class="hidden md:block border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white px-6 py-2 rounded font-bold uppercase text-sm tracking-widest transition-colors">View All 12 Tours →<\/button>/g,
    '<button class="hidden md:block border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white px-6 py-2 rounded font-bold uppercase text-sm tracking-widest transition-colors" onclick="window.location.href=\'tours.html\'">View All 12 Tours →</button>'
);

content = content.replace(
    /<button class="w-full md:hidden border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white py-3 rounded font-bold uppercase text-sm tracking-widest mt-4 transition-colors">View All Tours →<\/button>/g,
    '<button class="w-full md:hidden border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white py-3 rounded font-bold uppercase text-sm tracking-widest mt-4 transition-colors" onclick="window.location.href=\'tours.html\'">View All Tours →</button>'
);

content = content.replace(
    /<button class="bg-accent-green text-black hover:bg-green-600 px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors">Learn More →<\/button>/g,
    '<button class="bg-accent-green text-black hover:bg-green-600 px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors" onclick="window.location.href=\'services.html\'">Learn More →</button>'
);

content = content.replace(
    /<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading transition-transform hover:scale-105">Book a Group Tour<\/button>/g,
    '<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase text-sm tracking-widest font-heading transition-transform hover:scale-105" onclick="window.location.href=\'contact.html\'">Book a Group Tour</button>'
);

content = content.replace(
    /<button class="border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors">Explore Full Gallery →<\/button>/g,
    '<button class="border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors" onclick="window.location.href=\'gallery.html\'">Explore Full Gallery →</button>'
);

content = content.replace(
    /<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase tracking-widest text-sm transition-colors w-full sm:w-auto">Book Now →<\/button>/g,
    '<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4 rounded font-bold uppercase tracking-widest text-sm transition-colors w-full sm:w-auto" onclick="window.location.href=\'services.html#book\'">Book Now →</button>'
);

content = content.replace( // This will replace all 4 buttons at once
    /<button class="w-full bg-black text-white hover:bg-accent-gold hover:text-black py-4 rounded font-bold transition-colors uppercase tracking-widest text-sm shadow-md">Book Now<\/button>/g,
    '<button class="w-full bg-black text-white hover:bg-accent-gold hover:text-black py-4 rounded font-bold transition-colors uppercase tracking-widest text-sm shadow-md" onclick="window.location.href=\'services.html#book\'">Book Now</button>'
);


fs.writeFileSync('index.html', content);
console.log("Done");
