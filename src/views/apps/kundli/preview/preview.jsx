'use client'

// MUI Imports

// Component Imports
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useRef } from 'react'
import axios from 'axios'
import { getKundliPdf } from '@/app/Server/API/common'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { Card, CardContent, Grid } from '@mui/material'
import PageTitle from '@/components/common/PageTitle/PageTitle'
const Preview = ({ kundliData }) => {
  const printRef = useRef()

  const handleKundliApi = async () => {
    if (kundliData) {
      try {
        const response = await getKundliPdf(kundliData.AstroVastuReport.BirthDetails.KundaliID);
        if (response.hasError) {
          return toastDisplayer("error", response.error)
        }
        // Create a Blob from the PDF
        const pdfBlob = new Blob([response.responseData.data], { type: 'application/pdf' });

        // Create a URL for the Blob
        const pdfURL = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new window
        const newWindow = window.open(pdfURL);

        // if (newWindow) {
        //   newWindow.addEventListener('load', () => {
        //     newWindow.print();
        //   });
        // }

      } catch (error) {
        console.error('Error fetching the PDF:', error);
      }
    }
  }
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
    <>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col p-0'>
              <PageTitle title={"Kundli Preview"} endCmp={<>
                <PreviewActions value={"Existing"} onButtonClick={handleKundliApi} />
                <PreviewActions value={"Download"} onButtonClick={handleButtonClick} />
              </>} />
              <div ref={printRef} className='previewPDF p-5'>
                <PreviewCard kundliData={kundliData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Grid container spacing={6}>
        <PageTitle title={"Kundli Preview"} endCmp={<>
          <PreviewActions value={"Existing"} onButtonClick={handleKundliApi} />
          <PreviewActions value={"Download"} onButtonClick={handleButtonClick} />
        </>} />
        <Grid item xs={12} md={12}>
          <div ref={printRef}>
            <PreviewCard kundliData={kundliData} />
          </div>
        </Grid>
      </Grid> */}
    </>
  )
}

export default Preview
