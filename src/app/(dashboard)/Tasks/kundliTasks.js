'use client'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import Listing from '@/views/apps/clients/clientTasks/listing/tasksListing'
import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'

function KundliTasksMain() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-0'>
              <PageTitle title={'Task List'} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={6} className='mt-2'>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-5'>
              <Listing cid='' from='Tasks' />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default KundliTasksMain
