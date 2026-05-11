import fs from 'fs';
const html = fs.readFileSync('gallery.html', 'utf8');
const fixed = html.replace(/https:\/\/[^\/]+\/\/images\.squarespace-cdn\.com/g, 'https://images.squarespace-cdn.com');
fs.writeFileSync('gallery.html', fixed);
console.log('Fixed double slashes');
