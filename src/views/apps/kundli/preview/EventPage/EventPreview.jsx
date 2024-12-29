import { LoadingButton } from '@mui/lab';
import { Grid, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EventCard from './EventCard';
import dayjs from 'dayjs';
import AddEvent from '@/components/preview/Event/Event';

function EventPreview({ EventsData, KID }) {
  const BirthDetails = EventsData?.BirthDetails;
  const AllEventsData = EventsData?.EventList;
  const [openEvent, setOpenEvent] = useState(false);
  const [newEventData, setNewEventData] = useState(
    {
      ClientID: "",
      KundaliID: KID,
      EventID: "",
      Event: "",
      EventDate: dayjs(),
      City: { CityID: 1255364, FormattedCity: 'Surat, Gujarat' },
      Country: { CountryCode: 'IN', Country: 'India' },
      Remark: "",
      isUpdate: false
    }
  );

  // var newEventData = {
  //   ClientID: "",
  //   KundaliID: KID,
  //   EventID: "",
  //   Event: "",
  //   EventDate: dayjs(),
  //   City: { CityID: 1255364, FormattedCity: 'Surat, Gujarat' },
  //   Country: { CountryCode: 'IN', Country: 'India' },
  //   Remark: "",
  //   isUpdate: false
  // };

  const handleEventClose = () => {
    setOpenEvent(false);
  }

  const handleEventOpen = () => {
    setOpenEvent(true);
  }

  const handleEventEdit = (data) => {
    // var formData = data;
    var formData = data;
    const dateParts = formData.EventDate.split('-');
    const timeParts = formData.EventTime;

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // month is 0-indexed in JS
    const year = parseInt(dateParts[2], 10);

    let hours, minutes, sec;
    if (timeParts && timeParts.length === 6) {
      hours = parseInt(timeParts.substring(0, 2), 10);
      minutes = parseInt(timeParts.substring(2, 4), 10);
      sec = parseInt(timeParts.substring(2, 4), 10);
      console.log(hours, minutes, sec)
    } else {
      // Use current time if BirthTime is not in the correct format
      const now = new Date();
      hours = now.getHours();
      minutes = now.getMinutes();
    }

    const eventDate = new Date(year, month, day, hours, minutes);
    console.log(eventDate)
    // formData.EventDate = dayjs(new Date(year, month, day, hours, minutes));
    formData.isUpdate = true;
    // formData.City = { CityID: formData.CityID, FormattedCity: formData.City };
    // formData.Country = { CountryCode: formData.CountryCode, Country: formData.Country };
    console.log("formData : ", { CityID: formData.CityID, FormattedCity: formData.City })
    console.log("formData : ", formData.City)
    console.log("formData : ", formData.CityID)
    // newEventData = formData;
    console.log(newEventData)
    handleEventOpen();
  }

  return (
    <>
      <Grid className='previewCard' item xs={12} md={12}>
        <Grid item xs={12} className='flex gap-2 flex-col pb-2'>
          <div className={`chart-name sticky top-0 z-50 font-ea-sb rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col`}>
            <div>
              {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundali'}
              <span className='text-white font-ea-sb'> # Good</span>
            </div>
            <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row sm:flex-row sm:gap-1 flex-col birthDateTime-Div`} >
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label font-ea-n'>Birth Date & Time: </span>
                <span className='value font-ea-sb'>{BirthDetails?.BirthDate} {BirthDetails?.BirthTime.substring(0, 2)}:{BirthDetails?.BirthTime.substring(2, 4)}:{(BirthDetails?.BirthTime.substring(4, 6) ? BirthDetails?.BirthTime.substring(4, 6) : '00')}
                </span>
              </div>
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label font-ea-n'>Place: </span>
                <span className='value font-ea-sb'>{BirthDetails?.City}</span>
              </div>
            </div>
          </div>
          <div className='flex gap-4 justify-between px-5 w-full py-3'>
            <div className='w-9/12 lg:w-10/12'>
              <TextField
                // value={query}
                // onChange={handleSearchChange}
                // className='SearchBar'
                // variant="filled"
                variant="outlined"
                placeholder="Search..."
                fullWidth
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='tabler-search text-primary'></i>
                      {/* <SearchIcon /> */}
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </div>
            <div className='w-3/12 lg:w-2/12'>
              <LoadingButton
                variant='contained'
                fullWidth
                // sx={{ width: '180px', textTransform: 'none' }}
                onClick={handleEventOpen}
              // loading={loading}
              // loadingPosition="start"
              // className='w-5/12 lg:w-12/12 md:w-3/12 sm:w-4/12'
              >
                Add Event
              </LoadingButton>
            </div>
          </div>
          <div className='px-3 flex flex-col gap-3'>
            {AllEventsData && AllEventsData.length &&
              <EventCard AllEventsData={AllEventsData} handleEventEdit={handleEventEdit} />
            }
          </div>
          {/* <div className='px-3 flex flex-col gap-3'>
            {AllEventsData && AllEventsData.length
              ? AllEventsData.map((element, index) => (
                <div key={index} className=''>
                  <EventCard Element={element} Key={index + 1} handleEventEdit={handleEventEdit} />
                </div>
              ))
              : null
            }
          </div> */}
        </Grid>
      </Grid>
      {openEvent && <AddEvent NewEventData={newEventData} open={openEvent} handleClose={handleEventClose} />}
    </>
  )
}

export default EventPreview
