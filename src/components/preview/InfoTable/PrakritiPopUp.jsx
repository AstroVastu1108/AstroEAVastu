import { Box, Button, Checkbox, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

function PrakritiPopUp({ open, handlePraClose }) {

  const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
          cell: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
          columnHeaders: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
          toolbar: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
        },
      },
    },
  });


  const prakritiData = {
    "observations": [
      {
        "name": "Body Size",
        "options": {
          "vata": "Slim",
          "pitta": "Medium",
          "kapha": "Large"
        }
      },
      {
        "name": "Body Weight",
        "options": {
          "vata": "Low",
          "pitta": "Medium",
          "kapha": "Overweight"
        }
      },
      {
        "name": "Skin Texture",
        "options": {
          "vata": "Dry, rough",
          "pitta": "Soft, oily",
          "kapha": "Thick, oily"
        }
      },
      {
        "name": "Hair Type",
        "options": {
          "vata": "Dry, thin",
          "pitta": "Oily, fine",
          "kapha": "Thick, wavy"
        }
      },
      {
        "name": "Appetite",
        "options": {
          "vata": "Irregular, low",
          "pitta": "Strong, intense",
          "kapha": "Steady, moderate"
        }
      },
      {
        "name": "Thirst",
        "options": {
          "vata": "Variable",
          "pitta": "Excessive",
          "kapha": "Moderate"
        }
      },
      {
        "name": "Sleep",
        "options": {
          "vata": "Light, interrupted",
          "pitta": "Moderate, sound",
          "kapha": "Heavy, deep"
        }
      },
      {
        "name": "Energy Levels",
        "options": {
          "vata": "Variable, low",
          "pitta": "Moderate, consistent",
          "kapha": "High, steady"
        }
      },
      {
        "name": "Temperament",
        "options": {
          "vata": "Anxious, nervous",
          "pitta": "Irritable, aggressive",
          "kapha": "Calm, stable"
        }
      },
      {
        "name": "Memory",
        "options": {
          "vata": "Short-term, forgetful",
          "pitta": "Sharp, focused",
          "kapha": "Slow, but good long-term memory"
        }
      },
      {
        "name": "Digestion",
        "options": {
          "vata": "Irregular, gas",
          "pitta": "Strong, quick",
          "kapha": "Slow, steady"
        }
      },
      {
        "name": "Physical Activity",
        "options": {
          "vata": "Quick, erratic",
          "pitta": "Moderate, intense",
          "kapha": "Slow, steady"
        }
      },
      {
        "name": "Speech",
        "options": {
          "vata": "Fast, unclear",
          "pitta": "Sharp, clear",
          "kapha": "Slow, measured"
        }
      },
      {
        "name": "Body Temperature",
        "options": {
          "vata": "Cold, dry",
          "pitta": "Warm, hot",
          "kapha": "Cool, moist"
        }
      }
    ]
  };

  const columns = [
    {
      field: 'name',
      headerName: '',
      width: 150,
      minWidth: 150,
      align: "end",
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <span variant="h6">{params.value}</span>
      )
    },
    {
      field: 'vata',
      headerName: 'Vata',
      // width: 150,
      minWidth: 150,
      headerClassName: 'rowheader',
      flex: 1,
      renderCell: (params) => {
        return (
          <FormControlLabel
            label={params.row.vata}
            control={
              <Checkbox
                // value={observation.options.vata}
                onChange={(event) => handleCheck(event, params.row.namee, 'vata')}
              />
            }
          />

        )
      }
    },
    {
      field: 'pitta',
      headerName: 'Pitta',
      flex: 1,
      // width: 150,
      minWidth: 150,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.pitta}
          control={
            <Checkbox
              // value={observation.options.vata}
              onChange={(event) => handleCheck(event, params.row.namee, 'pitta')}
            />
          }
        />
      )
    },
    {
      field: 'kapha',
      headerName: 'Kapha',
      flex: 1,
      // width: 150,
      minWidth: 150,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.kapha}
          control={
            <Checkbox
              // value={observation.options.vata}
              onChange={(event) => handleCheck(event, params.row.namee, 'kapha')}
            />
          }
        />
      )
    }
  ];

  const rows = prakritiData.observations.map((observation, index) => ({
    id: index,
    name: observation.name,
    vata: observation.options.vata,
    pitta: observation.options.pitta,
    kapha: observation.options.kapha
  }));

  // State to track the checked items
  const [selectedOptions, setSelectedOptions] = useState({});

  // Function to handle checkbox toggle
  const handleCheck = (observation, optionType) => (event) => {
    const { checked } = event.target;

    // Update the selected options based on the checked state
    setSelectedOptions((prevState) => {
      const currentSelection = { ...prevState };
      if (!currentSelection[observation.name]) {
        currentSelection[observation.name] = {};
      }

      currentSelection[observation.name][optionType] = checked;

      return currentSelection;
    });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Selected options:", selectedOptions);
    // Submit the selectedOptions to wherever you need
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={handlePraClose}
        maxWidth="md"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
        fullWidth={true}  // Ensures the dialog takes up full width of the container
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            // console.log("submit")
            // handleSubmit();
          },
          // sx: {
          //   width: '650px', // Custom width
          //   maxWidth: '100%', // Ensures it doesn't exceed the viewport width
          // },
          sx: {
            '& .MuiDialogActions-root': {
              padding: '0px'
            },
            '& .MuiDialogContent-root': {
              padding: '0px'
            }
          }
        }}
      >
        <DialogTitle className="PopupHeader bg-[var(--secondary-color)] text-primary p-4">
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              Prakriti Assessment Questions
            </span>
            <IconButton
              aria-label="close"
              onClick={handlePraClose} // Replace with your close handler function
              className='text-primary'
            >
              <i className='tabler-x'></i>
            </IconButton>
          </div>
          <DialogContentText className="text-primary">
            Enter the required information for prakriti.
          </DialogContentText>
        </DialogTitle>
        <DialogContent className=' flex justify-center'>
          <Box width={"100%"}
            className="py-4"
            sx={{
              '& .MuiDataGrid-root': {
                borderRadius: 0, // Remove border radius
                borderLeft: '0px',
                borderRight: '0px',
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#ffffff', // Light color for odd rows
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#f5f5f5', // White color for even rows
              },
              '& .MuiDataGrid-row:hover': {
                color: 'var(--primary-color) !important',
                backgroundColor: 'var(--secondary-soft-color) !important',
              },
              '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                color: 'white', // Change to your desired color
              },
              '& .MuiDataGrid-columnHeader--withRightBorder': {
                borderRightWidth: '0px !important'
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none !important'
              },
              '& .Mui-selected': {
                backgroundColor: 'var(--secondary-color) !important'
              },
              '& .MuiDataGrid-columnHeader': {
                cursor: 'default !important', // Change to your desired color
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none !important'
              },
              // '& .MuiDataGrid-scrollbar--vertical': {
              //   display: 'none'
              // },
              // '& .MuiDataGrid-scrollbarFiller--header': {
              //   display: 'none'
              // }
            }}
          >
            <ThemeProvider theme={customTheme}>
              <DataGrid
                showCellVerticalBorder
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection={false}
                disableSelectionOnClick
                hideFooter={true}
                disableColumnSorting
                disableColumnMenu
                rowHeight={45}
                columnHeaderHeight={45}
                disableColumnResize
                disableRowSelectionOnClick
                hideFooterPagination={true}
              />
            </ThemeProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <div className='p-4'>
          <Button variant='contained' type='submit' disabled={false} >
            Save
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handlePraClose}>Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PrakritiPopUp
