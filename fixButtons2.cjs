const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix button: bg-white on bg-white
    content = content.replace(/bg-white text-black hover:bg-gray-200/g, 'bg-bg-secondary text-text-primary border border-border hover:bg-accent-gold hover:text-white');
    
    // Fix hero button: text-text-primary on dark hero overlay
    content = content.replace(/<button class="([^"]*)border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white([^"]*)">([^<]*?)<\/button>/g, (match, p1, p2, p3) => {
        // If it's the hero section ("View Tours ↓"), we want it to be text-white originally.
        if (p3.includes("View Tours")) {
            return `<button class="${p1}border-2 border-accent-gold text-white hover:bg-accent-gold ${p2}">${p3}</button>`;
        }
        return match;
    });

    // We do a global check for other `text-text-primary` buttons inside hero section overlay
    // Actually, "View Tours ↓" was the main one affecting hero.
    
    // Group Tour Section (line 187) has a dark overlay but text-text-primary text! Look at:
    // <h2 class="text-5xl font-extrabold mb-6 text-text-primary font-heading">
    // Since it's on a dark image overlay, `text-text-primary` will become dark text on dark image. That's invisible! Let's change it to text-white.
    content = content.replace(/text-text-primary font-heading">Perfect for Groups & Events<\/h2>/g, 'text-white font-heading">Perfect for Groups & Events</h2>');
    content = content.replace(/text-text-secondary mb-8">Whether it's a bachelor party, a corporate team event, or a family gathering, our fleet of rickshaws can accommodate everyone.<\/p>/g, 'text-white/90 mb-8">Whether it\'s a bachelor party, a corporate team event, or a family gathering, our fleet of rickshaws can accommodate everyone.</p>');

    fs.writeFileSync(file, content);
}

// Add a few more fixes
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace standard unsplash URLs with some generic bike / Amsterdam images
// Amsterdam Canal Houses
indexHtml = indexHtml.replace(/https:\/\/images.unsplash.com\/photo-1534351590666-13e3e96b5017\?w=1400/g, 'https://images.unsplash.com/photo-1517054659491-118501e56d77?w=1400');
// Eco Green Nature -> more bike related
indexHtml = indexHtml.replace(/https:\/\/images.unsplash.com\/photo-1441974231531-c6227db76b6e\?w=1200/g, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200');

fs.writeFileSync('index.html', indexHtml);

console.log("Fixed transparent buttons and dark text over dark images.");
