import React from 'react'
import "./PageTitle.css"
import { Grid } from '@mui/material'

function PageTitle({ title, endCmp }) {
  return (
    <>
      <Grid item xs={12} md={12}>
        {/* <div className='justify-between gap-4 PageHeader  xs:flex xs:flex-col md:flex-row md:flex' xs={12} md={12} xl={12}> */}
        <div className='PageHeader w-100 p-4 flex flex-col lg:flex-row gap-3 sm:flex sm:flex-col md:flex-row sm:justify-between xs:items-start xs:flex-col' xs={12} md={12} xl={12}>
          <span className='text-primary font-ea-sb text-2xl text-nowrap'>{title}</span>
          <div className='flex flex-col  items-end justify-end w-full sm:items-center md:justify-end sm:flex sm:flex-row sm:justify-start gap-3 xs:flex xs:flex-col'>
            {endCmp}
          </div>
        </div>
      </Grid>
    </>
  )
}

export default PageTitle
