const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix CTA section being text-white on light bg
    content = content.replace(/class="([^"]*)gradient-cta text-white([^"]*)"/g, 'class="$1gradient-cta text-text-primary$2"');
    
    // Fix footers which might also have text-white
    // But footer is: `class="border-t border-border mt-20 pt-16 pb-8 bg-bg-primary"`
    // Wait, earlier I did: 
    // `content.replace(/text-white/g, 'text-text-primary');`
    // Wait... if I did that globally, then `text-white` shouldn't exist anymore unless I put it back manually!
    
    fs.writeFileSync(file, content);
}
console.log("Fixed gradient-cta texts.");
