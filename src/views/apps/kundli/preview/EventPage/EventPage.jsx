import React from 'react'
import EventPreview from './EventPreview'
import { Card, CardContent, Grid } from '@mui/material'

function KundaliEVent({kundliData}) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent className='flex flex-col p-0'>

            <div className='flex justify-center'>
              {kundliData &&
                <>
                  <EventPreview kundliData={kundliData}  />
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
