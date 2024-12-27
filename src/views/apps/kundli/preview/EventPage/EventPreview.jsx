import { LoadingButton } from '@mui/lab';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { useState } from 'react'
import EventCard from './EventCard';
import Event from '@/components/preview/Event/Event';

function EventPreview({ kundliData }) {
  const BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  const JaiminiCharKarakas = kundliData?.AstroVastuReport?.JaiminiCharKarakas;
  const [openEvent, setOpenEvent] = useState(false);

  const handleEventClose = () => {
    setOpenEvent(false);
  }

  const handleEventOpen = () => {
    // handleClose();
    setOpenEvent(true);
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
              {/* <div className='flex justify-end'>
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
                    <MenuItem onClick={handleEventOpen} className="flex gap-1"><i className={'tabler-browser-check me-2'} />Events</MenuItem>
                    <MenuItem onClick={handleJCK} className="flex gap-1"><i className={'tabler-aspect-ratio me-2'} />Jaimini Char Karakas</MenuItem>
                    <MenuItem onClick={handleNTC} className="flex gap-1"><i className={'tabler-jewish-star me-2'} />NavTara Chakra</MenuItem>
                    <MenuItem onClick={handleIsPraOpen} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Prakriti</MenuItem>

                    <MenuItem onClick={handleMenuTimeTool} className="flex gap-1"><i className={'tabler-calendar-share me-2'} />TimeTool</MenuItem>
                    <MenuItem className="flex gap-1"><i className={'tabler-calendar-share me-2'} />Transit Analysis</MenuItem>
                    <Divider />
                    <MenuItem onClick={saveKundaliDateTime} className="flex gap-1"><i className={'tabler-copy-plus me-2'} />Save Kundali</MenuItem>
                    <MenuItem onClick={handleMenuDownload} className="flex gap-1"><i className={'tabler-download me-2'} />Download</MenuItem>
                  </Menu>
                </>
              </div> */}
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
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
            <EventCard BirthDetails={BirthDetails} JaiminiCharKarakas={JaiminiCharKarakas} />
          </div>
        </Grid>
      </Grid>
      {openEvent && <Event setEventValue={""} open={openEvent} handleClose={handleEventClose} JaiminiCharKarakasData={JaiminiCharKarakas} />}
      </>
  )
}

export default EventPreview
