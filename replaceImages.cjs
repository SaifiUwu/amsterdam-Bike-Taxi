const fs = require('fs');

const images = [
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_9_2025-07-10_18-46-20-1-1024x682-4-1.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2026/02/photo-3-2025-07-10-18-48-32-2-1024x681.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-8-2025-07-10-18-46-20-1024x682-1.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-4-2025-07-12-01-59-06-1024x683.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-2-2025-07-10-18-46-20-1.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-3-2025-07-10-18-48-32-1024x682-2.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-8-2025-07-10-18-48-32-1024x683-2.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-9-2025-07-12-01-59-06-1024x682.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-5-2025-07-12-01-59-06-1024x682.webp",
    "https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-2-2025-07-12-01-59-06-1024x591-2.webp"
];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace ANY unsplash url with our array sequentially
    let i = 0;
    content = content.replace(/https:\/\/images\.unsplash\.com\/[^"'\s]+/g, (match) => {
        const replacement = images[i % images.length];
        i++;
        return replacement;
    });

    // Fix some broken btn-premium text colors
    content = content.replace(/btn-premium/g, 'btn-premium border-2 border-accent-gold text-black');
    content = content.replace(/<button class="bg-accent-gold text-black px-10 py-4/g, '<button class="bg-accent-gold hover:bg-accent-hover text-black px-10 py-4');
    
    // Check missing button links from previously "transparent" buttons
    content = content.replace(/<button class="bg-bg-secondary text-text-primary border border-border hover:bg-accent-gold hover:text-white/g, '<button class="bg-bg-card border border-border text-text-primary hover:bg-accent-gold hover:text-white');

    // Make map frame less weird
    content = content.replace(/<iframe class="w-full h-full object-cover filter map-frame"/g, '<iframe class="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]"');

    fs.writeFileSync(file, content);
}
console.log("Replaced images.");
