const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
const index = css.indexOf('/* Light Mode Overrides */');
if (index !== -1) {
    fs.writeFileSync('style.css', css.substring(0, index));
    console.log("Stripped light mode overrides from style.css");
} else {
    console.log("No overrides found.");
}
