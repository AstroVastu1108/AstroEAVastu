import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function Event({eventValue,setEventValue,eventData}) {
  return (
    <>
      <FormControl className='w-[33%] mb-2'>
        <InputLabel id="event-label">Select Event</InputLabel>
        <Select
          labelId="event-label"
          id="event"
          label="Select Event"
          onChange={(e) => { setEventValue(e.target.value) }}
          defaultValue={eventValue}
          value={eventValue && eventValue}
          sx={{ height: '2.9rem !important', minHeight: '1rem !important' }}
        >
          <MenuItem value="E1">Event1</MenuItem>
          <MenuItem value="E2">Event2</MenuItem>
          <MenuItem value="E3">Event3</MenuItem>
          <MenuItem value="E4">Event4</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default Event
