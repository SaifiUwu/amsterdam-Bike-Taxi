import fs from 'fs';

const extracted = JSON.parse(fs.readFileSync('extracted_images.json', 'utf8')).filter(s => !s.includes('.svg') && !s.includes('logo') && s.length > 20);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let idx = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // We replace the images we put previously that were unsplash
    if (content.match(/src="https:\/\/images\.unsplash\.com[^"]+"/)) {
        content = content.replace(/src="https:\/\/images\.unsplash\.com[^"]+"/g, () => {
            return `src="${extracted[idx++ % extracted.length]}"`;
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated images in ${file}`);
    }
}
