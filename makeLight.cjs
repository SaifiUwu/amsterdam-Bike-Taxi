const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Change body classes
    content = content.replace(/body class=".*?bg-slate-900.*?text-white.*?"/, 'body class="bg-bg-primary text-text-primary antialiased"');
    
    // Header
    content = content.replace(/text-\[\#CCCCCC\]/g, 'text-text-secondary');
    
    // Hero Buttons (View Tours)
    content = content.replace(/border border-white\/20 hover:bg-white\/10 text-white/g, 'border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white');
    
    // Backgrounds
    content = content.replace(/bg-bg-card glass-panel/g, 'bg-bg-card border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]');
    
    // Text colors
    content = content.replace(/text-white/g, 'text-text-primary');
    content = content.replace(/text-\[#cccccc\]/gi, 'text-text-secondary');
    content = content.replace(/bg-slate-950/g, 'bg-bg-secondary');
    content = content.replace(/bg-slate-900/g, 'bg-bg-secondary');
    content = content.replace(/border-white\/10/g, 'border-border');
    content = content.replace(/border-white\/20/g, 'border-border');
    content = content.replace(/hover:text-white/g, 'hover:text-accent-gold');
    content = content.replace(/bg-black\/20/g, 'bg-bg-secondary');
    content = content.replace(/bg-black\/30/g, 'bg-bg-secondary');
    content = content.replace(/bg-black\/50/g, 'bg-bg-secondary');
    content = content.replace(/bg-black\/80/g, 'bg-bg-secondary');
    content = content.replace(/hover:bg-white\/5/g, 'hover:bg-black/5');
    
    // Convert static green buttons/elements that might clash
    content = content.replace(/bg-\[\#1B4332\]/g, 'bg-accent-green');
    
    // SVG icons fill
    content = content.replace(/fill="white"/g, 'fill="currentColor"');

    // Make hero overlay look good on dark images but keep text readable
    // the hero title has text-white directly if we replaced it, wait, we replaced text-white with text-text-primary. 
    // We want the hero *text* to be white if the hero image is dark!
    
    // Actually, if we're making it a luxury Light theme, let's keep the hero text dark if the background is light?
    // No, hero has an image "Amsterdam Canal Night" - that image is dark, so text should be white.
    // Let's force hero text to be white.
    content = content.replace(/class="relative z-10 max-w-4xl px-6 fade-in-up" /g, 'class="relative z-10 max-w-4xl px-6 fade-in-up text-white" ');
    content = content.replace(/<h1 class="text-6xl md:text-7xl font-extrabold mb-6 font-heading text-text-primary">/g, '<h1 class="text-6xl md:text-7xl font-extrabold mb-6 font-heading text-white">');
    content = content.replace(/EXPERIENCE AMSTERDAM <br\/>.*?(text-accent-gold).*?LIKE NEVER BEFORE/g, 'EXPERIENCE AMSTERDAM <br/><span class="text-accent-gold">LIKE NEVER BEFORE</span>');
    // Also, hero paragraph
    content = content.replace(/<p class="text-xl text-text-secondary font-medium tracking-wide mb-8 typewriter h-8">/g, '<p class="text-xl text-white font-medium tracking-wide mb-8 typewriter h-8">');

    // Make the header links darker if it's not scrolled
    // Handled in CSS!
    
    fs.writeFileSync(file, content);
}
