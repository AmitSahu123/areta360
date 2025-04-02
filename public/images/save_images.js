const fs = require('fs');
const path = require('path');

const images = {
  'coat.jpg': 'YOUR_COAT_IMAGE_BASE64',
  'warm-puffer.jpg': 'YOUR_WARM_PUFFER_IMAGE_BASE64',
  'bomber.jpg': 'YOUR_BOMBER_IMAGE_BASE64',
  'biker-jacket.jpg': 'YOUR_BIKER_JACKET_IMAGE_BASE64',
  'denim-jacket.jpg': 'YOUR_DENIM_JACKET_IMAGE_BASE64',
  'blazer.jpg': 'YOUR_BLAZER_IMAGE_BASE64',
  'printed-checked.jpg': 'YOUR_PRINTED_CHECKED_IMAGE_BASE64',
  'basic-tees.jpg': 'YOUR_BASIC_TEES_IMAGE_BASE64',
  'baseball-tee.jpg': 'YOUR_BASEBALL_TEE_IMAGE_BASE64',
  'crew-neck.jpg': 'YOUR_CREW_NECK_IMAGE_BASE64'
};

Object.entries(images).forEach(([filename, base64Data]) => {
  const filePath = path.join(__dirname, filename);
  const imageData = base64Data.replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(filePath, Buffer.from(imageData, 'base64'));
}); 