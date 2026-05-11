const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Make "Book Now" buttons in cards much bolder: solid black with gold text or solid gold with black text
    content = content.replace(/class="w-full bg-bg-secondary text-text-primary border border-border hover:bg-accent-gold hover:text-white py-3 rounded font-bold transition-colors"/g, 
        'class="w-full bg-black text-white hover:bg-accent-gold hover:text-black py-4 rounded font-bold transition-colors uppercase tracking-widest text-sm shadow-md"');
    
    // Fix Group tour and other hero texts to have better text-shadow or contrast in case the image is bright
    content = content.replace(/class="text-5xl font-extrabold mb-6 text-white font-heading"/g, 'class="text-5xl font-extrabold mb-6 text-white font-heading drop-shadow-md"');
    content = content.replace(/class="text-lg md:text-xl text-white\/90 mb-8"/g, 'class="text-lg md:text-xl text-white font-medium drop-shadow-md mb-8"');
    
    // Check if the 2026/02 image is breaking
    content = content.replace(/uploads\/2026\/02\/photo-3-2025-07-10-18-48-32-2-1024x681.webp/g, 'uploads/2025/08/photo-3-2025-07-10-18-48-32-1024x682-2.webp');

    fs.writeFileSync(file, content);
}
console.log("Fixed buttons visibility and removed potentially broken image link.");
