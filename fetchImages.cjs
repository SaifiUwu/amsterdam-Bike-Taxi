const https = require('https');

https.get('https://amsterdam-bike-taxi.com', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const urls = new Set();
    while ((match = regex.exec(data)) !== null) {
      if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/i)) {
        urls.add(match[1]);
      }
    }
    
    // Also try checking for background images or other image links
    const regex2 = /url\(['"]?([^'"\)]+)['"]?\)/g;
    while ((match = regex2.exec(data)) !== null) {
       if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/i)) {
        urls.add(match[1]);
      }
    }

    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
