import React from 'react'
import EventPreview from './EventPreview'
import { Card, CardContent, Grid } from '@mui/material'

function KundaliEVent({EventsData}) {
  const BirthDetails = EventsData?.BirthDetails;
  const AllEvents = EventsData?.EventList;
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent className='flex flex-col p-0'>

            <div className='flex justify-center'>
              {EventsData &&
                <>
                  <EventPreview EventsData={EventsData}  />
                </>
              }
            </div>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default KundaliEVent
