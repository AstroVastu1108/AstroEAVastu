import { Button, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useState } from 'react'

function EventCard({ AllEventsData, handleEventEdit }) {

  const planetData = {
    columns: [
      { field: 'planet', headerName: 'Description', flex: 1, headerClassName: 'rowheader' },
      ...['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Rahu', 'Ketu'].map((planet, index) => ({
        field: `degree${index + 1}`,
        headerName: planet,
        flex: 1,
        headerClassName: 'rowheader'
      })),
    ],
    rows: [
      {
        id: 1,
        planet: 'Degree 1',
        ...['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Rahu', 'Ketu'].reduce((acc, planet, index) => {
          acc[`degree${index + 1}`] = Math.random().toFixed(2); // Replace with actual degree value
          return acc;
        }, {}),
      },
      {
        id: 2,
        planet: 'Degree 2',
        ...['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Rahu', 'Ketu'].reduce((acc, planet, index) => {
          acc[`degree${index + 1}`] = Math.random().toFixed(2); // Replace with actual degree value
          return acc;
        }, {}),
      },
    ],
  };

  const [updateEvent, setUpdateEvent] = useState([]);
  const [openAddEvent, setOpenAddEvent] = useState(false);

  const handleEdit = (element) => {
    var formData = element;
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
      const now = new Date();
      hours = now.getHours();
      minutes = now.getMinutes();
    }

    const eventDate = new Date(year, month, day, hours, minutes);
    console.log(eventDate)
    formData.EventDate = dayjs(new Date(year, month, day, hours, minutes));
    formData.isUpdate = true;
    formData.City = { CityID: formData.CityID, FormattedCity: formData.City };
    formData.Country = { CountryCode: formData.CountryCode, Country: formData.Country };
    // console.log("formData : ", { CityID: formData.CityID, FormattedCity: formData.City })
    // console.log("formData : ", formData.City)
    // console.log("formData : ", formData.CityID)
    // tempdata = formData;
    console.log(formData);
    // setUpdateEvent(formData);
    // handleEventOpen();
  }

  const handleEventClose = () => {
    setOpenAddEvent(false);
  }

  const handleEventOpen = () => {
    setOpenAddEvent(true);
  }

  return (
    <>
      <div className='px-3 flex flex-col gap-3'>
        {AllEventsData && AllEventsData.length
          ? AllEventsData.map((element, index) => (
            <div key={index} className=''>
              {console.log(element)}
              <div className='flex flex-col gap-1'>
                <div className={`text-black font-ea-n px-2 md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col`}>
                  <div className='flex items-center text-xl'>
                    <span className='text-primary font-ea-sb'>{index + 1}. Good</span>

                    <div>
                      <Button className='p-1 min-w-6 w-6 ml-2' onClick={() => handleEdit(element)}><i className='tabler-edit text-black text-[20px]'></i></Button>
                    </div>
                  </div>
                  <div className={`flex items-center`} >
                    <div className='flex flex-col gap-1 chart-date'>
                      {/* <span className='label font-ea-n'>Event Date & Time: </span> */}
                      <span className='value font-ea-sb text-black'>
                        {/* {element?.EventDate} */}
                        <span className='font-ea-n'> {element?.EventTime.substring(0, 2)}:{element?.EventTime.substring(2, 4)}:{(element?.EventTime.substring(4, 6) ? element?.EventTime.substring(4, 6) : '00')},
                        </span>
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      {/* <span className='label font-ea-n'>Place: </span> */}
                      <span className='value font-ea-n'>{element?.City}, {element?.Country}</span>
                    </div>
                  </div>
                </div>
                <div className='p-2 pt-0'>
                  <DataGrid
                    rows={planetData.rows}
                    columns={planetData.columns}
                    pageSize={5}
                    hideFooter={true}
                    disableColumnSorting
                    disableColumnMenu
                    rowHeight={40}
                    columnHeaderHeight={38}
                    disableColumnResize
                    hideFooterPagination={true}
                    showColumnVerticalBorder
                  />
                </div>
              </div>
              <Divider />
            </div>
          ))
          : null
        }
      </div>

      {/* <hr></hr> */}

    </>
  )
}

export default EventCard
