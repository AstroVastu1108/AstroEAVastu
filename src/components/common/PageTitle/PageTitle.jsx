import React from 'react'
import "./PageTitle.css"
import { Grid } from '@mui/material'

function PageTitle({ title, endCmp }) {
  return (
    <>
      <Grid item xs={12} md={12}>
        {/* <div className='justify-between gap-4 PageHeader  xs:flex xs:flex-col md:flex-row md:flex' xs={12} md={12} xl={12}> */}
        <div className='PageHeader px-5 py-6 flex flex-col gap-3 sm:flex sm:flex-row sm:justify-between' xs={12} md={12} xl={12}>
          <span className='HeaderTitle'>{title}</span>
          <div className='flex justify-end gap-3 sm:flex '>
            {endCmp}
          </div>
        </div>
      </Grid>
      {/* <span className='HeaderTitle'>{title}</span>
      {page} */}
    </>
  )
}

export default PageTitle
