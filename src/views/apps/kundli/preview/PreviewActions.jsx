// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Component Imports

const PreviewActions = ({ value, onButtonClick }) => {

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-4'>
        <Button
            fullWidth
            variant='contained'
            className='capitalize'
            startIcon={<i className='tabler-download' />}
            onClick={onButtonClick}
          >
            {value}
          </Button>
          {/* <div className='flex items-center gap-4'>
            <Button fullWidth color='secondary' variant='tonal' className='capitalize' onClick={onButtonClick}>
              Print
            </Button>
            
          </div> */}
        </CardContent>
      </Card>
      </>
  )
}

export default PreviewActions
