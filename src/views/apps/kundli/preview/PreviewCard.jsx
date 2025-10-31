// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import House from '@/components/preview/House/House'
import SummaryAspect from '@/components/preview/PlanetSummary/PlanetSummary'
import InfoTable from '@/components/preview/InfoTable/InfoTable'

// Style Imports
import "./preview.css"
import NakshtraSummary from '@/components/preview/NakshtraSummary/NakshtraSummary';
import RahuKetu from '@/components/preview/RahuKetu/RahuKetu';
import DashaDetails from '@/components/preview/DashaDetails/DashaDetails';
import LoardPlanet from '@/components/preview/LoardPlanet/LoardPlanet'
import { Button, Chip, Collapse, Divider, IconButton, Menu, MenuItem, Select, FormControl } from '@mui/material'
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
import NSubLordPopUp from '@/components/preview/Nakshatra-SubLord/NSubLord'
import PDFView from './pdfView'
import DownloadPopUp from '@/components/devta-vastu/DownloadPDFPopup/DownloadPopUp';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import CustomChip from './CustomChip'

// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat)


// At the top of your file
// import fontNormalUrl from './../../../../assets/fonts/s-n.woff2';
// import fontSemiBoldUrl from './../../../../assets/fonts/s-sb.woff2';


const PreviewCard = ({ kundliData, isPrintDiv, handleDownload, handleTimeTool, TransitData, setTransitData, setVarshPhalData, VarshPhalData, getTransitData, getDivisionalChartData, DivisionalData, setDivisionalData, birthDate, setKundliData, SetKundliConstData, getVarshphalData, Loading, setLoading }) => {

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
  const [isNSLordVisible, setIsNSLoardVisible] = useState(false);
  const [openLifeEvent, setOpenLifeEvent] = useState(false);
  const [openKundli, setOpenKundli] = useState(false);
  const [openJCK, setJCK] = useState(false);
  const [openNTC, setNTC] = useState(false);
  const [openRotation, setRotation] = useState(false);
  const [rotationType, setRotationType] = useState(null);
  const [allKundliOpt, setAllKundliOpt] = useState(false);
  // const [Loading, setLoading] = useState(false);
  const [DashaValue, setDashaValue] = useState("Pratyantar");
  const [DashaTitle, setDashaTitle] = useState(`${DashaDetailData?.CurrentMD}`);
  const [DashaGridData, setDashaGridData] = useState(kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha);
  const [DashaDate, setDashaDate] = useState(DashaDetailData?.MahaDasha.filter((e) => e.IsCurrent == true)[0]?.StartDt);
  const [rotationTital, setRotationTitle] = useState("");
  const [SaveKundali, setSaveKundali] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true)
  const [downloadPopup, setDownloadPopup] = useState(false);
  // const [currentVarshphalYear, setCurrentVarshphalYear] = useState(new Date().getFullYear());

  const [currentDasha, setCurrentDasha] = useState(DashaGridData?.filter(dasha => dasha.IsCurrent)[0] || null);

  useEffect(() => {
    if (kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha?.length > 0) {
      setDashaTitle(`${DashaDetailData?.CurrentMD}`);
      setDashaValue("Pratyantar");
      setCurrentDasha(kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha?.filter(dasha => dasha.IsCurrent)[0] || null);
      setDashaGridData(kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha);
    } else {
      setDashaValue("Maha")
      setDashaGridData(kundliData?.AstroVastuReport?.DashaDetails?.MahaDasha);
    }
  }, [kundliData])


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

  const handleIsNSLordOpen = () => {
    handleClose();
    setIsNSLoardVisible(true)
  }

  const handleIsPraClose = () => {
    setIsPrakritiVisible(false)
  }

  const handleIsNLLordClose = () => {
    setIsNSLoardVisible(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleMenuDownload = () => {
  //   handleClose();
  //   handleDownload();
  // }


  // add visibility state (initialize all true)

  const items = ["Nakshatra Kundali: Planet & House Script", "Astro Vastu Insights", "Vimshottari Dasha Report", "Transit (Gochar) ", "Varshphal (Yearly Planetary Influences)", "Divisional Charts (Varga Kundali)", "NavTara Chakra & Jaimini Chara Karakas", "Planet Script: Nakshatra & Sub Lord", "Prakriti: Triguna", "Prakriti: Pancha Tattva", "Prakriti: Planetary Influence"
    // , "Notes"
  ];

  const [visibleSections, setVisibleSections] = useState(() =>
    items.reduce((acc, label) => ({ ...acc, [label]: true }), {})
  );

  // toggle single section
  const toggleSection = (label) => {
    setVisibleSections(prev => ({ ...prev, [label]: !prev[label] }));
  };


  const handleDownloadPopupOpen = () => {
    handleClose();
    setDownloadPopup(true);
  }

  const handleSelectedPageDownload = (filteredItems) => {
    setAnchorEl(null);
    const newVisibility = items.reduce((acc, label) => {
      acc[label] = filteredItems.includes(label);
      return acc;
    }, {});
    setVisibleSections(newVisibility);
    setTimeout(() => {
      handleMenuDownload();
    }, 500);
  }

  const handleMenuDownload = async () => {
    handleClose();
    setLoading(true);

    try {
      if (!pageRef.current) {
        throw new Error('Printable content is not available');
      }

      // Get all computed styles for the element and its children
      const getComputedStylesRecursive = (element) => {
        let styles = '';

        const computedStyle = window.getComputedStyle(element);
        const elementId = element.id || `elem-${Math.random().toString(36).substr(2, 9)}`;

        if (!element.id) {
          element.setAttribute('data-pdf-id', elementId);
        }

        const selector = element.id ? `#${element.id}` : `[data-pdf-id="${elementId}"]`;

        // Get all relevant CSS properties
        const importantProps = [
          'display', 'position', 'width', 'height', 'margin', 'padding',
          'border', 'background', 'background-color', 'color', 'font-family',
          'font-size', 'font-weight', 'text-align', 'line-height',
          'flex', 'flex-direction', 'justify-content', 'align-items',
          'grid', 'grid-template-columns', 'grid-gap', 'gap',
          'border-radius', 'box-shadow', 'transform', 'opacity', 'border-bottom',
          'border-top', 'border-left', 'border-right', 'text-wrap'
        ];

        let cssText = '';
        importantProps.forEach(prop => {
          const value = computedStyle.getPropertyValue(prop);
          if (value && value !== 'none' && value !== 'normal') {
            cssText += `${prop}: ${value} !important; `;
          }
        });

        if (cssText) {
          styles += `${selector} { ${cssText} }\n`;
        }

        // Recursively process children
        Array.from(element.children).forEach(child => {
          styles += getComputedStylesRecursive(child);
        });

        return styles;
      };

      // Get all stylesheets content
      const getStylesheetContent = async () => {
        let allStyles = '';

        // Get inline styles
        const inlineStyles = Array.from(document.querySelectorAll('style'))
          .map(style => style.textContent)
          .join('\n');

        allStyles += inlineStyles;

        // Get external stylesheets
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        // console.log("links", links);
        for (const link of links) {
          try {
            if (link.href.startsWith(window.location.origin)) {
              const response = await fetch(link.href);
              const css = await response.text();
              const filteredCss = css
                .split('}')
                .filter(rule => rule.includes('.pdfView'))
                .map(rule => rule + '}')
                .join('\n');
              allStyles += filteredCss;
            }
          } catch (error) {
            console.warn('Could not load stylesheet:', link.href);
          }
        }

        // Load Iconify icons CSS
        try {
          const iconifyResponse = await fetch('/assets/iconify-icons/generated-icons.css');
          if (iconifyResponse.ok) {
            const iconifyCss = await iconifyResponse.text();
            allStyles += '\n' + iconifyCss;
          }
        } catch (error) {
          console.warn('Could not load iconify icons CSS:', error);
        }

        return allStyles;
      };

      const [stylesheetStyles, computedStyles] = await Promise.all([
        getStylesheetContent(),
        Promise.resolve(getComputedStylesRecursive(pageRef.current))
      ]);

      // Clone the content
      const clonedContent = pageRef.current.cloneNode(true);

      // Wrap each house-Div in a page-break-safe container and group by page
      const houseDivs = clonedContent.querySelectorAll('.house-Div');

      if (houseDivs.length > 0) {
        // Group houses into page wrappers based on natural breaks
        // A4 page height in px at zoom 1.75 ≈ 1122px content area (297mm - 10mm margins)
        // At 900px width with zoom 1.75, effective height ≈ 641px per page
        const estimatedPageHeight = 1000; // Approximate height before page break

        let currentPageWrapper = document.createElement('div');
        currentPageWrapper.className = 'pdf-page-wrapper';
        let currentPageHeight = 0;
        let isFirstHouse = true;

        // Find parent container for all houses
        const parentContainer = houseDivs[0].parentNode;

        // Insert first page wrapper
        parentContainer.insertBefore(currentPageWrapper, houseDivs[0]);

        houseDivs.forEach((houseDiv, index) => {
          // Wrap each house in house-wrapper-pdf
          const wrapper = document.createElement('div');
          wrapper.className = 'house-wrapper-pdf';

          // Estimate house height (rough approximation)
          // Check if house has specific classes that indicate it should break
          const shouldForceBreak = houseDiv.classList.contains('force-page-break') ||
            wrapper.classList.contains('page-break-before');

          // Every 3-4 houses, or if forced, create a new page wrapper
          // This is a heuristic - adjust based on your content
          const housesPerPage = 3; // Adjust this based on average house size
          const shouldBreak = shouldForceBreak || (index > 0 && index % housesPerPage === 0);

          if (shouldBreak && !isFirstHouse) {
            // Create new page wrapper
            currentPageWrapper = document.createElement('div');
            currentPageWrapper.className = 'pdf-page-wrapper';
            parentContainer.insertBefore(currentPageWrapper, houseDiv);
            currentPageHeight = 0;
          }

          // Move house into wrapper and wrapper into current page
          houseDiv.parentNode.insertBefore(wrapper, houseDiv);
          wrapper.appendChild(houseDiv);
          currentPageWrapper.appendChild(wrapper);

          isFirstHouse = false;
        });
      } else {
        // Fallback: just wrap each house individually if no houses found
        houseDivs.forEach((houseDiv) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'house-wrapper-pdf';
          houseDiv.parentNode.insertBefore(wrapper, houseDiv);
          wrapper.appendChild(houseDiv);
        });
      }

      // Function to convert font to base64
      const getFontBase64 = async (fontPath) => {
        try {
          const response = await fetch(fontPath);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error('Error loading font:', fontPath, error);
          return null;
        }
      };

      // Load fonts as base64
      // const [fontNormal, fontSemiBold] = await Promise.all([
      //   getFontBase64('/fonts/s-n.woff2'),
      //   getFontBase64('/fonts/s-sb.woff2')
      // ]);

      // console.warn("fontNormal: ", fontNormal)

      // Add to your font loading section:
      const [fontNormal, fontSemiBold, fontSymbols, fontSymbols2] = await Promise.all([
        getFontBase64('/fonts/s-n.woff2'),
        getFontBase64('/fonts/s-sb.woff2'),
        // Use a CDN font with symbols
        getFontBase64('https://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNr5TRA.woff2'),
        // Use Noto Sans Symbols 2 for better symbol coverage
        getFontBase64('https://fonts.gstatic.com/s/notosanssymbols2/v22/I_uyMoGduATTei9eI8daxVHDyfisHr71ypPqfX71-AI.woff2')
      ]);


      // Build the complete HTML with proper page layout
      const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=900px, initial-scale=1">
          <title>Astro Report PDF</title>
          <style>
            @page { 
              size: A4; 
              margin: 5mm; 
            }

            

            ${fontNormal ? `
            @font-face {
              font-family: 'ea-n';
              font-weight: 400;
              font-stretch: 100%;
              src: url('${fontNormal}') format('woff2');
            }
            ` : ''}

            ${fontSemiBold ? `
            @font-face {
              font-family: 'ea-sb';
              font-weight: 500;
              font-stretch: 100%;
              src: url('${fontSemiBold}') format('woff2');
            }
            ` : ''}

            ${fontSymbols ? `
            @font-face {
              font-family: 'Symbols';
              src: url('${fontSymbols}') format('woff2');
              unicode-range: U+2700-27BF, U+2600-26FF, U+2B00-2BFF;
            }
            ` : ''}

            ${fontSymbols2 ? `
            @font-face {
              font-family: 'Symbols2';
              src: url('${fontSymbols2}') format('woff2');
              unicode-range: U+1F800-1F8FF, U+2B00-2BFF, U+2900-297F;
            }
            ` : ''}
            
            body { 
              background: #fff !important; 
              margin: 0; 
              padding: 0;
              width: 210mm;
              min-height: 297mm;
              // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important;

              /* Add fallback fonts that include symbols */
          font-family: 'Segoe UI', 'Symbols2', 'Symbols', 'Segoe UI Symbol', 'Segoe UI Emoji', Arial, sans-serif !important;
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important;
            }
            
            * { 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important; 
              color-adjust: exact !important;
              box-sizing: border-box;

              /* Ensure all elements can use symbol fonts */
              font-family: inherit !important;
            }

            /* Fixed width container - 900px scaled to fit A4 */
            .previewCard,
            .print-optimized {
              width: 900px !important;
              max-width: 900px !important;
              min-width: 900px !important;
              min-height: 100vh;
              padding: 15px;
              margin: 0 auto;

              /* Replace transform with zoom */
              zoom: 1.75;
              transform: none !important;
              transform-origin: top center;

              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }

            /* PDF Page Wrapper - groups houses per page */
            .pdf-page-wrapper {
              display: block !important;
              position: relative !important;
              page-break-after: always !important;
              page-break-inside: auto !important;
              margin-bottom: 0 !important;
            }

            /* Remove page break after last wrapper */
            .pdf-page-wrapper:last-of-type {
              page-break-after: auto !important;
            }

            /* CRITICAL: House wrapper for page breaks */
            .house-wrapper-pdf {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              -webkit-column-break-inside: avoid !important;
              display: block !important;
              position: relative !important;
              overflow: visible !important;
            }

            /* House section styles */
            .house-Div {
              display: block !important;
              width: 100% !important;
              position: relative !important;
            }

            /* First house in page wrapper - rounded top */
            .pdf-page-wrapper .house-wrapper-pdf:first-child .house-Div {
              border-top-left-radius: 8px !important;
              border-top-right-radius: 8px !important;
              overflow: hidden !important;
            }

            .pdf-page-wrapper .house-wrapper-pdf:first-child .house-header {
              border-top-left-radius: 8px !important;
              border-top-right-radius: 8px !important;
            }

            /* Last house in page wrapper - rounded bottom */
            .pdf-page-wrapper .house-wrapper-pdf:last-child .house-Div {
              border-bottom-left-radius: 8px !important;
              border-bottom-right-radius: 8px !important;
              overflow: hidden !important;
            }

            .pdf-page-wrapper .house-wrapper-pdf:last-child .house-body {
              border-bottom-left-radius: 8px !important;
              border-bottom-right-radius: 8px !important;
            }
              border-bottom-left-radius: 8px !important;
              border-bottom-right-radius: 8px !important;
              overflow: hidden !important;
            }

            /* Prevent breaks in header */
            .house-header {
              page-break-after: avoid !important;
              break-after: avoid !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            /* Prevent breaks in body */
            .house-body {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            /* Keep sub-sections together */
            .house-body-Div1,
            .house-body-Div2 {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            /* Rashi sections */
            .rahi-Div {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            /* Planet sections */
            .planet-Div {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            /* Main containers allow breaks between houses */
            .house-main-Div,
            .main-AstroVastuScript-Div,
            .AstroVastuScript-Div,
            .print-house-container {
              page-break-inside: auto !important;
              break-inside: auto !important;
            }

            .neutral {
              color: #1762ad;
            }

            .rake {
              display: flex;
              gap: 2px;
              align-items: center;
              justify-content: center;
              color: gray;
            }

            .positive {
              color: #057143;
            }

            .negative {
              color: #cc1616;
            }
              

            /* Chart title */
            .chart-title,
            .print-title {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }

            /* Orphans and widows */
            * {
              orphans: 4 !important;
              widows: 4 !important;
            }

            /* Include computed styles */
            /* Fallback styles for components that use scoped CSS in the app (ensures PDF rendering picks them up) */
            .rahu-ketu-card {
              border: 1px solid #e6e6e6 !important;
              border-radius: 8px !important;
              overflow: hidden !important;
              background: #ffffff !important;
            }

            ${computedStyles}

            .main-MahaDasha-Div-break{
              page-break-before: always; 
            }
            

            .main-AstroVastuScript-Div {
              page-break-after: always; 
            }

            /* Additional print-specific overrides */
            @media print {
              body {
                background: white !important;
              }
              
              .no-print {
                display: none !important;
              }

              .house-wrapper-pdf {
                page-break-inside: avoid !important;
              }
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

      // Send to PDF generation API
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          KundaliID: BirthDetails.KundaliID,
          ClientName: `${BirthDetails.FirstName} ${BirthDetails.LastName}`,
          html: fullHtml,
          filename: filename,
          options: {
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            deviceScaleFactor: 3,
            margin: {
              top: '5mm',
              right: '5mm',
              bottom: '5mm',
              left: '5mm'
            },
            scale: 1
          }
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
    if (kundliOptValue.Option == "T")
      getTransitData("", "");

    else if (kundliOptValue.Option == "P") {
      // Use current year if VarshPhalData exists, otherwise use current calendar year
      const yearToFetch = VarshPhalData?.Year || new Date().getFullYear();
      getVarshphalData(yearToFetch);
    }

    else
      getDivisionalChartData(kundliOptValue.Option)
  }, [kundliOptValue])

  const handleDashaChange = async () => {
    const titleArr = DashaTitle.split("-");
    if (DashaValue == "Pran") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}-${titleArr[2]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]}-${titleArr[1]}`);
        setDashaValue("Sookshma");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Sookshma") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > PratyantarDasha`);
        setDashaValue("Pratyantar");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Pratyantar") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": DashaDetailData?.CurrentMD
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]}`);
        setDashaValue("Antar");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Antar") {
      setDashaTitle(`MahaDashas`);
      setDashaValue("Maha");
      setDashaGridData(DashaDetailData?.MahaDasha)
    }
  }

  const handleDashaDoubleClick = async (row) => {

    if (DashaDetailData?.PratyantarDasha?.length == 0) {
      return;
    }

    if (DashaValue == "Maha") {
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
        setDashaValue("Antar");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Antar") {
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
        setDashaValue("Pratyantar");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Pratyantar") {
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
        setDashaValue("Sookshma");
        setDashaGridData(response?.responseData)
      }
    } else if (DashaValue == "Sookshma") {
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
        setDashaValue("Pran");
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
          //  The chart is rotated based on: 
          setRotationTitle(`Birth Chart > ${payload.formattedStr}`)
        } else if (rotationType == "H") {
          setRotationTitle(`House Chart > ${payload.formattedStr}`)
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

  const toggleHeader = () => {
    setIsExpanded(prev => !prev)
  }

  const handleClosePopup = () => {
    setDownloadPopup(false);
  }

  const handleVarshPhalChange = (direction) => {
    // Get birth year from BirthDetails
    const birthDateParsed = dayjs(BirthDetails?.BirthDate, "DD-MM-YYYY");
    
    if (!birthDateParsed.isValid()) {
      toast.error("Invalid birth date format");
      return;
    }
    
    const birthYear = birthDateParsed.year();
    const currentYear = new Date().getFullYear();
    const minYear = birthYear;
    const maxYear = currentYear + 120;

    let newYear = VarshPhalData ? VarshPhalData.Year : new Date().getFullYear();;

    if (direction === 'prev') {
      // Go to previous year (back button)
      newYear = newYear - 1;
    } else if (direction === 'next') {
      // Go to next year (forward button)
      newYear = newYear + 1;
    }

    // Validate year boundaries
    if (newYear < minYear) {
      toast.warning(`Cannot go before birth year ${minYear}`);
      return;
    }

    if (newYear > maxYear) {
      toast.warning(`Cannot go beyond year ${maxYear}`);
      return;
    }

    // Update the year and fetch new data
    // setCurrentVarshphalYear(newYear);
    getVarshphalData(newYear);
  }

  const handleYearDropdownChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    getVarshphalData(selectedYear);
  }

  const getYearOptions = () => {
    if (!BirthDetails?.BirthDate) return [];
    
    // Parse the date in DD-MM-YYYY format
    const birthDateParsed = dayjs(BirthDetails.BirthDate, "DD-MM-YYYY");
    
    // Check if date is valid
    if (!birthDateParsed.isValid()) {
      console.error("Invalid birth date format:", BirthDetails.BirthDate);
      return [];
    }
    
    const birthYear = birthDateParsed.year();
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 120;
    const years = [];
    
    for (let year = birthYear; year <= maxYear; year++) {
      years.push(year);
    }
    
    return years;
  }

  return (
    <>
      {/* {Loading && <Loader />} */}
      <Grid className='previewCard' item xs={12} md={12}>
        <PDFView AstroVastuHouseScript={AstroVastuHouseScript} BirthDetails={BirthDetails} Symbols={Symbols} pageRef={pageRef} AstroDetails={AstroDetails} ChartSVG={ChartSVG} PlaneNSummaryData={PlaneNSummaryData} HouseNSummaryData={HouseNSummaryData} RahuData={RahuData} KetuData={KetuData} PlanetSummaryData={PlanetSummaryData} HouseSummaryData={HouseSummaryData} DashaGridData={DashaGridData} visibleSections={visibleSections} />
        <Grid item xs={12} className='pdf-Div'>
          <div className={`chart-name sticky top-0 z-50 font-ea-sb flex justify-between md:items-center gap-y-2 lg:flex-row ${!isPrintDiv ? 'sm:flex-row flex-col' : "items-center"}`}>
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
              <div className='flex-grow flex justify-end items-center'>
                <IconButton
                  variant='outlined'
                  size='small'
                  onClick={toggleHeader}
                  sx={{
                    borderColor: 'var(--border-color)',
                    color: 'white',
                    ':hover': {
                      backgroundColor: 'var(--primary-soft-color)',
                      borderColor: 'var(--primary-color)'
                    }
                  }}
                >
                  {isExpanded ? (
                    <i className='tabler-circle-arrow-up'></i>
                  ) : (
                    <i className='tabler-circle-arrow-down'></i>
                  )}
                </IconButton>
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
                    <MenuItem onClick={handleIsNSLordOpen} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Nakshatra Lord & Sub Lord</MenuItem>
                    {/* <MenuItem className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Save</MenuItem> */}
                    <MenuItem onClick={handleMenuTimeTool} className="flex gap-1"><i className={'tabler-calendar-share me-2'} />TimeTool</MenuItem>
                    <MenuItem className="flex gap-1"><i className={'tabler-calendar-share me-2'} />Transit Analysis</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSaveKundaliBtn} className="flex gap-1"><i className={'tabler-copy-plus me-2'} />Save Kundali</MenuItem>
                    <MenuItem onClick={handleDownloadPopupOpen} className="flex gap-1"><i className={'tabler-download me-2'} />Download PDF</MenuItem>
                  </Menu>
                </>
              </div>
            </div>
          </div>

          <Collapse in={isExpanded} timeout='auto' unmountOnExit>
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
                  { "label": "Prakriti", "value": `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}` } // { "label": "Location ", "value": `${BirthDetails?.City}, ${BirthDetails?.Country}` },
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
                  { "label": "Group ", "value": ` ${BirthDetails?.Group || ""}` },
                  { "label": "Reference", "value": `${BirthDetails?.Reference || ""}` },
                  { "label": "Remark", "value": `${BirthDetails?.Remark || ""}` },
                  // { "label": "Prakriti", "value": `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}` },
                ]} isPrintDiv={isPrintDiv} />
              </div>
            </div>
          </Collapse>

          <div className={`flex px-1 pt-4 gap-5 overflow-auto md:flex-wrap lg:flex-nowrap`}>
            {openKundli && (
              <KundliOption
                KundliData={allKundliOpt}
                setKundliValue={setKundliOptValue}
                open={openKundli}
                handleClose={handleOpenKundliClose}
              />
            )}
            <div className='w-full'>
              {/* Chart Titles Row */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-1 mb-0'>
                {/* Birth Chart Title */}
                <div className='chart-title'>
                  <Button onClick={() => handleRoatationOpen("B")} >
                    <span className='font-ea-sb text-xl'>
                      ❋ Birth Chart / Lagna Kundali ❋
                    </span>
                  </Button>
                </div>

                {/* House Chart Title */}
                <div className='chart-title'>
                  <Button onClick={() => handleRoatationOpen("H")} >
                    <span className='font-ea-sb text-xl'>
                      ❋ House Chart / Bhav Chalit Kundali ❋
                    </span>
                  </Button>
                </div>

                {/* Dasha/Options Title */}
                <div className='chart-title flex'>
                  <div className='flex px-2 w-full items-center'>
                    <div className='flex items-center'>
                      {DashaValue != "Maha" && kundliOptValue && kundliOptValue.Option == "V" && (
                        <IconButton onClick={handleDashaChange} className='h-[38px] text-primary'>
                          🠜
                        </IconButton>
                      )}

                      {kundliOptValue && kundliOptValue.Option == "P" && (
                        <IconButton onClick={() => handleVarshPhalChange('prev')} className='h-[38px] text-primary'>
                          🠜
                        </IconButton>
                      )}
                    </div>
                    <div className='flex-1 flex items-center justify-center'>
                      <Button className='cursor-pointer flex items-center' onClick={handleKundliOpt}>
                        <span className='font-ea-sb text-xl'>
                          ❋ {kundliOptValue && kundliOptValue.Option == "V" ? `Vimshottari Dasha (${DashaValue})` : kundliOptValue.OptionName} ❋
                        </span>
                      </Button>
                      {kundliOptValue && kundliOptValue.Option == "P" && (
                        <FormControl size="small" className='ml-3' sx={{ width: 100 }}>
                          <Select
                            value={VarshPhalData?.Year || dayjs().year()}
                            onChange={handleYearDropdownChange}
                            className='h-[38px]'
                            MenuProps={{
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              PaperProps: {
                                style: {
                                  maxHeight: 48 * 10, // 48px per item * 10 items
                                  width: 100,
                                  overflowY: 'auto',
                                },
                              },
                            }}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                              }
                            }}
                          >
                            {getYearOptions().map((year) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </div>
                    <div className='flex items-center'>
                      {kundliOptValue && kundliOptValue.Option == "P" && (
                        <IconButton onClick={() => handleVarshPhalChange('next')} className='h-[38px] text-primary'>
                          🠞
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
                {/* Birth Chart */}
                <div className='w-full h-full'>
                  <div className='flex justify-center items-start px-2 h-full' ref={divRef}>
                    <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} className='w-full max-w-full h-auto' alt="birthChart" />
                  </div>
                </div>

                {/* House Chart */}
                <div className='w-full h-full myDiv'>
                  <div className='flex justify-center items-start px-2 h-full'>
                    <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} className='w-full max-w-full h-auto' alt="houseChart" />
                  </div>
                </div>

                {/* Dasha/Transit/Divisional Chart */}
                <div className='w-full h-full'>
                  {kundliOptValue && kundliOptValue.Option == "V" ? (
                    <div className='flex justify-center items-start px-2 h-full'>
                      <div className='w-full h-full'>
                        <DashaDetails title={DashaTitle} DashaData={DashaGridData} handleDashadbClick={handleDashaDoubleClick} divref={divRef} />
                      </div>
                    </div>
                  ) : (
                    TransitData &&
                    <>
                      {kundliOptValue.Option == "T" ? (
                        <div className='flex justify-center items-start px-2 h-full'>
                          {TransitData?.TransitChart ?
                            <img src={`data:image/svg+xml;base64,${TransitData?.TransitChart}`} alt="transitChart" className='w-full max-w-full h-auto' />
                            :
                            <EALoader />
                          }
                        </div>
                      ) :
                        kundliOptValue.Option == "P" ? (
                          <div className='flex justify-center items-start px-2 h-full'>
                            {VarshPhalData?.VChart ?
                              <img src={`data:image/svg+xml;base64,${VarshPhalData?.VChart}`} alt="varshPhalChart" className='w-full max-w-full h-auto' />
                              :
                              <EALoader />
                            }
                          </div>
                        ) :
                          (
                            <div className='flex justify-center items-start px-2 h-full'>
                              {DivisionalData?.DChart ?
                                <img src={`data:image/svg+xml;base64,${DivisionalData?.DChart}`} alt="divisionalChart" className='w-full max-w-full h-auto' />
                                :
                                <EALoader />
                              }
                            </div>
                          )}
                    </>
                  )}
                </div>
              </div>

              {/* Rotation Title Chip */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-1 mb-0'>
                <div className='mt-1 px-2'>
                  {kundliOptValue && kundliOptValue.Option != "V" && currentDasha && (
                    <CustomChip label={'Current Dasha: '} value={currentDasha?.DashaPlanet} />
                  )}
                  {rotationTital && kundliOptValue && kundliOptValue.Option == "V" && (
                    <CustomChip value={rotationTital} label={"The chart is rotated based on:"} />
                  )}
                </div>
                <div className='mt-1 px-2'>
                  {rotationTital && kundliOptValue && kundliOptValue.Option != "V" && (
                    <CustomChip value={rotationTital} label={"The chart is rotated based on:"} />

                  )}
                </div>
                <div className='mt-1 px-2'>
                  {kundliOptValue.Option == "P" && VarshPhalData && (
                    <CustomChip label={"Varshphal Date & Time: "} value={`${VarshPhalData?.Date} ${VarshPhalData?.Time}`} />
                  )}
                  {kundliOptValue.Option == "T" && TransitData && (
                    <CustomChip label={`Transit Date & Time: `} value={TransitData?.TransitDateTime} />
                  )}
                </div>
              </div>
            </div>
          </div>


          <div className='main-MahaDasha-Div pt-4'>
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


          <div className='main-RahuKetu-Div pt-4'>
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

          <div className='main-AstroVastuScript-Div pt-7'>
            <div className='chart-title'>❋ Planet ↠ Planet Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={PlanetSummaryData} Aspect={"P"} />
            </div>
          </div>

          <div className='main-AstroVastuScript-Div pt-7'>
            <div className='chart-title'>❋ Planet ↠ House Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={HouseSummaryData} Aspect={"H"} />
            </div>
          </div>



          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Remedial Astro Vastu Insights ❋</div>
            <div className='AstroVastuScript-Div'>
              <House houseArr={AstroVastuHouseScript} Symbols={Symbols}></House>
            </div>
          </div>

        </Grid>
      </Grid>
      {isPrakritiVisible && <PrakritiPopUp open={isPrakritiVisible} handlePraClose={handleIsPraClose} />}
      {isNSLordVisible && <NSubLordPopUp open={isNSLordVisible} handleNSLordClose={handleIsNLLordClose} PlaneNSummaryData={PlaneNSummaryData} LifeEventValue={LifeEventValue} Symbols={Symbols} />}
      {openJCK && <JaiminiCharKarakasPopUp open={openJCK} handleClose={handleJCK} JaiminiCharKarakasData={JaiminiCharKarakas} />}
      {openNTC && <NavTaraChakra open={openNTC} handleClose={handleNTC} NavTaraChakraData={NavTaraChakraData} />}
      {openRotation && <Rotation open={openRotation} handleClose={handleRoatationClose} rotationType={rotationType} hanldeRotationChange={hanldeRotationChange} />}
      {SaveKundali && (
        <ConfirmationPopup open={SaveKundali} isDelete={true} handleClose={handleSaveKundaliClose} userData={kundliData?.AstroVastuReport?.BirthDetails} handleClick={saveKundaliDateTime} subTitle={"Are you sure want to update this kundali?"} title={"Update Kundali"} />
      )}
      {downloadPopup &&
        <DownloadPopUp
          open={downloadPopup}
          handleClose={handleClosePopup}
          TabData={items}
          handleSave={handleSelectedPageDownload}
          defaultCheckedItems={["Nakshatra Kundali: Planet & House Script", "Astro Vastu Insights"]}
        />
      }
    </>
  )
}

export default PreviewCard
