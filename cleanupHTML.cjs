const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix header links hover
    content = content.replace(/hover:text-text-primary/g, 'hover:text-accent-gold');

    // Fix hero buttons
    content = content.replace(/border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-text-primary/g, 'bg-bg-card text-text-primary hover:bg-accent-gold hover:text-black border border-border');
    
    // Fix divider in stats bar
    content = content.replace(/bg-white\/10/g, 'bg-border');
    
    // Fix footers and backgrounds that still have dark texts
    content = content.replace(/shadow-\[0_8px_30px_rgb\(0\,0\,0\,0\.04\)\] rounded-xl py-8 px-12 flex justify-between items-center shadow-2xl/g, 'rounded-xl py-8 px-12 flex justify-between items-center shadow-lg');

    // Hero title fix span span
    content = content.replace(/<\/span><\/span><\/h1>/g, '<\/span><\/h1>');

    // Check header text color
    content = content.replace(/<div class="text-xl md:text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">/g, '<div class="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">');
    // Header gets sticky, its font should be white initially since the image is dark.
    // Wait, let's use tailwind to keep the nav items white originally, changing to dark when scrolled? NO, they are over the hero. If the hero is dark, the header text MUST be white until scrolled. 
    // Since implementing that requires JS manipulation of classes on scroll... Let's just do it cleanly!

    fs.writeFileSync(file, content);
}
console.log("Cleanup done.");
