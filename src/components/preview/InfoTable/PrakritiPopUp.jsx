import React, { useState } from 'react';
import { Box, Button, Checkbox, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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

  // State to track checkbox selections
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheck = (name, optionType) => (event) => {
    const { checked } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: { ...prev[name], [optionType]: checked },
    }));
  };

  const columns = [
    {
      field: 'name', headerName: '', width: 150, align: 'end',
      headerClassName: 'rowheader',

    },
    {
      field: 'vata',
      headerName: 'Vata',
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.vata}
          control={
            <Checkbox
              checked={selectedOptions[params.row.name]?.vata || false}
              onChange={handleCheck(params.row.name, 'vata')}
            />
          }
        />
      ),
    },
    {
      field: 'pitta',
      headerName: 'Pitta',
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.pitta}
          control={
            <Checkbox
              checked={selectedOptions[params.row.name]?.pitta || false}
              onChange={handleCheck(params.row.name, 'pitta')}
            />
          }
        />
      ),
    },
    {
      field: 'kapha',
      headerName: 'Kapha',
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.kapha}
          control={
            <Checkbox
              checked={selectedOptions[params.row.name]?.kapha || false}
              onChange={handleCheck(params.row.name, 'kapha')}
            />
          }
        />
      ),
    },
  ];

  const rows = prakritiData.observations.map((observation, index) => ({
    id: index,
    name: observation.name,
    vata: observation.options.vata,
    pitta: observation.options.pitta,
    kapha: observation.options.kapha,
  }));

  return (
    <Dialog open={open} onClose={handlePraClose} maxWidth="md" fullWidth>
      <DialogTitle className="PopupHeader text-white p-3">
        <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-primary text-2xl font-semibold !pl-3'>
            Prakriti Assessment Questions
          </span>
          <IconButton
            aria-label="close"
            onClick={handlePraClose} // Replace with your close handler function
            sx={{
              color: 'white',
            }}
          >
            <i className='tabler-x text-primary'></i>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className='p-0'>
        <Box sx={{
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            background: 'var(--primary-color)'
          },
          '& .MuiDataGrid-root': {
            borderRadius: 0, // Remove border radius
            border: '0px'
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
            backgroundColor: '#99e27b65 !important'
          },
          '& .MuiDataGrid-columnHeader': {
            cursor: 'default !important', // Change to your desired color
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important'
          },
          '& .MuiSvgIcon-root':{
            height:"0.7em !important",
            width:"0.7em !important"
          },
          '& .MuiFormControlLabel-label':{
            fontFamily: 'Segoe UI, Arial, sans-serif',
            fontSize: '14px'
          }
        }}>
          <ThemeProvider theme={customTheme}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              hideFooter
              rowHeight={30}
              columnHeaderHeight={38}
              disableColumnSorting
              disableColumnMenu
              showCellVerticalBorder
            />
          </ThemeProvider>
        </Box>
      </DialogContent>
      <DialogActions className='p-0'>
        <div className='p-4'>
          <Button variant='contained' type='submit' disabled={false} onClick={() => console.log(selectedOptions)} >
            Save
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handlePraClose}>Cancel</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default PrakritiPopUp;
