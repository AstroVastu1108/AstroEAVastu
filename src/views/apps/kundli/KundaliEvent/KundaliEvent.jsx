import AddEvent from '@/components/preview/Event/Event';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Card, CardContent, Grid, InputAdornment, TextField } from '@mui/material'
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import KundaliEventCard from './KundaliEventCard';
import { EventOptionsData } from '@/app/Server/API/kundliAPI';
import Loader from '@/components/common/Loader/Loader';

function KundaliEvent({ EventsData, KID, getAllEvent }) {

  const BirthDetails = EventsData?.BirthDetails;
  const AllEventsData = EventsData?.EventList;

  const [EventOptionData, setEventOptionData] = useState([]);
  const [openAddEvent, setOpenAddEvent] = useState(false);
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
  const [loading, setLoading] = useState(false);


  const getEventOpions = async () => {
    setLoading(true);
    const response = await EventOptionsData();
    if (response.hasError) {
      setLoading(false);
      // return toastDisplayer("error", response.error);
    } else {
      const data = response?.responseData?.Result?.Events;
      const otherData = [{ EventName: "Other", Event: "Other" }]
      setEventOptionData([...data, ...otherData]);
      setLoading(false);
    }
  }

  useEffect(() => {
    getEventOpions();
  }, [])

  const handleAddEventClose = () => {
    setOpenAddEvent(false);
  }

  const handleAddEventOpen = () => {
    setOpenAddEvent(true);
  }

  const handleEdit = (eid) => {
    const dataToUpdate = AllEventsData.find(e => e.EventID == eid);
    if (!dataToUpdate) return;

    const dateParts = dataToUpdate.EventDate.split('-');
    const timeParts = dataToUpdate.EventTime;

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // month is 0-indexed in JS
    const year = parseInt(dateParts[2], 10);

    let hours = 0, minutes = 0, seconds = 0;
    if (timeParts && timeParts.length === 6) {
      hours = parseInt(timeParts.substring(0, 2), 10);
      minutes = parseInt(timeParts.substring(2, 4), 10);
      seconds = parseInt(timeParts.substring(4, 6), 10);
    }

    // Create a Day.js object for internal use
    const eventDate = dayjs(new Date(year, month, day, hours, minutes, seconds));

    // Update state with the parsed and formatted data
    setNewEventData({
      ...dataToUpdate,
      EventID: eid,
      Event: dataToUpdate.Event,
      EventDate: dayjs(eventDate),
      City: { CityID: dataToUpdate.CityID, FormattedCity: dataToUpdate.City },
      Country: { CountryCode: dataToUpdate.CountryCode, Country: dataToUpdate.Country },
      Remark: dataToUpdate.Remark,
      isUpdate: true
    });

    handleAddEventOpen();
  };



  return (
    <>
      {loading && <Loader />}

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col p-0'>

              <div className='flex justify-center'>
                {EventsData &&
                  <>
                    <Grid className='previewCard' item xs={12} md={12}>
                      <Grid item xs={12} className='flex gap-2 flex-col pb-2'>
                        <div className={`chart-name sticky top-0 z-drawer font-ea-sb rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col py-2`}>
                          <div className='uppercase'>
                            {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundali'}
                          </div>
                          <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row sm:flex-row sm:gap-1 flex-col birthDateTime-Div`} >
                            <div className='flex flex-row gap-1 chart-date items-center'>
                              <span className='label font-ea-n'>Birth Date & Time: </span>
                              <span className='value font-ea-sb'>{BirthDetails?.BirthDate} {BirthDetails?.BirthTime.substring(0, 2)}:{BirthDetails?.BirthTime.substring(2, 4)}:{(BirthDetails?.BirthTime.substring(4, 6) ? BirthDetails?.BirthTime.substring(4, 6) : '00')}
                              </span>
                            </div>
                            <div className='flex flex-row gap-1 chart-date items-center'>
                              <span className='label font-ea-n'>Place: </span>
                              <span className='value font-ea-sb'>{BirthDetails?.City}, {BirthDetails?.Country}</span>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4 justify-between px-5 w-full py-3'>
                          <div className='w-9/12 lg:w-10/12'>
                            <TextField
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
                          <div className='w-2/12'>
                            <Autocomplete
                              label="Select Event"
                              title="Select Event"
                              id='event-select'
                              options={EventOptionData && EventOptionData}
                              getOptionLabel={(option) => option?.EventName}
                              getOptionKey={(option) => option?.Event}
                              // onChange={(event, newValue) => handleInputChange('Event', newValue, 'Event', true)}
                              renderInput={(params) => (
                                <TextField {...params} fullWidth label='Select Event' title='Select Event' variant='outlined'
                                />
                              )}
                              fullWidth
                              // className='w-[12rem]'
                              size='small'
                            />
                          </div>
                          <div className='w-3/12 lg:w-2/12'>
                            <LoadingButton
                              variant='contained'
                              fullWidth
                              onClick={handleAddEventOpen}
                            >
                              Add Event
                            </LoadingButton>
                          </div>
                        </div>
                        <div>
                          {AllEventsData && AllEventsData.length
                            ? AllEventsData.map((element, index) => (
                              <div key={index} className=''>
                                <KundaliEventCard EventElement={element} index={index} handleEditEvent={handleEdit} />
                              </div>
                            )) : null
                          }
                        </div>
                      </Grid>
                    </Grid>
                  </>

                }
              </div>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {openAddEvent && <AddEvent getAllEvent={getAllEvent} NewEventData={newEventData} open={openAddEvent} handleClose={handleAddEventClose} EventOptionData={EventOptionData} />}

    </>
  )
}

export default KundaliEvent
