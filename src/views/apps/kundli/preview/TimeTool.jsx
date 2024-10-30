import { Box, IconButton, MenuItem, Select, Typography, TextField, debounce, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './preview.css';

function TimeTool({ handleDateChange, kundliBirthData, handleTimeTool }) {
  const [datePicker, setDatePicker] = useState(dayjs());
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
        <div className='w-full flex justify-end '>

        <IconButton
          aria-label="close"
          onClick={handleTimeTool} // Replace with your close handler function
          className='text-inherit'
        >
          <i className='tabler-x text-primary'></i>
        </IconButton>
        </div>
        <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap md:flex-nowrap">
          <div className="w-full sm:w-[30%] md:w-[20%] lg:w-[15%]">
            <Select
              id="time-select"
              fullWidth
              defaultValue={"T"}
              sx={{
                height: '2.9rem',
                minHeight: '2.9rem',
              }}
            >
              <MenuItem value="T">Transient</MenuItem>
              <MenuItem value="D">Dasha</MenuItem>
            </Select>
          </div>

          <Button
            variant={timeValue === "D" ? "contained" : "outlined"}
            onClick={() => setTimeValue("D")}
            sx={{
              height: '2.9rem',
              minWidth: 'fit-content',
            }}
          >
            Date
          </Button>
          <Button
            variant={timeValue === "M" ? "contained" : "outlined"}
            onClick={() => setTimeValue("M")}
            sx={{
              height: '2.9rem',
              minWidth: 'fit-content',
            }}
          >
            Month
          </Button>
          <Button
            variant={timeValue === "Y" ? "contained" : "outlined"}
            onClick={() => setTimeValue("Y")}
            sx={{
              height: '2.9rem',
              minWidth: 'fit-content',
            }}
          >
            Year
          </Button>
          <Button
            variant={timeValue === "H" ? "contained" : "outlined"}
            onClick={() => setTimeValue("H")}
            sx={{
              height: '2.9rem',
              minWidth: 'fit-content',
            }}
          >
            Hour
          </Button>
          <Button
            variant={timeValue === "Min" ? "contained" : "outlined"}
            onClick={() => setTimeValue("Min")}
            sx={{
              height: '2.9rem',
              minWidth: 'fit-content',
            }}
          >
            Minute
          </Button>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              openTo="day"
              views={["year", "month", "day", "hours", "minutes"]}
              value={datePicker}
              onChange={(newDate) => setDatePicker(newDate)}
              inputFormat="DD-MM-YYYY HH:mm"
              format='DD-MM-YYYY HH:mm'
              ampm={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    height: '2.5rem',
                    minHeight: '2.5rem',
                    '& .MuiInputBase-root': { height: '2.5rem' },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <IconButton onClick={() => handleArrows("I")} >
            <i className={'tabler-plus bg-primary'} />
          </IconButton>

          <IconButton onClick={() => handleArrows("D")} >
            <i className={'tabler-minus bg-primary'} />
          </IconButton>

        </div>
      </Box>

    </>
  );
}

export default TimeTool;
