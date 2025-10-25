const fs = require('fs');
const path = require('path');

// Paths to font files
const fontsDir = path.join(__dirname, '../src/assets/fonts');
const normalFont = path.join(fontsDir, 's-n.woff2');
const semiBoldFont = path.join(fontsDir, 's-sb.woff2');

// Read and convert to base64
const normalFontBase64 = fs.readFileSync(normalFont).toString('base64');
const semiBoldFontBase64 = fs.readFileSync(semiBoldFont).toString('base64');

// Create output
const output = `// Auto-generated font base64 encoding
// Do not edit manually - run: node scripts/convert-fonts-to-base64.js

export const FONT_EA_NORMAL_BASE64 = 'data:font/woff2;base64,${normalFontBase64}';
export const FONT_EA_SEMIBOLD_BASE64 = 'data:font/woff2;base64,${semiBoldFontBase64}';
`;

// Write to file
const outputPath = path.join(__dirname, '../src/utils/fontBase64.js');
fs.writeFileSync(outputPath, output);

console.log('✅ Fonts converted to base64 successfully!');
console.log(`📁 Output: ${outputPath}`);
