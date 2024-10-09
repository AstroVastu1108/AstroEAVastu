import { Box, IconButton, MenuItem, Select, Typography, TextField, debounce } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './preview.css';

function TimeTool({handleDateChange, kundliBirthData}) {
  const [datePicker, setDatePicker] = useState(dayjs(new Date()));
  const [timeValue, setTimeValue] = useState("Y"); // "Y" for year, "M" for month, etc.

  useEffect(() => {
    if (kundliBirthData?.Date && kundliBirthData?.Time) {
      // Extract date and time from the object
      const { Date: birthDate, Time: birthTime } = kundliBirthData;

      // Convert date and time into a format that dayjs can understand
      const formattedDate = dayjs(`${birthDate} ${birthTime}`, 'DD-MM-YYYY HHmm');

      // Set the datePicker state with the parsed date and time
      setDatePicker(formattedDate);
    }
  }, [kundliBirthData]);

  // Increment or decrement the date based on the selected unit
  const handleArrows = (direction) => {
    const increment = direction === 'I' ? 1 : -1;
    let newDate = datePicker;

    switch (timeValue) {
      case 'Y': // Year
        newDate = datePicker.add(increment, 'year');
        break;
      case 'M': // Month
        newDate = datePicker.add(increment, 'month');
        break;
      case 'D': // Day
        newDate = datePicker.add(increment, 'day');
        break;
      case 'H': // Hour
        newDate = datePicker.add(increment, 'hour');
        break;
      case 'Min': // Minute
        newDate = datePicker.add(increment, 'minute');
        break;
      case 'S': // Second
        newDate = datePicker.add(increment, 'second');
        break;
      default:
        break;
    }

    setDatePicker(newDate); // Update the state with the new date
  };

  const handleTimeValueChange = (e) => {
    setTimeValue(e.target.value);
  };

  const getNewData = debounce(async (query) => {
    handleDateChange(datePicker)
  }, 500)

  // Use effect to fetch cities when the query changes
  useEffect(() => {
    getNewData(datePicker)
    return () => {
      getNewData.clear();
    };
  }, [datePicker])


  return (
    <>
      <Box className="timeTool-div" sx={{ boxShadow: 3 }}>
        <Typography variant="h6">Time Tool</Typography>
        <div className="flex items-center">
          <Select
            id="time-select"
            value={timeValue}
            fullWidth
            onChange={handleTimeValueChange}
          >
            <MenuItem value="Y">Year</MenuItem>
            <MenuItem value="M">Month</MenuItem>
            <MenuItem value="D">Day</MenuItem>
            <MenuItem value="H">Hour</MenuItem>
            <MenuItem value="Min">Minute</MenuItem>
            {/* <MenuItem value="S">Second</MenuItem> */}
          </Select>

          <div>
            <IconButton onClick={() => handleArrows("I")}>
              <i className={'tabler-plus bg-primary'} />
            </IconButton>
          </div>

          <div>
            <IconButton onClick={() => handleArrows("D")}>
              <i className={'tabler-minus bg-primary'} />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="date-field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // disableFuture
                openTo="day"
                views={["year", "month", "day", "hours", "minutes"]}
                value={datePicker}
                // maxDate={dayjs(new Date())}
                onChange={(newDate) => {
                  setDatePicker(newDate);
                }}
                inputFormat="DD-MM-YYYY HH:mm"
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </Box>
    </>
  );
}

export default TimeTool;
