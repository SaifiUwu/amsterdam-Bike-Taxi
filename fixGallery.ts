import fs from 'fs';

let html = fs.readFileSync('gallery.html', 'utf8');

const replacements = [
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-4-2025-07-12-01-59-06-1024x683.webp',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-2-2025-07-10-18-46-20-1.webp',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo-8-2025-07-10-18-46-20-1024x682-1.webp',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_2025-08-07_01-34-23-4-1024x683.jpg',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_11_2025-07-10_18-46-20-1024x682.jpg',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_13_2025-07-10_18-48-32-1024x683.jpg',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_15_2025-07-12_01-59-06-1024x683.jpg',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_6_2025-07-10_18-48-32-1024x683.jpg',
    'https://amsterdam-bike-taxi.com/wp-content/uploads/2025/08/photo_2025-08-07_01-34-23-2-1024x683.jpg'
];

let rIdx = 0;
html = html.replace(/https:\/\/assets\.zyrosite\.com\/[^"]+/g, (match) => {
    return replacements[rIdx++ % replacements.length];
});

fs.writeFileSync('gallery.html', html);
console.log('Fixed broken images in gallery.html');
