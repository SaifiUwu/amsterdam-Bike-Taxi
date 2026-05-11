import fs from 'fs';
import path from 'path';

const HTML_FILES = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of HTML_FILES) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace the background class
    content = content.replace(/bg-\[#0f1f15\]\/90 backdrop-blur-md shadow-md/g, 'bg-transparent');
    
    fs.writeFileSync(file, content);
    console.log(`Updated header bg in ${file}`);
}
