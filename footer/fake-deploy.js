const fs = require('fs');

let footerComponent = fs.readFileSync('dist/footer-web-element/footer.js');
fs.writeFileSync('../my-app/src/assets/footer.js', footerComponent, {flag: 'w'});
