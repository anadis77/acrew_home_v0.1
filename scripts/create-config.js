const fs = require('node:fs');

const endpoint = process.env.ACREW_CONTACT_ENDPOINT || '';

const config = `window.ACREW_CONTACT_ENDPOINT = ${JSON.stringify(endpoint)};\n`;

fs.writeFileSync('config.js', config);

if (!endpoint) {
  console.warn('ACREW_CONTACT_ENDPOINT is empty. Contact form submission will stay disabled.');
} else {
  console.log('config.js created from ACREW_CONTACT_ENDPOINT.');
}
