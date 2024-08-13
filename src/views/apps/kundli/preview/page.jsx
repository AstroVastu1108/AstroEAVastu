'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

const Preview = ({ kundliData }) => {
  // Handle Print Button Click
  const handleButtonClick = () => {
    window.print()
  }

  return (
    <Grid container spacing={6}>
       <Grid item xs={12} md={12}>
        <div className='flex justify-end'>
          <PreviewActions onButtonClick={handleButtonClick} />
        </div>
      </Grid>
      <Grid item xs={12} md={12}>
        <PreviewCard kundliData={kundliData} />
      </Grid>
    </Grid>
  )
}

export default Preview
