const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/text-gray-[1-4]00/g, 'text-text-secondary');
    content = content.replace(/text-gray-500/g, 'text-text-muted');
    content = content.replace(/bg-\[#25D366\]/g, 'bg-accent-green');
    fs.writeFileSync(file, content);
}
console.log("Replaced grays.");
