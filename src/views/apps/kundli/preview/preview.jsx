'use client'

// MUI Imports

// Component Imports
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { getKundliPdf } from '@/app/Server/API/common'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { Box, Button, Card, CardContent, Grid } from '@mui/material'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import TimeTool from './TimeTool'
import { ChangeDateTimeKundli } from '@/app/Server/API/kundliAPI'
import Loader from '@/components/common/Loader/Loader'

const Preview = ({ kundliData, setKundliData }) => {
  const printRef = useRef()

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [existdownloadLoading, setExistDownloadLoading] = useState(false);
  const [timeToolPopUp, setTimeToolPopUp] = useState(false);
  const [kundliBirthData, setKundliBirthData] = useState(kundliData?.AstroVastuReport?.BirthDetails);
  const [loading, setLoading] = useState(false);

  const handleKundliApi = async () => {
    if (kundliData) {
      try {
        setExistDownloadLoading(true);
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
        setExistDownloadLoading(false);
      } catch (error) {
        setExistDownloadLoading(false);
      }
    }
  }

  const handleButtonClick = () => {
    setDownloadLoading(true);
    if (printRef.current) {
      html2canvas(printRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 2); // Convert to JPEG with lower quality
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 200; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 4;

        pdf.addImage(imgData, 'JPEG', 4, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 4, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }

        pdf.save('document.pdf');
      });
      // setDownloadLoading(false);
    }
    setTimeout(() => {

      setDownloadLoading(false);
    }, 2000);
  };

  const handleTimeTool = () => {
    setTimeToolPopUp(!timeToolPopUp)
  }

  const handleDateChange = async (datePicker) => {
    var kdata = kundliData?.AstroVastuReport?.BirthDetails;
    const formattedDate = datePicker.format('DD-MM-YYYY');
    const formattedTime = datePicker.format('HHmm'); // 24-hour format without colon
    const formattedData = {
      KundaliID: kdata.KundaliID,
      FirstName: kdata.FirstName,
      LastName: kdata.LastName,
      MiddleName: kdata.MiddleName,
      Gender: kdata.Gender,
      Country: kdata.Country,
      CityID: "A1AE28185ED49D47211760BF32D40EB742C84998",
      City: "A1AE28185ED49D47211760BF32D40EB742C84998",
      BirthDate: formattedDate,
      BirthTime: formattedTime,
      Prakriti: kdata.prakriti || ''
    }
    try {
      // setLoading(true);
      const response = await ChangeDateTimeKundli(formattedData)

      if (response.hasError) {
        setIsDisable(false)
        return toastDisplayer("error", response.error)
      }
      setKundliData(response?.responseData?.Result)
      // return setLoading(false);
    } catch (error) {
      setLoading(false)
    }
  }

  // useEffect(()=>{
  //   console.log("==>",kundliData)
  // },[kundliData])

  return (
    <>
      {loading && <Loader />}
      {existdownloadLoading && <Loader />}
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col p-0'>

              <div className='previewPDF'>
                {kundliData &&
                  <>
                    <PreviewCard kundliData={kundliData} handleDownload={handleKundliApi} isPrintDiv={false} loading={existdownloadLoading} />
                  </>
                }
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant='contained' sx={{
        position: 'fixed',
        insetInlineEnd: '2.5rem',
        insetBlockEnd: '6.5rem',
        zIndex: 9999
      }} className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
        onClick={handleTimeTool}>
        <i className='tabler-calendar-share' />
      </Button>

      {timeToolPopUp && <TimeTool handleDateChange={handleDateChange} kundliBirthData={kundliBirthData} />}
    </>
  )
}

export default Preview
