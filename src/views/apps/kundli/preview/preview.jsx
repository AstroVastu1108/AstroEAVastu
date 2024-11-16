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
import { ChangeDateTimeKundli, TransitClickEvent } from '@/app/Server/API/kundliAPI'
import Loader from '@/components/common/Loader/Loader'
import dayjs from 'dayjs'

const Preview = ({ kundliData, setKundliData }) => {
  const printRef = useRef()

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [existdownloadLoading, setExistDownloadLoading] = useState(false);
  const [timeToolPopUp, setTimeToolPopUp] = useState(false);
  const [kundliBirthData, setKundliBirthData] = useState(kundliData?.AstroVastuReport?.BirthDetails);
  const [TimeToolOpt, setTimeToolOpt] = useState("B");
  const [TransiteTime, setTransiteTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [TransitData, setTransitData] = useState(null);
  const [datePicker, setDatePicker] = useState(dayjs());

  // const handleKundliApi = async () => {
  //   if (kundliData) {
  //     try {
  //       setExistDownloadLoading(true);
  //       const response = await getKundliPdf(kundliData.AstroVastuReport.BirthDetails.KundaliID);
  //       if (response.hasError) {
  //         return toastDisplayer("error", response.error)
  //       }
  //       // Create a Blob from the PDF
  //       const pdfBlob = new Blob([response.responseData.data], { type: 'application/pdf' });

  //       // Create a URL for the Blob
  //       const pdfURL = URL.createObjectURL(pdfBlob);

  //       // Open the PDF in a new window
  //       const newWindow = window.open(pdfURL);

  //       // if (newWindow) {
  //       //   newWindow.addEventListener('load', () => {
  //       //     newWindow.print();
  //       //   });
  //       // }
  //       setExistDownloadLoading(false);
  //     } catch (error) {
  //       setExistDownloadLoading(false);
  //     }
  //   }
  // }

  const handleKundliApi = () => {
    if (kundliData) {
      setLoading(true);
      const link = document.createElement('a');
      link.href = `${process.env.NEXT_PUBLIC_APIURL}/astro/astro-vastu-report-pdf/${kundliData?.AstroVastuReport?.BirthDetails?.KundaliID}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // handleClose();
      setLoading(false);
    }
  };

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

  const getTransitData = async (fdate, ftime, option) => {
    var BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
    var date = "";
    var time = "";
    if (fdate && ftime) {
      date = fdate;
      time = ftime;
    } else {
      if (TransiteTime != null) {
        // Parse the custom date format
        const datePicker = dayjs(TransiteTime, 'DD-MM-YYYY HH:mm:ss');

        if (datePicker.isValid()) {
          date = datePicker.format('DD-MM-YYYY');
          time = datePicker.format('HHmmss');
        } else {
          // console.log('Invalid Date');
        }
      }
    }
    const payload = {
      "KundaliID": BirthDetails.KundaliID,
      "FirstName": BirthDetails.FirstName,
      "MiddleName": BirthDetails.MiddleName,
      "LastName": BirthDetails.LastName,
      "Gender": BirthDetails.Gender,
      "Prakriti": BirthDetails.Prakriti,
      "BirthDate": BirthDetails.Date,
      "BirthTime": BirthDetails.Time,
      "Country": BirthDetails.Country,
      "CityID": BirthDetails.CityID,
      "TransitTime": time,
      "TransitDate": date
    }
    const response = await TransitClickEvent(payload);
    if (response.hasError) {
      // setLoading(false);
      return toastDisplayer("error", response.error);
    } else {
      const data = response?.responseData?.Result?.Transit;
      setTransiteTime(data?.TransitDateTime)
      if (TimeToolOpt == "T" || option == "T") {
        setDatePicker(dayjs(data?.TransitDateTime, 'DD-MM-YYYY HH:mm:ss'))
      } else {
        const { Date: birthDate, Time: birthTime } = kundliData?.AstroVastuReport?.BirthDetails;
        const formattedDate = dayjs(`${birthDate} ${birthTime}`, 'DD-MM-YYYY HHmmss');
      }
      setTransitData(data);
    }
  }
  // const getTransitData = async (date, time, option) => {
  //   var BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  //   const payload = {
  //     "KundaliID": BirthDetails.KundaliID,
  //     "FirstName": BirthDetails.FirstName,
  //     "MiddleName": BirthDetails.MiddleName,
  //     "LastName": BirthDetails.LastName,
  //     "Gender": BirthDetails.Gender,
  //     "Prakriti": BirthDetails.Prakriti,
  //     "BirthDate": BirthDetails.Date,
  //     "BirthTime": BirthDetails.Time,
  //     "Country": BirthDetails.Country,
  //     "CityID": BirthDetails.CityID,
  //     "TransitTime": time,
  //     "TransitDate": date
  //   }
  //   const response = await TransitClickEvent(payload);
  //   if (response.hasError) {
  //     // setLoading(false);
  //     return toastDisplayer("error", response.error);
  //   } else {
  //     const data = response?.responseData?.Result?.Transit;
  //     setTransiteTime(dayjs(data?.TransitDateTime, 'DD-MM-YYYY HH:mm:ss'))
  //     console.log("time tool opt : ", option)
  //     if (TimeToolOpt != "T") {
  //       if (option == "T")
  //         setDatePicker(dayjs(data?.TransitDateTime, 'DD-MM-YYYY HH:mm:ss'))
  //     } else {
  //       setDatePicker(dayjs(data?.TransitDateTime, 'DD-MM-YYYY HH:mm:ss'))
  //     }
  //     setTransitData(data);
  //   }
  // }

  const handleDateChange = async (datePicker) => {
    var kdata = kundliData?.AstroVastuReport?.BirthDetails;
    const formattedDate = datePicker.format('DD-MM-YYYY');
    const formattedTime = datePicker.format('HHmmss'); // 24-hour format without colon
    if (TimeToolOpt == "B") {
      var date = "";
      var time = "";
      if (TransiteTime != null) {
        const datePicker = dayjs(TransiteTime, 'DD-MM-YYYY HH:mm:ss');

        if (datePicker.isValid()) {
          date = datePicker.format('DD-MM-YYYY');
          time = datePicker.format('HHmmss');
        }
      }
      const formattedData = {
        KundaliID: kdata.KundaliID,
        FirstName: kdata.FirstName,
        LastName: kdata.LastName,
        MiddleName: kdata.MiddleName,
        Gender: kdata.Gender,
        Country: kdata.Country,
        CityID: kdata.CityID,
        City: kdata.CityID,
        BirthDate: formattedDate,
        BirthTime: formattedTime,
        Prakriti: kdata.prakriti || '',
        TransitTime: time,
        TransitDate: date
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
    } else {
      if (TransiteTime) {
        const formatedString = dayjs(TransiteTime, 'DD-MM-YYYY HHmm');
        if (!formatedString.isSame(datePicker, 'second')) {
          getTransitData(formattedDate, formattedTime);
        }
      }
    }
  }

  const handleTimeToolOptChange = (e) => {
    setTimeToolOpt(e.target.value);
    if (e.target.value == "T") {
      if (!TransiteTime) {
        getTransitData(null, null, "T");
      } else {
        setDatePicker(dayjs(TransiteTime, 'DD-MM-YYYY HHmm'));
      }
    } else {
      const { Date: birthDate, Time: birthTime } = kundliData?.AstroVastuReport?.BirthDetails;
      const formattedDate = dayjs(`${birthDate} ${birthTime}`, 'DD-MM-YYYY HHmm');
      setDatePicker(formattedDate);
    }
  }

  return (
    <>
      {loading && <Loader />}
      {existdownloadLoading && <Loader />}
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col p-0'>

              <div className='previewPDF flex justify-center'>
                {kundliData &&
                  <>
                    <PreviewCard kundliData={kundliData} handleDownload={handleKundliApi} isPrintDiv={false} loading={existdownloadLoading} handleTimeTool={handleTimeTool} setTransitData={setTransitData} TransitData={TransitData} getTransitData={getTransitData} />
                  </>
                }
                {timeToolPopUp &&
                  <TimeTool handleTimeTool={handleTimeTool} handleDateChange={handleDateChange} kundliBirthData={kundliData?.AstroVastuReport?.BirthDetails} handleTimeToolOptChange={handleTimeToolOptChange} setDatePicker={setDatePicker} datePicker={datePicker} TimeToolOpt={TimeToolOpt} />
                }
              </div>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Button variant='contained' sx={{
        position: 'fixed',
        insetInlineEnd: '2.5rem',
        insetBlockEnd: '6.5rem',
        zIndex: 9999
      }} className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
        onClick={handleTimeTool}>
        <i className='tabler-calendar-share' />
      </Button> */}

    </>
  )
}

export default Preview
