// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import House from '@/components/preview/House/House'
import SummaryAspect from '@/components/preview/PlanetSummary/PlanetSummary'
import InfoTable from '@/components/preview/InfoTable/InfoTable'
import pako from 'pako';

// Style Imports
import "./preview.css"
import NakshtraSummary from '@/components/preview/NakshtraSummary/NakshtraSummary';
import RahuKetu from '@/components/preview/RahuKetu/RahuKetu';
import DashaDetails from '@/components/preview/DashaDetails/DashaDetails';
import LoardPlanet from '@/components/preview/LoardPlanet/LoardPlanet'
import { Button, Chip, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Event from '@/components/preview/Event/Event'
import PrakritiPopUp from '@/components/preview/InfoTable/PrakritiPopUp'
import KundliOption from '@/components/preview/KundliOption/KundliOption'
import { DashaClickEvent, KundliOptionsData, RotateChartEvent, UpdateKundli } from '@/app/Server/API/kundliAPI'
import JaiminiCharKarakasPopUp from '@/components/preview/JaiminiCharKarakas/JaiminiCharKarakas'
import NavTaraChakra from '@/components/preview/NavTaraChakra/NavTaraChakra'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import Rotation from '@/components/preview/Rotation/Rotation'
import EALoader from '@/components/common/EA-Loader/EALoader'
import LifeEvent from '@/components/preview/LifeEvent/LifeEvent'
import Loader from '@/components/common/Loader/Loader'
import ConfirmationPopup from '@/components/common/ConfirmationPopup/ConfirmationPopup'
import { toast } from 'react-toastify'

const PreviewCard = ({ kundliData, isPrintDiv, handleDownload, handleTimeTool, TransitData, setTransitData, getTransitData, getDivisionalChartData, DivisionalData, setDivisionalData, birthDate, setKundliData, SetKundliConstData }) => {
  // var
  const BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  const AstroDetails = kundliData?.AstroVastuReport?.AstroDetails;
  const ChartSVG = kundliData?.AstroVastuReport?.ChartSVG;
  const AstroVastuHouseScript = kundliData?.AstroVastuReport?.AstroVastuHouseScript;
  const Symbols = kundliData?.AstroVastuReport?.Symbols;
  const PlanetSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryPlanet;
  const HouseSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryHouse;
  const PlaneNSummaryData = kundliData?.AstroVastuReport?.PlanetScript;
  const HouseNSummaryData = kundliData?.AstroVastuReport?.HouseScript;
  const RahuData = kundliData?.AstroVastuReport?.RahuSpecial;
  const KetuData = kundliData?.AstroVastuReport?.KetuSpecial;
  const DashaDetailData = kundliData?.AstroVastuReport?.DashaDetails;
  const JaiminiCharKarakas = kundliData?.AstroVastuReport?.JaiminiCharKarakas;
  const NavTaraChakraData = kundliData?.AstroVastuReport?.NavTaraChakra;

  const [anchorEl, setAnchorEl] = useState(null);
  const [LifeEventValue, setLifeEventValue] = useState(null);
  const [EventValue, setEventValue] = useState(null);
  const [kundliOptValue, setKundliOptValue] = useState("V");
  const [isPrakritiVisible, setIsPrakritiVisible] = useState(false);
  const [openLifeEvent, setOpenLifeEvent] = useState(false);
  const [openKundli, setOpenKundli] = useState(false);
  const [openJCK, setJCK] = useState(false);
  const [openNTC, setNTC] = useState(false);
  const [openRotation, setRotation] = useState(false);
  const [rotationType, setRotationType] = useState(null);
  const [allKundliOpt, setAllKundliOpt] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [DashaValue, setDashaValue] = useState("Vimshottari Dasha");
  const [DashaTitle, setDashaTitle] = useState(`${DashaDetailData?.CurrentMD}`);
  const [DashaGridData, setDashaGridData] = useState(kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha);
  const [DashaDate, setDashaDate] = useState(DashaDetailData?.MahaDasha.filter((e) => e.IsCurrent == true)[0]?.StartDt);
  const [rotationTital, setRotationTitle] = useState("");
  const [SaveKundali, setSaveKundali] = useState(false);

  const open = Boolean(anchorEl);
  const pageRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    setTransitData(ChartSVG?.HouseChart);
  }, [])

  const handleIsPraOpen = () => {
    handleClose();
    setIsPrakritiVisible(true)
  }

  const handleIsPraClose = () => {
    setIsPrakritiVisible(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleMenuDownload = async () => {
  //   handleClose();
  //   setLoading(true);
  //   const kundaliId = BirthDetails.KundaliID;
  //   const printContainer = document.createElement('div')
  //   const content = pageRef.current.cloneNode(true)
  //   printContainer.appendChild(content)
  //   const fullHtml = `
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <meta charset="utf-8">
  //       <title>Report PDF</title>
  //       <style>
  //         @page { size: landscape; margin: 20px; }
  //         body { font-family: Arial, sans-serif; background: white; margin: 0; padding: 10px; }
  //         * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  //         .page-break { page-break-after: always; }
  //       </style>
  //     </head>
  //     <body>
  //       ${printContainer.innerHTML}
  //     </body>
  //   </html>`
  //  // Send HTML to Next.js API route
  //      const response = await fetch('/api/generate-pdf', {
  //        method: 'POST',
  //        headers: { 'Content-Type': 'application/json' },
  //        body: JSON.stringify({ html: fullHtml })
  //      })

  //      if (!response.ok) {
  //        throw new Error(`Server responded with ${response.status}`)
  //      }

  //      // Receive binary PDF
  //      const blob = await response.blob()
  //      const url = URL.createObjectURL(blob)

  //      // Dynamic filename
  //      const fullDateTime = '2025-05-11 05:30:45'
  //      const formattedDate = fullDateTime.split(' ')[0].replace(/-/g, '')

  //      const filename = `AstroReport_${formattedDate}.pdf`

  //      // Trigger download
  //      const link = document.createElement('a')
  //      link.href = url
  //      link.download = filename
  //      link.click()
  //      URL.revokeObjectURL(url)

  //      toast.success('PDF downloaded successfully!')
  //   // try {
  //   //   const response = await fetch(`/api/generate-pdf?id=${kundaliId}`);

  //   //   if (!response.ok) {
  //   //     throw new Error('Failed to generate PDF');
  //   //   }

  //   //   // Get the PDF as a blob
  //   //   const blob = await response.blob();

  //   //   // Create a download link
  //   //   const url = window.URL.createObjectURL(blob);
  //   //   const a = document.createElement('a');
  //   //   a.href = url;
  //   //   a.download = `kundali-${kundaliId}_demo.pdf`;
  //   //   document.body.appendChild(a);
  //   //   a.click();

  //   //   // Cleanup
  //   //   window.URL.revokeObjectURL(url);
  //   //   document.body.removeChild(a);

  //   // } catch (error) {
  //   //   console.error('Error downloading PDF:', error);
  //   //   alert('Failed to download PDF');
  //   // } finally {
  //   //   setLoading(false);
  //   // }

  //   // handleDownload();
  // }

  //   const handleMenuDownload = async () => {
  //   handleClose();
  //   setLoading(true);

  //   try {
  //     const kundaliId = BirthDetails.KundaliID;

  //     // Get all stylesheets from the page
  //     const styles = Array.from(document.styleSheets)
  //       .map(styleSheet => {
  //         try {
  //           return Array.from(styleSheet.cssRules)
  //             .map(rule => rule.cssText)
  //             .join('\n');
  //         } catch (e) {
  //           // Handle CORS issues with external stylesheets
  //           console.warn('Cannot access stylesheet:', e);
  //           return '';
  //         }
  //       })
  //       .join('\n');

  //     // Get inline styles
  //     const inlineStyles = Array.from(document.querySelectorAll('style'))
  //       .map(style => style.innerHTML)
  //       .join('\n');

  //     // Clone the content
  //     const printContainer = document.createElement('div');
  //     const content = pageRef.current.cloneNode(true);
  //     printContainer.appendChild(content);

  //     const fullHtml = `
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <meta charset="utf-8">
  //         <title>Report PDF</title>
  //         <style>
  //           @page { size: landscape; margin: 20px; }
  //           body { 
  //             font-family: Arial, sans-serif; 
  //             background: white; 
  //             margin: 0; 
  //             padding: 10px; 
  //           }
  //           * { 
  //             -webkit-print-color-adjust: exact !important; 
  //             print-color-adjust: exact !important; 
  //           }
  //           .page-break { page-break-after: always; }

  //           /* Captured styles from the page */
  //           ${styles}
  //           ${inlineStyles}
  //         </style>
  //       </head>
  //       <body>
  //         ${printContainer.innerHTML}
  //       </body>
  //     </html>`;

  //     // Send HTML to Next.js API route
  //     const response = await fetch('/api/generate-pdf', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ html: fullHtml })
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server responded with ${response.status}`);
  //     }

  //     // Receive binary PDF
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);

  //     // Dynamic filename
  //     const fullDateTime = '2025-05-11 05:30:45';
  //     const formattedDate = fullDateTime.split(' ')[0].replace(/-/g, '');
  //     const filename = `AstroReport_${formattedDate}.pdf`;

  //     // Trigger download
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = filename;
  //     link.click();
  //     URL.revokeObjectURL(url);

  //     toast.success('PDF downloaded successfully!');
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //     toast.error('Failed to download PDF');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleMenuDownload = async () => {
  //   handleClose();
  //   setLoading(true);

  //   const convertCssUrlsToAbsolute = (cssText, baseHref) => {
  //     if (!cssText) return '';

  //     let baseUrl;
  //     try {
  //       baseUrl = new URL(baseHref || window.location.href);
  //     } catch (error) {
  //       baseUrl = new URL(window.location.href);
  //     }

  //     return cssText.replace(/url\(\s*(['"]?)([^'"\)\(]+)\1\s*\)/g, (match, quote, rawUrl) => {
  //       const cleaned = rawUrl.trim();

  //       if (!cleaned || cleaned.startsWith('data:') || cleaned.startsWith('#') || cleaned.startsWith('var(') || /^https?:\/\//i.test(cleaned) || cleaned.startsWith('//')) {
  //         return match;
  //       }

  //       try {
  //         const absoluteUrl = new URL(cleaned, baseUrl).href;
  //         const safeQuote = quote || '"';
  //         return `url(${safeQuote}${absoluteUrl}${safeQuote})`;
  //       } catch (error) {
  //         return match;
  //       }
  //     });
  //   };

  //   try {
  //     const buildPrintableDocument = async () => {
  //       if (!pageRef.current) {
  //         throw new Error('Printable content is not available');
  //       }

  //       const clonedContent = pageRef.current.cloneNode(true);
  //       const rect = pageRef.current.getBoundingClientRect();
  //       const rawWidth = pageRef.current.scrollWidth || rect.width || pageRef.current.offsetWidth || 0;
  //       const rawHeight = pageRef.current.scrollHeight || rect.height || pageRef.current.offsetHeight || 0;
  //       const contentWidth = Math.max(Math.ceil(rawWidth), 1);
  //       const contentHeight = Math.max(Math.ceil(rawHeight), 1);

  //       const MM_PER_INCH = 25.4;
  //       const CSS_DPI = 96;
  //       const mmToPx = mm => Math.round((mm / MM_PER_INCH) * CSS_DPI);

  //       const A4_WIDTH_MM = 297;
  //       const A4_HEIGHT_MM = 10;
  //       const paddingMm = 10;
  //       const a4WidthPx = mmToPx(A4_WIDTH_MM);
  //       const a4HeightPx = mmToPx(A4_HEIGHT_MM);
  //       const horizontalPaddingPx = mmToPx(paddingMm);
  //       const verticalPaddingPx = mmToPx(paddingMm);
  //       const availableWidthPx = Math.max(a4WidthPx - horizontalPaddingPx * 2, 0);
  //       const availableHeightPx = Math.max(a4HeightPx - verticalPaddingPx * 2, 0);
  //       const scale = contentWidth > 0 ? Math.min(1, availableWidthPx / contentWidth) : 1;
  //       const scaledContentHeight = Math.ceil(contentHeight * scale);
  //       const viewportWidth = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0, a4WidthPx || 0, 1280);
  //       const viewportHeight = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0, Math.min(a4HeightPx || 0, 4096), 900);
  //       const bodyBg = window.getComputedStyle(document.body).backgroundColor || '#fff';

  //       const doc = document.implementation.createHTMLDocument('Report PDF');
  //       doc.title = document.title || 'Report PDF';

  //       const copyAttributes = (source, target) => {
  //         Array.from(source.attributes || []).forEach(attr => {
  //           target.setAttribute(attr.name, attr.value);
  //         });
  //       };

  //       copyAttributes(document.documentElement, doc.documentElement);
  //       copyAttributes(document.body, doc.body);

  //       const metaCharset = doc.createElement('meta');
  //       metaCharset.setAttribute('charset', 'utf-8');
  //       doc.head.prepend(metaCharset);

  //       const viewportMeta = doc.createElement('meta');
  //       viewportMeta.setAttribute('name', 'viewport');
  //       viewportMeta.setAttribute('content', `width=${Math.round(viewportWidth)}, initial-scale=1`);
  //       doc.head.prepend(viewportMeta);

  //       const base = doc.createElement('base');
  //       base.setAttribute('href', `${window.location.origin}/`);
  //       doc.head.prepend(base);

  //       const cloneHeadNode = node => {
  //         const tagName = node.tagName?.toLowerCase();
  //         if (!tagName || tagName === 'script' || tagName === 'noscript') {
  //           return null;
  //         }

  //         const cloned = node.cloneNode(true);

  //         if (tagName === 'link') {
  //           const rel = cloned.getAttribute('rel');
  //           const href = cloned.getAttribute('href');
  //           if (rel && rel.toLowerCase() === 'stylesheet' && href) {
  //             try {
  //               cloned.setAttribute('href', new URL(href, window.location.href).href);
  //             } catch (error) {
  //               console.warn('Unable to normalise stylesheet URL', href, error);
  //             }
  //           }
  //         }

  //         if (tagName === 'style') {
  //           const cssText = cloned.textContent || '';
  //           cloned.textContent = convertCssUrlsToAbsolute(cssText, window.location.href);
  //         }

  //         return cloned;
  //       };

  //       Array.from(document.head.children).forEach(node => {
  //         const cloned = cloneHeadNode(node);
  //         if (cloned) {
  //           doc.head.appendChild(cloned);
  //         }
  //       });

  //       // Ensure root-level custom properties defined via inline styles are preserved
  //       const inlineStyle = document.documentElement.getAttribute('style');
  //       if (inlineStyle) {
  //         doc.documentElement.setAttribute('style', convertCssUrlsToAbsolute(inlineStyle, window.location.href));
  //       }

  //       const style = doc.createElement('style');
  //       style.textContent = `

  //           @page {
  //             size: 210mm 300mm;
  //             margin: 5mm;
  //           }

  //           body {
  //             background: #ffffff !important;
  //             justify-content: center;
  //             align-items: center;
  //             margin: 0;
  //             padding: 0;
  //             font-family: ea-sb;
  //           }


  //         * {
  //           -webkit-print-color-adjust: exact !important;
  //           print-color-adjust: exact !important;
  //         }

  //         [data-print-content='true'][data-print-scaled='true'] {
  //           transform-origin: top left;
  //         }


  //       `;
  //       doc.head.appendChild(style);

  //       const printableWrapper = doc.createElement('div');
  //       printableWrapper.setAttribute('data-print-root', 'true');
  //       printableWrapper.style.width = '100%';
  //       printableWrapper.style.margin = '0 auto';

  //       const scaleOuter = doc.createElement('div');
  //       scaleOuter.setAttribute('data-print-scale-outer', 'true');
  //       scaleOuter.style.width = '100%';
  //       scaleOuter.style.height = '100%';
  //       // scaleOuter.style.height = scale < 1 ? `${scaledContentHeight}px` : 'auto';

  //       const contentWrapper = doc.createElement('div');
  //       contentWrapper.setAttribute('data-print-content', 'true');
  //       if (scale < 1) {
  //         contentWrapper.setAttribute('data-print-scaled', 'true');
  //         contentWrapper.style.transform = `scale(${scale})`;
  //         contentWrapper.style.width = `${contentWidth}px`;
  //         contentWrapper.style.height = `${contentHeight}px`;
  //       }
  //       contentWrapper.appendChild(clonedContent);
  //       scaleOuter.appendChild(contentWrapper);
  //       printableWrapper.appendChild(scaleOuter);

  //       printableWrapper.querySelectorAll('[style]').forEach(element => {
  //         const rawStyle = element.getAttribute('style');
  //         if (rawStyle) {
  //           element.setAttribute('style', convertCssUrlsToAbsolute(rawStyle, window.location.href));
  //         }
  //       });

  //       doc.body.innerHTML = '';
  //       doc.body.appendChild(printableWrapper);

  //       const serializer = new XMLSerializer();
  //       return {
  //         html: `<!DOCTYPE html>${serializer.serializeToString(doc)}`,
  //         viewport: {
  //           width: Math.round(viewportWidth),
  //           // height: '500mm',
  //           height: Math.round(viewportHeight),
  //           deviceScaleFactor: window.devicePixelRatio || 1
  //         },
  //         pageSize: {
  //           width: `${A4_WIDTH_MM}mm`,
  //           height: `210mm`,
  //           // height: `${A4_HEIGHT_MM}mm`,
  //           margin: {
  //             top: '0mm',
  //             right: '0mm',
  //             bottom: '0mm',
  //             left: '0mm'
  //           }
  //         }
  //       };
  //     };

  //     const { html: fullHtml, viewport, pageSize } = await buildPrintableDocument();
  //     // console.log("fullHtml", fullHtml)
  //     const response = await fetch('/api/generate-pdf', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ html: fullHtml, viewport, pageSize })
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server responded with ${response.status}`);
  //     }

  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  // const fullDateTime = BirthDetails.FullDateTime || new Date().toISOString();
  // const formattedDate = fullDateTime.split(' ')[0].replace(/-/g, '');
  //     const filename = `AstroReport_${formattedDate}.pdf`;

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = filename;
  //     link.click();
  //     URL.revokeObjectURL(url);

  //     toast.success('PDF downloaded successfully!');
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //     toast.error('Failed to download PDF');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // working but some right side are cutting
  // const handleMenuDownload = async () => {
  //   handleClose();
  //   setLoading(true);

  //   const convertCssUrlsToAbsolute = (cssText, baseHref) => {
  //     if (!cssText) return '';

  //     let baseUrl;
  //     try {
  //       baseUrl = new URL(baseHref || window.location.href);
  //     } catch (error) {
  //       baseUrl = new URL(window.location.href);
  //     }

  //     return cssText.replace(/url\(\s*(['"]?)([^'"\)\(]+)\1\s*\)/g, (match, quote, rawUrl) => {
  //       const cleaned = rawUrl.trim();

  //       if (!cleaned || cleaned.startsWith('data:') || cleaned.startsWith('#') || cleaned.startsWith('var(') || /^https?:\/\//i.test(cleaned) || cleaned.startsWith('//')) {
  //         return match;
  //       }

  //       try {
  //         const absoluteUrl = new URL(cleaned, baseUrl).href;
  //         const safeQuote = quote || '"';
  //         return `url(${safeQuote}${absoluteUrl}${safeQuote})`;
  //       } catch (error) {
  //         return match;
  //       }
  //     });
  //   };

  //   // New function to inline computed styles
  //   const inlineComputedStyles = (original, cloned) => {
  //     const originalElements = original.querySelectorAll('*');
  //     const clonedElements = cloned.querySelectorAll('*');

  //     // Process each element pair
  //     Array.from(originalElements).forEach((origEl, index) => {
  //       const clonedEl = clonedElements[index];
  //       if (!clonedEl) return;

  //       try {
  //         const computedStyle = window.getComputedStyle(origEl);

  //         // Important style properties to preserve
  //         const criticalProps = [
  //           'display', 'position', 'top', 'left', 'right', 'bottom',
  //           'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
  //           'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  //           'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  //           'border', 'border-width', 'border-style', 'border-color', 'border-radius',
  //           'background', 'background-color', 'background-image', 'background-size', 'background-position',
  //           'color', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height',
  //           'text-align', 'text-decoration', 'text-transform',
  //           'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'gap',
  //           'grid', 'grid-template-columns', 'grid-template-rows', 'grid-gap',
  //           'opacity', 'visibility', 'overflow', 'z-index', 'box-shadow', 'transform'
  //         ];

  //         let styleString = clonedEl.getAttribute('style') || '';

  //         criticalProps.forEach(prop => {
  //           const value = computedStyle.getPropertyValue(prop);
  //           if (value && value !== 'none' && value !== 'auto' && value !== 'initial') {
  //             // Convert to absolute URLs if it's a background-image or similar
  //             const finalValue = (prop.includes('background') || prop.includes('border-image'))
  //               ? convertCssUrlsToAbsolute(value, window.location.href)
  //               : value;

  //             styleString += `${prop}: ${finalValue} !important; `;
  //           }
  //         });

  //         if (styleString) {
  //           clonedEl.setAttribute('style', styleString);
  //         }
  //       } catch (error) {
  //         console.warn('Error inlining styles for element:', error);
  //       }
  //     });
  //   };

  //   try {
  //     const buildPrintableDocument = async () => {
  //       if (!pageRef.current) {
  //         throw new Error('Printable content is not available');
  //       }

  //       const clonedContent = pageRef.current.cloneNode(true);

  //       // Inline computed styles from original to cloned content
  //       inlineComputedStyles(pageRef.current, clonedContent);

  //       const MM_PER_INCH = 25.4;
  //       const CSS_DPI = 96;
  //       const mmToPx = mm => Math.round((mm / MM_PER_INCH) * CSS_DPI);

  //       // A4 Portrait dimensions
  //       const A4_WIDTH_MM = 210;
  //       const A4_HEIGHT_MM = 297;
  //       const paddingMm = 10;

  //       const a4WidthPx = mmToPx(A4_WIDTH_MM);
  //       const a4HeightPx = mmToPx(A4_HEIGHT_MM);

  //       // Set viewport to A4 size, not window size
  //       const viewportWidth = a4WidthPx;  // ~794px
  //       const viewportHeight = a4HeightPx; // ~1123px

  //       const bodyBg = window.getComputedStyle(document.body).backgroundColor || '#fff';

  //       const doc = document.implementation.createHTMLDocument('Report PDF');
  //       doc.title = document.title || 'Report PDF';

  //       const copyAttributes = (source, target) => {
  //         Array.from(source.attributes || []).forEach(attr => {
  //           target.setAttribute(attr.name, attr.value);
  //         });
  //       };

  //       copyAttributes(document.documentElement, doc.documentElement);
  //       copyAttributes(document.body, doc.body);

  //       const metaCharset = doc.createElement('meta');
  //       metaCharset.setAttribute('charset', 'utf-8');
  //       doc.head.prepend(metaCharset);

  //       const viewportMeta = doc.createElement('meta');
  //       viewportMeta.setAttribute('name', 'viewport');
  //       viewportMeta.setAttribute('content', `width=${Math.round(viewportWidth)}, initial-scale=1`);
  //       doc.head.prepend(viewportMeta);

  //       const base = doc.createElement('base');
  //       base.setAttribute('href', `${window.location.origin}/`);
  //       doc.head.prepend(base);

  //       const cloneHeadNode = node => {
  //         const tagName = node.tagName?.toLowerCase();
  //         if (!tagName || tagName === 'script' || tagName === 'noscript') {
  //           return null;
  //         }

  //         const cloned = node.cloneNode(true);

  //         if (tagName === 'link') {
  //           const rel = cloned.getAttribute('rel');
  //           const href = cloned.getAttribute('href');
  //           if (rel && rel.toLowerCase() === 'stylesheet' && href) {
  //             try {
  //               cloned.setAttribute('href', new URL(href, window.location.href).href);
  //             } catch (error) {
  //               console.warn('Unable to normalise stylesheet URL', href, error);
  //             }
  //           }
  //         }

  //         if (tagName === 'style') {
  //           const cssText = cloned.textContent || '';
  //           cloned.textContent = convertCssUrlsToAbsolute(cssText, window.location.href);
  //         }

  //         return cloned;
  //       };

  //       Array.from(document.head.children).forEach(node => {
  //         const cloned = cloneHeadNode(node);
  //         if (cloned) {
  //           doc.head.appendChild(cloned);
  //         }
  //       });

  //       // Copy all stylesheets as inline styles to ensure they're captured
  //       Array.from(document.styleSheets).forEach((sheet, index) => {
  //         try {
  //           if (sheet.cssRules) {
  //             const cssText = Array.from(sheet.cssRules)
  //               .map(rule => rule.cssText)
  //               .join('\n');

  //             if (cssText) {
  //               const style = doc.createElement('style');
  //               style.setAttribute('data-source', `stylesheet-${index}`);
  //               style.textContent = convertCssUrlsToAbsolute(cssText, window.location.href);
  //               doc.head.appendChild(style);
  //             }
  //           }
  //         } catch (error) {
  //           // CORS or other access issues - stylesheet already linked
  //           console.warn('Could not access stylesheet rules:', error);
  //         }
  //       });

  //       const inlineStyle = document.documentElement.getAttribute('style');
  //       if (inlineStyle) {
  //         doc.documentElement.setAttribute('style', convertCssUrlsToAbsolute(inlineStyle, window.location.href));
  //       }

  //       const style = doc.createElement('style');
  //       style.textContent = `
  //       @page {
  //         size: ${A4_WIDTH_MM}mm ${A4_HEIGHT_MM}mm;
  //         margin: ${paddingMm}mm;
  //       }

  //       html, body {
  //         width: 100%;
  //         height: 100%;
  //         background: #ffffff !important;
  //         margin: 0;
  //         padding: 0;
  //       }

  //       body {
  //         font-family: ea-sb, Arial, sans-serif;
  //       }

  //       * {
  //         -webkit-print-color-adjust: exact !important;
  //         print-color-adjust: exact !important;
  //         color-adjust: exact !important;
  //       }

  //       [data-print-root='true'] {
  //         width: 100%;
  //         max-width: 100%;
  //         margin: 0;
  //         padding: 0;
  //         box-sizing: border-box;
  //       }
  //     `;
  //       doc.head.appendChild(style);

  //       const printableWrapper = doc.createElement('div');
  //       printableWrapper.setAttribute('data-print-root', 'true');
  //       printableWrapper.appendChild(clonedContent);

  //       printableWrapper.querySelectorAll('[style]').forEach(element => {
  //         const rawStyle = element.getAttribute('style');
  //         if (rawStyle) {
  //           element.setAttribute('style', convertCssUrlsToAbsolute(rawStyle, window.location.href));
  //         }
  //       });

  //       doc.body.innerHTML = '';
  //       doc.body.appendChild(printableWrapper);

  //       const serializer = new XMLSerializer();
  //       return {
  //         html: `<!DOCTYPE html>${serializer.serializeToString(doc)}`,
  //         viewport: {
  //           width: Math.round(viewportWidth),
  //           height: Math.round(viewportHeight),
  //           deviceScaleFactor: 1
  //         },
  //         pageSize: {
  //           width: `${A4_WIDTH_MM}mm`,
  //           height: `${A4_HEIGHT_MM}mm`,
  //           margin: {
  //             top: `${paddingMm}mm`,
  //             right: `${paddingMm}mm`,
  //             bottom: `${paddingMm}mm`,
  //             left: `${paddingMm}mm`
  //           }
  //         }
  //       };
  //     };

  //     const { html: fullHtml, viewport, pageSize } = await buildPrintableDocument();

  //     // const compressed = pako.gzip(fullHtml);
  //     // const base64 = btoa(String.fromCharCode(...compressed));
  //     function uint8ToBase64(uint8Array) {
  //       let CHUNK_SIZE = 0x8000; // 32KB
  //       let result = '';
  //       for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
  //         const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
  //         result += String.fromCharCode.apply(null, chunk);
  //       }
  //       return btoa(result);
  //     }

  //     const compressed = pako.gzip(fullHtml);
  //     const base64 = uint8ToBase64(compressed);

  //     const response = await fetch('/api/generate-pdf', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ html: base64, viewport, pageSize })
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server responded with ${response.status}`);
  //     }

  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     const fullDateTime = BirthDetails.FullDateTime || new Date().toISOString();
  //     const formattedDate = fullDateTime.split(' ')[0].replace(/-/g, '');
  //     const filename = `AstroReport_${formattedDate}.pdf`;

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = filename;
  //     link.click();
  //     URL.revokeObjectURL(url);

  //     toast.success('PDF downloaded successfully!');
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //     toast.error('Failed to download PDF');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleMenuDownload = async () => {
  //   handleClose();
  //   setLoading(true);

  //   try {
  //     if (!pageRef.current) {
  //       throw new Error('Printable content is not available');
  //     }

  //     // Get all stylesheets content
  //     const getStylesheetContent = async () => {
  //       let allStyles = '';

  //       // Get inline styles
  //       const inlineStyles = Array.from(document.querySelectorAll('style'))
  //         .map(style => style.textContent)
  //         .join('\n');

  //       allStyles += inlineStyles;

  //       // Get external stylesheets
  //       const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  //       for (const link of links) {
  //         try {
  //           if (link.href.startsWith(window.location.origin)) {
  //             const response = await fetch(link.href);
  //             const css = await response.text();
  //             allStyles += css;
  //           }
  //         } catch (error) {
  //           console.warn('Could not load stylesheet:', link.href);
  //         }
  //       }

  //       return allStyles;
  //     };

  //     const styles = await getStylesheetContent();

  //     // Clone the content
  //     const clonedContent = pageRef.current.cloneNode(true);

  //     // Build the complete HTML
  //     const fullHtml = `
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <meta charset="utf-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1">
  //           <title>Astro Report PDF</title>
  //           <style>
  //             @page { 
  //               size: A4; 
  //               margin: 10mm; 
  //             }

  //             body { 
  //               background: #fff !important; 
  //               font-family: Arial, sans-serif; 
  //               margin: 0; 
  //               padding: 0; 
  //               font-size: 12px;
  //             }

  //             * { 
  //               -webkit-print-color-adjust: exact !important; 
  //               print-color-adjust: exact !important; 
  //               color-adjust: exact !important;
  //             }

  //             /* Include all page styles */
  //             ${styles}

  //             /* Additional print-specific styles */
              
  //             .previewCard {
  //               width: 100% !important;
  //               max-width: none !important;
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           ${clonedContent.outerHTML}
  //         </body>
  //       </html>
  //     `;

  //     // Get filename
  //     const fullDateTime = BirthDetails?.FullDateTime || new Date().toISOString();
  //     const formattedDate = fullDateTime.split(' ')[0].replace(/-/g, '');
  //     const filename = `AstroReport_${formattedDate}.pdf`;

  //     // Send to PDF generation API
  //     const response = await fetch('/api/generate-pdf', {
  //       method: 'POST',
  //       headers: { 
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ 
  //         html: fullHtml, 
  //         filename: filename 
  //       })
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(`Server responded with ${response.status}: ${errorData.details || 'Unknown error'}`);
  //     }

  //     // Download the PDF
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = filename;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);

  //     toast.success('PDF downloaded successfully!');
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);

  //     // Check if it's a payload size error
  //     if (error.message.includes('413') || error.message.includes('Too Large')) {
  //       toast.error('PDF content is too large. Please try reducing the content or contact support.');
  //     } else {
  //       toast.error(`Failed to download PDF: ${error.message}`);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleMenuDownload = async () => {
  handleClose();
  setLoading(true);

  try {
    if (!pageRef.current) {
      throw new Error('Printable content is not available');
    }

    // Get all CSS with proper URL resolution
    const getStylesheetContent = async () => {
      let allStyles = '';

      // Get all stylesheets from CSSOM first (most reliable)
      const cssomStyles = [];
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            let cssText = rule.cssText;
            
            // Fix relative URLs in CSS
            if (sheet.href) {
              const baseUrl = new URL(sheet.href).href.split('/').slice(0, -1).join('/');
              cssText = cssText.replace(/url\(['"]?(?!data:)(?!http)(.*?)['"]?\)/g, (match, url) => {
                const resolvedUrl = new URL(url, baseUrl).href;
                return `url('${resolvedUrl}')`;
              });
            }
            
            cssomStyles.push(cssText);
          });
        } catch (e) {
          // CORS blocked stylesheet
          console.warn('Cannot access stylesheet:', sheet.href, e);
        }
      });

      allStyles += cssomStyles.join('\n') + '\n';

      // Get inline styles
      const inlineStyles = Array.from(document.querySelectorAll('style'))
        .map(style => style.textContent)
        .join('\n');

      allStyles += inlineStyles + '\n';

      // Get external stylesheets from same origin
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      
      for (const link of links) {
        try {
          if (link.href && link.href.startsWith(window.location.origin)) {
            const response = await fetch(link.href);
            if (response.ok) {
              let css = await response.text();
              
              // Resolve relative URLs
              const baseUrl = link.href.split('/').slice(0, -1).join('/');
              css = css.replace(/url\(['"]?(?!data:)(?!http)(.*?)['"]?\)/g, (match, url) => {
                const resolvedUrl = new URL(url, baseUrl).href;
                return `url('${resolvedUrl}')`;
              });
              
              allStyles += css + '\n';
            }
          }
        } catch (error) {
          console.warn('Could not load stylesheet:', link.href);
        }
      }

      return allStyles;
    };

    // Get computed styles for each element and apply inline
    const applyInlineStyles = (originalElement, clonedElement) => {
      const computed = window.getComputedStyle(originalElement);
      
      // Get all style properties
      const styleString = Array.from(computed).map(prop => {
        const value = computed.getPropertyValue(prop);
        // Skip default/initial values and specific props that break PDF rendering
        if (value && value !== 'none' && value !== 'auto' && value !== 'normal') {
          return `${prop}:${value}`;
        }
        return '';
      }).filter(Boolean).join(';');
      
      if (styleString) {
        clonedElement.setAttribute('style', styleString);
      }

      // Recursively apply to children
      const originalChildren = Array.from(originalElement.children);
      const clonedChildren = Array.from(clonedElement.children);
      
      originalChildren.forEach((child, index) => {
        if (clonedChildren[index]) {
          applyInlineStyles(child, clonedChildren[index]);
        }
      });
    };

    console.log('Fetching styles...');
    const styles = await getStylesheetContent();

    console.log('Cloning content...');
    const clonedContent = pageRef.current.cloneNode(true);
    
    console.log('Applying inline styles...');
    applyInlineStyles(pageRef.current, clonedContent);

    // Get CSS variables from root
    const rootStyles = window.getComputedStyle(document.documentElement);
    const cssVariables = Array.from(rootStyles).filter(prop => prop.startsWith('--'))
      .map(prop => `${prop}: ${rootStyles.getPropertyValue(prop)};`)
      .join('\n    ');

    // Build the complete HTML
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Astro Report PDF</title>
          <style>
            :root {
              ${cssVariables}
            }

            @page { 
              size: A4; 
              margin: 10mm; 
            }

            body { 
              background: #fff !important; 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 0; 
              font-size: 12px;
            }

            * { 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              box-sizing: border-box;
            }

            /* Include all page styles */
            ${styles}

            /* Additional print-specific styles */
            .previewCard {
              width: 100% !important;
              max-width: none !important;
            }

            /* Fix common PDF rendering issues */
            img {
              max-width: 100%;
              height: auto;
            }

            table {
              border-collapse: collapse;
            }
          </style>
        </head>
        <body>
          ${clonedContent.outerHTML}
        </body>
      </html>
    `;

    // Get filename
    const fullDateTime = BirthDetails?.FullDateTime || new Date().toISOString();
    const formattedDate = fullDateTime.split(' ')[0].replace(/-/g, '');
    const filename = `AstroReport_${formattedDate}.pdf`;

    console.log('Sending to PDF API...');

    // Send to PDF generation API
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        html: fullHtml, 
        filename: filename 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server responded with ${response.status}: ${errorData.details || 'Unknown error'}`);
    }

    // Download the PDF
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PDF:', error);

    // Check if it's a payload size error
    if (error.message.includes('413') || error.message.includes('Too Large')) {
      toast.error('PDF content is too large. Please try reducing the content or contact support.');
    } else {
      toast.error(`Failed to download PDF: ${error.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  const handleMenuTimeTool = () => {
    handleClose();
    handleTimeTool();
  }

  const handleLifeEventClose = () => {
    setOpenLifeEvent(false);
  }

  const handleLifeEventOpen = () => {
    handleClose();
    setOpenLifeEvent(true);
  }

  const handleEventOpen = () => {
    handleClose();
    window.open(`../kevent/${BirthDetails.KundaliID}`, '_blank');

    // setOpenEvent(true);
  }

  const handleKundliOpt = () => {
    setOpenKundli(true);
  }

  const handleOpenKundliClose = () => {
    setOpenKundli(false);
  }

  const handleJCK = () => {
    handleClose();
    setJCK(!openJCK);
  }

  const handleNTC = () => {
    handleClose();
    setNTC(!openNTC);
  }

  const getKundliOpions = async () => {
    const response = await KundliOptionsData();
    if (response.hasError) {
      setLoading(false);
      // return toastDisplayer("error", response.error);
    } else {
      const data = response?.responseData?.Result?.Options;
      setAllKundliOpt(data);
      setKundliOptValue(data?.filter(e => e.Option == "V")[0])
      setLoading(false);
    }
  }

  useEffect(() => {
    getKundliOpions();
  }, []);

  useEffect(() => {
    if (kundliOptValue.Option == "T") {
      getTransitData("", "");
    }
    else
      getDivisionalChartData(kundliOptValue.Option)
  }, [kundliOptValue])

  const handleDashaChange = async () => {
    const titleArr = DashaTitle.split("-");
    if (DashaValue == "PranDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}-${titleArr[2]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]}-${titleArr[1]}`);
        setDashaValue("SookshmaDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "SookshmaDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > PratyantarDasha`);
        setDashaValue("Vimshottari Dasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Vimshottari Dasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": DashaDetailData?.CurrentMD
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]}`);
        setDashaValue("AntarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "AntarDasha") {
      setDashaTitle(`MahaDashas`);
      setDashaValue("MahaDasha");
      setDashaGridData(DashaDetailData?.MahaDasha)
    }
  }

  const handleDashaDoubleClick = async (row) => {
    if (DashaValue == "MahaDasha") {
      setDashaDate(row?.StartDt)
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": row?.StartDt,
        "Planet": row?.DashaPlanet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        setDashaTitle(`${row?.Planet} > AntarDasha`);
        setDashaValue("AntarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "AntarDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": row?.DashaPlanet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        // setDashaTitle(`${titleArr[0]} > ${row?.Planet} > PratyantarDasha`);
        setDashaTitle(`${row?.Planet}`);
        setDashaValue("Vimshottari Dasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Vimshottari Dasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": row?.DashaPlanet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${row?.Planet}`);
        setDashaValue("SookshmaDasha");
        setDashaGridData(response?.responseData)
      }
    } else if (DashaValue == "SookshmaDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": row?.Planet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${row?.Planet}`);
        setDashaValue("PranDasha");
        setDashaGridData(response?.responseData)
      }
    }
  }

  const handleSaveKundaliBtn = () => {
    handleSaveKundaliOpen();
  }

  const saveKundaliDateTime = async () => {
    try {
      let formattedData = {
        KundaliID: BirthDetails.KundaliID,
        FirstName: BirthDetails.FirstName,
        LastName: BirthDetails.LastName,
        MiddleName: BirthDetails.MiddleName,
        Gender: BirthDetails.Gender,
        Country: BirthDetails.Country,
        CityID: BirthDetails.CityID,
        Prakriti: BirthDetails.prakriti || '',
        City: BirthDetails.City,
        BirthDate: BirthDetails.BirthDate,
        BirthTime: BirthDetails.BirthTime,
        TransitTime: "",
        TransitDate: "",
        ClientID: "",
        DChart: "",
      }
      if (TransitData?.TransitDateTime) {
        formattedData.TransitDate = TransitData?.TransitDateTime.split(" ")[0];
        formattedData.TransitTime = TransitData?.TransitDateTime.split(" ")[1].replace(/:/g, "");
      }
      const response = await UpdateKundli(formattedData);
      if (response.hasError) {
        if (response.errorMessage) {
          Object.keys(response.errorMessage).forEach((key) => {
            response.errorMessage[key].forEach((message) => {
              toast.error(`${key}: ${message}`);
            });
          });
        }
        return toast.error(response.errorMessage);
        // return toastDisplayer("error", response.error)
      }
      SetKundliConstData(kundliData);
      setKundliData(kundliData);
      toast.success('Kundali updated successfully.');
      handleClose();
    } catch (error) {
      // setIsDisable(false)
    }
  }

  const handleRoatationOpen = (value) => {
    setRotation(true);
    setRotationType(value);
  }

  const handleRoatationClose = () => {
    setRotation(false);
  }

  const hanldeRotationChange = async (payload) => {
    setLoading(true);
    handleRoatationClose();
    const formattedData = {
      KundaliID: BirthDetails.KundaliID,
      FirstName: BirthDetails.FirstName,
      LastName: BirthDetails.LastName,
      MiddleName: BirthDetails.MiddleName,
      Gender: BirthDetails.Gender,
      Country: BirthDetails.Country,
      CityID: BirthDetails.CityID,
      Prakriti: BirthDetails.prakriti || '',
      City: BirthDetails.City,
      TransitTime: "",
      TransitDate: "",
      ClientID: "",
      DChart: "",
      BirthDate: BirthDetails.BirthDate,
      BirthTime: BirthDetails.BirthTime,
      IsRotate: payload.IsRotate,
      RotateType: payload.RotateType,
      RotateFrom: payload.RotateFrom
    }
    try {
      const resp = await RotateChartEvent(formattedData);
      setLoading(false);
      if (resp?.responseData?.Result) {
        setKundliData(resp?.responseData?.Result);
        if (rotationType == "B") {
          setRotationTitle(`The chart is rotated to Birth Chart > ${payload.formattedStr}`)
        } else if (rotationType == "H") {
          setRotationTitle(`The chart is rotated to House Chart > ${payload.formattedStr}`)
        }
      }
    } catch (error) {
      setLoading(false);

    }
  }

  const handleSaveKundaliOpen = () => {
    setSaveKundali(true);
    handleClose();
  }
  const handleSaveKundaliClose = () => {
    setSaveKundali(false);
  }

  return (
    <>
      {/* {Loading && <Loader />} */}
      <Grid className='previewCard' item xs={12} md={12} ref={pageRef}>
        <Grid item xs={12} className='pdf-Div'>
          <div className={`chart-name sticky top-0 z-50 font-ea-sb rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row ${!isPrintDiv ? 'sm:flex-row flex-col' : "items-center"}`}>
            {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundali'}
            <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row ${!isPrintDiv ? 'sm:flex-row sm:gap-1 flex-col' : "gap-5"} birthDateTime-Div`} >
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label font-ea-n'>Birth Date & Time: </span>
                <span className='value font-ea-sb' style={{ whiteSpace: 'nowrap' }}>{BirthDetails?.BirthDate} {BirthDetails?.BirthTime.substring(0, 2)}:{BirthDetails?.BirthTime.substring(2, 4)}:{(BirthDetails?.BirthTime.substring(4, 6) ? BirthDetails?.BirthTime.substring(4, 6) : '00')}
                </span>
              </div>
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label font-ea-n'>Place: </span>
                <span className='value font-ea-sb'>{BirthDetails?.City}, {BirthDetails?.Country}</span>
              </div>
              <div className='flex justify-end'>
                <>
                  <IconButton onClick={handleClick}>
                    <i className={'tabler-dots-vertical bg-white'} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleEventOpen} className="flex gap-1"><i className={'tabler-browser-check me-2'} />Event Analysis</MenuItem>
                    <MenuItem onClick={handleJCK} className="flex gap-1"><i className={'tabler-aspect-ratio me-2'} />Jaimini Char Karakas</MenuItem>
                    <MenuItem onClick={handleNTC} className="flex gap-1"><i className={'tabler-jewish-star me-2'} />NavTara Chakra</MenuItem>
                    <MenuItem onClick={handleIsPraOpen} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Prakriti</MenuItem>
                    {/* <MenuItem className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Save</MenuItem> */}
                    <MenuItem onClick={handleMenuTimeTool} className="flex gap-1"><i className={'tabler-calendar-share me-2'} />TimeTool</MenuItem>
                    <MenuItem className="flex gap-1"><i className={'tabler-calendar-share me-2'} />Transit Analysis</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSaveKundaliBtn} className="flex gap-1"><i className={'tabler-copy-plus me-2'} />Save Kundali</MenuItem>
                    <MenuItem onClick={handleMenuDownload} className="flex gap-1"><i className={'tabler-download me-2'} />Download</MenuItem>
                  </Menu>
                </>
              </div>
            </div>
          </div>
          <div className={`${!isPrintDiv ? 'xs:flex-col sm:flex-row' : ""} birth-info-table`}>
            <div className='flex flex-row block-detail'>

              <InfoTable InfoTableTextArr={[
                { "label": "Rashi / Alphabet ", "value": `${AstroDetails?.Rashi} / A` },
                { "label": "Nakshatra / Pada ", "value": `${AstroDetails?.Nakshatra?.Nakshatra} / ${AstroDetails?.Nakshatra.Pada} (${AstroDetails?.Nakshatra?.PlanetName})` },
                { "label": "Gana / TriGuna ", "value": `${AstroDetails?.Nakshatra?.Gana == 'R' ? 'Rakshasa' : 'Manushya'} / ${AstroDetails?.Nakshatra?.TriGuna}` },
                { "label": "Yoga / Karana ", "value": `${AstroDetails?.JanmaYoga} / ${AstroDetails?.JanmaKarana}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Vikram Samvant ", "value": AstroDetails?.VikramSamvat },
                { "label": "Birth Tithi / Sun Rise ", "value": `${AstroDetails?.JanmaTithi} / ${AstroDetails?.SunRiseTime}` },
                { "label": "Astro / Western Day ", "value": `${AstroDetails?.AstroWeekday} / ${AstroDetails?.WesternWeekday}` },
                // { "label": "Location ", "value": `${BirthDetails?.City}, ${BirthDetails?.Country}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Lucky / Destiny # ", "value": `${AstroDetails?.Numerology?.BirthNumber} / ${AstroDetails?.Numerology?.DestinyNumber} (${AstroDetails?.Numerology?.DestinyYearNumber})` },
                { "label": "Destiny Year ", "value": ` ${AstroDetails?.Numerology?.DestinyYear - 1} - ${AstroDetails?.Numerology?.DestinyYear}` },
                { "label": "Lat, Lng ", "value": `${BirthDetails?.Latitude}, ${BirthDetails?.Longitude}` },
                { "label": "Timezone ", "value": ` ${BirthDetails?.Timezone}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Reference", "value": `${BirthDetails?.Reference || ""}` },
                { "label": "Remark", "value": `${BirthDetails?.Remark || ""}` },
                { "label": "Group ", "value": ` ${BirthDetails?.Group || ""}` },
                { "label": "Prakriti", "value": `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
          </div>

          <div className={`flex px-1 pt-4 gap-5 overflow-auto md:flex-wrap lg:flex-nowrap`}>
            {openKundli && (
              <KundliOption
                KundliData={allKundliOpt}
                setKundliValue={setKundliOptValue}
                open={openKundli}
                handleClose={handleOpenKundliClose}
              />
            )}
            <table>
              <tr>
                <td>
                  <div className='chart-title '>
                    <Button onClick={() => handleRoatationOpen("B")}>
                      <span className='font-ea-sb text-xl'>
                        ❋ Birth Chart / Lagna Kundali ❋
                      </span>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className='chart-title'>
                    <Button onClick={() => handleRoatationOpen("H")}>
                      <span className='font-ea-sb text-xl'>
                        ❋ House Chart / Bhav Chalit Kundali ❋
                      </span>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className='chart-title flex'>
                    <div className='flex px-2 w-full'>
                      <div className='flex items-center w-1/12'>
                        {DashaValue != "MahaDasha" && kundliOptValue && kundliOptValue.Option == "V" && (
                          <IconButton onClick={handleDashaChange} className='h-[38px] text-primary'>
                            🠜
                            {/* <i className='tabler-arrow-big-left text-primary'></i> */}
                          </IconButton>
                        )}
                      </div>
                      <div className='flex items-center w-10/12 justify-center'>
                        <Button className='cursor-pointer flex items-center' onClick={handleKundliOpt}>
                          <span className='font-ea-sb text-xl'>
                            ❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaValue : kundliOptValue.OptionName} ❋
                          </span>
                        </Button>
                      </div>
                      <div className='flex items-center w-1/12'>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className=''>
                <td className='w-1/3'>
                  <div className='flex justify-center items-center px-2' ref={divRef}>
                    <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} className='flex-auto' alt="birthChart" />
                  </div>
                </td>
                <td className='w-1/3 myDiv'>
                  <div className='flex justify-center items-center px-2'>
                    <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} className='flex-auto' alt="birthChart" />
                  </div>
                </td>
                <td className='w-1/3'>
                  {kundliOptValue && kundliOptValue.Option == "V" ? (
                    <div className='flex justify-center items-center px-2 flex-auto w-[calc(100vw - 80vw)] '>
                      <div className='lg:w-[calc(100vw-71vw)] md:w-[40vw] sm:w-[40vw] w-[75vw] '>
                        <DashaDetails title={DashaTitle} DashaData={DashaGridData} handleDashadbClick={handleDashaDoubleClick} divref={divRef} />
                      </div>
                    </div>
                  ) : (
                    TransitData &&
                    <>
                      {kundliOptValue.Option == "T" ? <>
                        <div className='flex justify-center items-center px-2'>
                          {TransitData?.TransitChart ?
                            <img src={`data:image/svg+xml;base64,${TransitData?.TransitChart}`} alt="transitChart" className='flex-auto' />
                            :
                            // <Skeleton variant="rectangular" width={210} height={60} />
                            <EALoader />

                          }
                        </div>
                      </> :
                        <>
                          <div className='flex justify-center items-center px-2'>
                            {DivisionalData?.DChart ?
                              <img src={`data:image/svg+xml;base64,${DivisionalData?.DChart}`} alt="transitChart" className='flex-auto' />
                              :
                              // <Skeleton variant="rectangular" width={210} height={60} />
                              <EALoader />
                            }
                          </div>
                        </>}
                    </>
                  )}

                </td>
              </tr>
              <tr>
                <td className='mx-2 px-2'>
                  <div className='pt-2'>
                    {rotationTital && <Chip label={rotationTital} className='text-sm' color='primary' variant='tonal' />}
                  </div>
                </td>
              </tr>
            </table>
          </div>


          <div className='main-MahaDasha-Div pt-5'>
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-4'>
                <span>
                  ❋ Nakshatra Astrology ↠ Planet Script ❋
                </span>
              </div>
              <div className='mb-1 w-[30%] flex justify-end pt-4 whitespace-nowrap'>
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
              {openLifeEvent &&
                <LifeEvent setLifeEventValue={setLifeEventValue} open={openLifeEvent} handleClose={handleLifeEventClose} />
              }
            </div>
            <div className='planet-table'>

              <NakshtraSummary SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} SelectedEventVal={LifeEventValue} />

            </div>
            <div className="Nakshatra-Legend mt-2 px-2 whitespace-nowrap overflow-x-auto">
              <div className="arrow-info flex flex-row gap-3 items-center">
                <span>Legend:</span>
                <span>🡑 Exalted</span>
                <span>🡓 Debilitated</span>
                <span>☀ Combust</span>
                <span>⮂ Exchange Sign</span>
                <span>⮁ Exchange Nakshatra</span>
                <span>★ Untenanted</span>
                <span>✪ SelfStar</span>
                <span>⮌ Retro</span>
              </div>
            </div>

          </div>
          <div className='main-MahaDasha-Div pt-4'>
            {/* <div className='chart-title'>❋ Nakshatra Astrology ↠ House Script ❋</div> */}
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-5'>
                <span>
                  ❋ Nakshatra Astrology ↠ House Script ❋
                </span>
              </div>
              <div className='mb-1 w-[30%] flex justify-end pt-4 whitespace-nowrap'>
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} SelectedEventVal={LifeEventValue} />
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-4'>
            {/* <div className='chart-title'>❋ Planet Script with Nakshatra Lord & Sub Lord ❋</div> */}
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[25%]'></div>
              <div className='chart-title w-[50%] pt-5'>
                <span>
                  ❋ Planet Script with Nakshatra Lord & Sub Lord ❋
                </span>
              </div>
              <div className='mb-1 w-[25%] flex justify-end pt-4 whitespace-nowrap'>
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            <div
              className="Loard-Div sm:grid md:grid-rows-3 md:grid-cols-3 sm:grid-rows-5 sm:grid-cols-2 xs:flex xs:flex-col grid-flow-col gap-4 auto-rows-auto"
            >
              {PlaneNSummaryData.length
                ? PlaneNSummaryData.slice(0, 9).map((element, index) => ( // only display first 9 elements
                  <div key={index} className=''>
                    <LoardPlanet LoardData={element} SelectedEventVal={LifeEventValue} symbols={Symbols} />
                  </div>
                ))
                : null
              }
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-8'>
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-5'>
                <span>
                  ❋ Rahu & Ketu Special Significators ❋
                </span>
              </div>
              <div className='mb-1 w-[30%] flex justify-end pt-4 whitespace-nowrap'>
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            {/* <div className='chart-title'>❋ Rahu & Ketu Special Significators ❋</div> */}
            <div className='RahuKetu-Div flex gap-4 flex-col sm:flex-row'>
              <RahuKetu RahuData={RahuData} KetuData={KetuData} Significators={"R"} SelectedEventVal={LifeEventValue} />
            </div>
          </div>

          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Planet ↠ Planet Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={PlanetSummaryData} Aspect={"P"} />
            </div>
          </div>
          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Planet ↠ House Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={HouseSummaryData} Aspect={"H"} />
            </div>
          </div>

          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Astro Vastu Insights ❋</div>
            <div className='AstroVastuScript-Div'>
              <House houseArr={AstroVastuHouseScript} Symbols={Symbols}></House>
            </div>
          </div>
        </Grid>
      </Grid>
      {isPrakritiVisible && <PrakritiPopUp open={isPrakritiVisible} handlePraClose={handleIsPraClose} />}
      {openJCK && <JaiminiCharKarakasPopUp open={openJCK} handleClose={handleJCK} JaiminiCharKarakasData={JaiminiCharKarakas} />}
      {openNTC && <NavTaraChakra open={openNTC} handleClose={handleNTC} NavTaraChakraData={NavTaraChakraData} />}
      {openRotation && <Rotation open={openRotation} handleClose={handleRoatationClose} rotationType={rotationType} hanldeRotationChange={hanldeRotationChange} />}
      {SaveKundali && (
        <ConfirmationPopup open={SaveKundali} isDelete={true} handleClose={handleSaveKundaliClose} userData={kundliData?.AstroVastuReport?.BirthDetails} handleClick={saveKundaliDateTime} subTitle={"Are you sure want to update this kundali?"} title={"Update Kundali"} />
      )}
    </>
  )
}

export default PreviewCard
