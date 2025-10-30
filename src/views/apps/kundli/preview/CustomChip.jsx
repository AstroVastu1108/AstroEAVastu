import { Box } from '@mui/material'
import React from 'react'

function CustomChip({ label, value }) {
  return (
    <Box className='py-[6px] px-2 rounded-md bg-[#f5f5f5] text-sm flex items-center gap-1'>
        <span className='text-primary font-ea-sb text-sm'>{label}</span>
        {value != "" && <span className='text-[#000000] font-ea-n text-sm'>{value}</span>}
    </Box>
  )
}

export default CustomChip