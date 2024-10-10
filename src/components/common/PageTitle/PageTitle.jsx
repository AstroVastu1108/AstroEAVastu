import React from 'react'
import "./PageTitle.css"
import { Grid } from '@mui/material'

function PageTitle({ title, endCmp }) {
  return (
    <>
      <Grid item xs={12} md={12}>
        {/* <div className='justify-between gap-4 PageHeader  xs:flex xs:flex-col md:flex-row md:flex' xs={12} md={12} xl={12}> */}
        <div className='PageHeader w-100 px-0 py-2 flex flex-col gap-3 items-center sm:flex sm:flex-row sm:justify-between' xs={12} md={12} xl={12}>
          <span className='text-primary text-2xl font-semibold text-nowrap '>{title}</span>
            {endCmp}
          {/* <div className='flex justify-end gap-3 sm:flex '>
          </div> */}
        </div>
      </Grid>
      {/* <span className='HeaderTitle'>{title}</span>
      {page} */}
    </>
  )
}

export default PageTitle
