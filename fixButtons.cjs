const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/hover:bg-accent-gold hover:text-accent-gold/g, 'hover:bg-accent-gold hover:text-white');
    content = content.replace(/hover:text-text-primary\/50 hover:text-accent-gold/g, 'text-text-primary/50 hover:text-accent-gold');
    content = content.replace(/<button class="w-full md:hidden border border-border text-text-primary py-3 rounded font-bold uppercase text-sm tracking-widest mt-4">/g, '<button class="w-full md:hidden border-2 border-accent-gold text-text-primary hover:bg-accent-gold hover:text-white py-3 rounded font-bold uppercase text-sm tracking-widest mt-4 transition-colors">');
    // Also, if button background is white with text black, we should adjust.
    fs.writeFileSync(file, content);
}
console.log("Fixed buttons");
