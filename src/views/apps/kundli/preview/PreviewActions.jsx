// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { LoadingButton } from '@mui/lab'

// Component Imports

const PreviewActions = ({ value, onButtonClick, icon,loading }) => {
  return (
    <>
      {/* <Card>
        <CardContent className='flex flex-col gap-4'> */}
         <LoadingButton
          variant='contained'
          sx={{ width: '180px', textTransform:'none' }}
          onClick={onButtonClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<i className={icon} />}
          className='lg:w-3/12 md:w-4/12 sm:4/12'
        >
          {value}
        </LoadingButton>
        {/* <Button
            // fullWidth
            variant='contained'
            className='capitalize'
            startIcon={<i className={icon} />}
            onClick={onButtonClick}
          >
            {value}
          </Button> */}
        {/* </CardContent>
      </Card> */}
      </>
  )
}

export default PreviewActions
