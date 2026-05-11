import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Changing text-white/90 to text-black in the navigation
    content = content.replace(/<nav class="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-white\/90">/g, '<nav class="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-[#0e0e0e]">');
    
    // Changing the first button in header (Book Now CTA) from text-black to text-white
    content = content.replace(/<button class="hidden md:block bg-accent-gold hover:bg-accent-hover text-black px-8/g, '<button class="hidden md:block bg-accent-gold hover:bg-accent-hover text-white px-8');
    
    fs.writeFileSync(file, content);
    console.log("Updated", file);
}
