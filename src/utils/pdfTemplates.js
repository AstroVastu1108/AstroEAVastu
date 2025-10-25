import { FONT_EA_NORMAL_BASE64, FONT_EA_SEMIBOLD_BASE64 } from './fontBase64';

/**
 * Generate PDF footer template
 * @param {Object} options - Footer options
 * @param {string} options.kundaliId - Kundali ID to display
 * @param {string} options.reportType - Type of report (default: "Nakshatra AstroVastu Report")
 * @param {string} options.website - Website name (default: "AstroVastu.net")
 * @param {string} options.poweredBy - Powered by text (default: "Elephant Astrology")
 * @returns {string} HTML template for PDF footer
 */
export const getPdfFooterTemplate = ({
  kundaliId = '',
  reportType = 'Nakshatra AstroVastu Report',
  website = 'AstroVastu.net',
  websiteUrl = 'https://app-test.astrovastu.net/',
  poweredBy = 'Elephant Astrology'
} = {}) => {
  // Format date as DD-MM-YYYY HH:MM AM/PM (IST)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istDate = new Date(now.getTime() + istOffset);
  
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const year = istDate.getUTCFullYear();
  
  let hours = istDate.getUTCHours();
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const hoursStr = String(hours).padStart(2, '0');
  
  const generatedDate = `${day}-${month}-${year} ${hoursStr}:${minutes} ${ampm} (IST)`;
  
  return `
    <style>
      @font-face {
        font-family: 'ea-n';
        font-weight: 400;
        font-stretch: 100%;
        src: url('${FONT_EA_NORMAL_BASE64}') format('woff2');
      }
      @font-face {
        font-family: 'ea-sb';
        font-weight: 500;
        font-stretch: 100%;
        src: url('${FONT_EA_SEMIBOLD_BASE64}') format('woff2');
      }
    </style>
    <div style="width: 100%; font-size: 9px; padding: 5px 20px 0px 20px; color: #666; display: flex; justify-content: space-between; align-items: center; font-family: 'ea-n', sans-serif; margin-top: 5px;">
      <div>
        <a href="${websiteUrl}" style="font-family: 'ea-sb', sans-serif; font-weight: 500; color: #666; text-decoration: none;">${website}:</a>
        <span style="font-family: 'ea-n', sans-serif;">${reportType} | </span>
        <span style="font-family: 'ea-sb', sans-serif; font-weight: 500;"> Generated on: </span>
        <span style="font-family: 'ea-n', sans-serif;">${generatedDate} </span>
        <span style="font-family: 'ea-n', sans-serif;"> | Powered by </span>
        <a href="${websiteUrl}" style="font-family: 'ea-sb', sans-serif; font-weight: 500; color: #666; text-decoration: none;">${poweredBy}</a>
      </div>
      ${kundaliId ? `<span style="font-size: 8px; font-family: 'ea-n', sans-serif;"> # ${kundaliId} </span>` : ''}
    </div>
  `;
};

/**
 * Generate PDF header template (currently empty)
 * @param {Object} options - Header options
 * @returns {string} HTML template for PDF header
 */
export const getPdfHeaderTemplate = (options = {}) => {
  return '<div></div>';
};

/**
 * Get default PDF options for Puppeteer
 * @param {Object} customOptions - Custom options to override defaults
 * @returns {Object} PDF generation options
 */
export const getDefaultPdfOptions = (customOptions = {}) => {
  return {
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { 
      top: '10mm', 
      right: '5mm', 
      bottom: '10mm', 
      left: '5mm' 
    },
    scale: 0.7,
    displayHeaderFooter: true,
    ...customOptions
  };
};
