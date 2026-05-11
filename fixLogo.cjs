const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<div class="text-xl md:text-2xl font-bold tracking-tight text-white/g, '<div class="text-xl md:text-2xl font-bold tracking-tight text-text-primary');
    fs.writeFileSync(file, content);
}
console.log("Fixed white logo in subpages.");
