import React from 'react'
import "./PageTitle.css"
import { Grid } from '@mui/material'

function PageTitle({ title, endCmp }) {
  return (
    <>
      <Grid item xs={12} md={12}>
        <div className='flex justify-between gap-4 PageHeader px-5 py-6' xs={12} md={12} xl={12}>
          <span className='HeaderTitle'>{title}</span>
          <div className='flex gap-3'>
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
