import { Box, IconButton, MenuItem, Select, Typography, TextField, debounce, Button, Grid } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './preview.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function TimeTool({ handleDateChange, kundliBirthData, handleTimeTool, handleTimeToolOptChange, datePicker, setDatePicker, TimeToolOpt, isTransit }) {
  const [timeValue, setTimeValue] = useState("Y"); // "Y" for year, "M" for month, etc.

  console.log("timetool opt:", TimeToolOpt);
  console.log("isTransit:", isTransit);

  useEffect(() => {
    if (TimeToolOpt == "B") {
      if (kundliBirthData?.BirthDate && kundliBirthData?.BirthTime) {
        // Extract date and time from the object
        const { BirthDate: birthDate, BirthTime: birthTime } = kundliBirthData;

        // Convert date and time into a format that dayjs can understand
        const formattedDate = dayjs(`${birthDate} ${birthTime}`, 'DD-MM-YYYY HHmmss');

        // Set the datePicker state with the parsed date and time
        setDatePicker(formattedDate);
      }
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
    // getNewData(newDate);

  };

  const getNewData = debounce(async (newDate) => {
    handleDateChange(newDate)
    return () => {
      getNewData.clear();
    };
  }, 20)

  useEffect(() => {
    getNewData(datePicker);
    return () => {
      getNewData.clear();
    };
  }, [datePicker])

  return (
    <>

      {/* <Box className="timeTool-div bg-[#f3dea5] shadow-lg shadow-white  lg:w-[calc(100%-75px)] md:w-[calc(100%-0px)] sm:w-[calc(100%-0px)] border-primary border-t-[5px] flex flex-row-reverse justify-between "> */}
      <Box className="timeTool-div bg-[#f3dea5] lg:w-[calc(100%-75px)] md:w-[calc(100%-0px)] sm:w-[calc(100%-0px)] border-primary border-t-[5px] flex flex-row-reverse justify-between"
      sx={{
        boxShadow: "0px -4px 6px rgba(255, 255, 255, 0.2)"
      }}>

        <div className='w-[5%] flex justify-end items-start'>
          <IconButton
            aria-label="close"
            onClick={handleTimeTool} // Replace with your close handler function
            className='text-inherit'
          >
            <i className='tabler-x text-primary'></i>
          </IconButton>
        </div>
        <div className="flex items-center gap-3 pt-2 flex-wrap lg:flex-nowrap">
          {/* <div className='flex items-center justify-center border border-1'> */}
          <div className='text-primary font-ea-sb chart-title flex items-center justify-center p-0'><i className={'tabler-calendar-share me-2'} /> Time Tool</div>
          {/* </div> */}
          <div className="w-full sm:w-[25%] md:w-[30%] lg:w-[12%]">
            <Select
              id="time-select"
              fullWidth
              defaultValue={"B"}
              sx={{
                height: '2.5rem',
                minHeight: '2.5rem',
              }}
              onChange={handleTimeToolOptChange}
              value={isTransit == "T" ? TimeToolOpt : "B"}
            >
              <MenuItem value="B">Birth Chart</MenuItem>
              {isTransit == "T" && <MenuItem value="T">Transit Chart</MenuItem>}
            </Select>
          </div>

          <Button
            variant={timeValue === "Y" ? "contained" : "outlined"}
            onClick={() => setTimeValue("Y")}
            sx={{
              height: '2.5rem',
              minWidth: 'fit-content',
            }}
          >
            Year
          </Button>


          <Button
            variant={timeValue === "M" ? "contained" : "outlined"}
            onClick={() => setTimeValue("M")}
            sx={{
              height: '2.5rem',
              minWidth: 'fit-content',
            }}
          >
            Month
          </Button>

          <Button
            variant={timeValue === "D" ? "contained" : "outlined"}
            onClick={() => setTimeValue("D")}
            sx={{
              height: '2.5rem',
              minWidth: 'fit-content',
            }}
          >
            Day
          </Button>

          <Button
            variant={timeValue === "H" ? "contained" : "outlined"}
            onClick={() => setTimeValue("H")}
            sx={{
              height: '2.5rem',
              minWidth: 'fit-content',
            }}
          >
            Hour
          </Button>

          <Button
            variant={timeValue === "Min" ? "contained" : "outlined"}
            onClick={() => setTimeValue("Min")}
            sx={{
              height: '2.5rem',
              minWidth: 'fit-content',
            }}
          >
            Minute
          </Button>

          <Button
            variant={timeValue === "S" ? "contained" : "outlined"}
            onClick={() => setTimeValue("S")}
            sx={{
              height: '2.5rem',
              minWidth: 'fit-content',
            }}
          >
            Second
          </Button>

          <div className="w-full sm:w-[25%] md:w-[40%] lg:w-[20%]">

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                openTo="day"
                // className="w-[225px]"
                // className="w-full sm:w-[25%] md:w-[40%] lg:w-[18%]"
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                value={datePicker}
                onChange={(newDate) => handleDateChange(newDate)}
                inputFormat="DD-MM-YYYY HH:mm:ss"
                format='DD-MM-YYYY HH:mm:ss'
                ampm={false}
                sx={{
                  height: '2.5rem',
                  minHeight: '2.5rem',
                  '& .MuiInputBase-root': { height: '2.5rem' },
                }}
                DialogProps={{
                  PaperProps: {
                    sx: { '& .MuiDialogActions-root': { display: 'none !important' } }, // Hide the action buttons
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      height: '2.5rem',
                      minHeight: '2.5rem',
                      '& .MuiInputBase-root': { height: '2.5rem' },
                    }}
                    className="w-[75%]"
                  // className="w-full sm:w-[25%] md:w-[40%] lg:w-[18%]"
                  />
                )}
              />
            </LocalizationProvider>
          </div>

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
