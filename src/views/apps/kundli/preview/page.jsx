// 'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useRef } from 'react'
const Preview = ({ kundliData }) => {
  const printRef = useRef()
  // Handle Print Button Click
  // const handleButtonClick = () => {
  //   window.print()
  // }
  const handleButtonClick = () => {
    if (printRef.current) {
      html2canvas(printRef.current, { scale: 1.5 }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.7); // Convert to JPEG with lower quality
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
  
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
  
        pdf.save('document.pdf');
      });
    }
  };
  
  return (
    <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <div className='flex justify-end'>
            <PreviewActions onButtonClick={handleButtonClick} />
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
        <div ref={printRef}>
          <PreviewCard kundliData={kundliData} />
     </div>
        </Grid>
      </Grid>
  )
}

export default Preview
