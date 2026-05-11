import fs from 'fs';
import * as cheerio from 'cheerio';

const urls = [
  'https://amsterdam-bike-taxi.com',
  'https://amsterdam-electric-pedicabs.com',
  'https://amsterdam-electric-rickshaws.com',
  'https://amsterdam-flower-bike-taxis.com',
  'https://iambiketaxi.com'
];

async function fetchImages() {
  const allImages = new Set();
  
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);
      
      $('img').each((i, el) => {
        let src = $(el).attr('src');
        if (src) {
           if (src.startsWith('/')) {
             src = url + src;
           }
           if (!src.endsWith('.svg') && !src.includes('logo') && (src.startsWith('http'))) {
             allImages.add(src);
           }
        }
      });
      console.log(`Fetched ${url}, total images now: ${allImages.size}`);
    } catch (e) {
      console.error(`Error fetching ${url}: ${e.message}`);
    }
  }
  
  const arr = [...allImages].filter(s => s.includes('wp-content/uploads') || s.includes('assets') || s.includes('image'));
  fs.writeFileSync('extracted_images.json', JSON.stringify(arr, null, 2));
}

fetchImages();
