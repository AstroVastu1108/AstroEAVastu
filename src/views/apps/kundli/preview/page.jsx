'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PreviewCard from './PreviewCard'

const Preview = ({ kundliData }) => {
  // Handle Print Button Click
  const handleButtonClick = () => {
    window.print()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <PreviewCard kundliData={kundliData} />
      </Grid>
      <Grid item xs={12} md={3}>
        {/* <PreviewActions id={id} onButtonClick={handleButtonClick} /> */}
      </Grid>
    </Grid>
  )
}

export default Preview
