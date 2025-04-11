import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function PrakritiPopUp({ open, handlePraClose }) {

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

  useEffect(() => {
    const storedOptions = localStorage.getItem('prakritiSelections');
    if (storedOptions) {
      setSelectedOptions(JSON.parse(storedOptions));
    }
  }, []);

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
      headerName: (
        <>
          Air <span className="planet-col-title-small">(Vata)</span>
        </>
      ),
      // headerName: 'Vata (Air)',
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          className='prakritiLabel'
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
      // headerName: 'Pitta (Fire)',
      headerName: (
        <>
          Fire <span className="planet-col-title-small">(Pitta)</span>
        </>
      ),
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.pitta}
          className='prakritiLabel'
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
      // headerName: 'Kapha (Water)',
      headerName: (
        <>
          Water <span className="planet-col-title-small">(Kapha)</span>
        </>
      ),
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <FormControlLabel
          label={params.row.kapha}
          className='prakritiLabel'
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

  const handleSave = () => {
    localStorage.setItem('prakritiSelections', JSON.stringify(selectedOptions));
    // console.log('Saved options:', selectedOptions);
    // Calculate checked counts
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(selectedOptions).forEach((options) => {
      Object.keys(counts).forEach((key) => {
        if (options[key]) counts[key]++;
      });
    });

    const prakritiElements = {
      vata: 'Air',
      pitta: 'Fire',
      kapha: 'Water',
    };

    // Sort and create the string in descending order
    const sortedTypes = Object.entries(counts)
      .sort(([, a], [, b]) => b - a) // Sort descending
      .map(([type]) => prakritiElements[type]);
    const resultString = sortedTypes.join('-');

    handlePraClose(); // Close the popup
  };

  return (
    <Dialog open={open} onClose={handlePraClose} maxWidth="md" fullWidth>
      <DialogTitle className="PopupHeader text-white p-3">
        <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-primary text-2xl font-ea-sb !pl-3'>
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
        <Box>
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
        </Box>
      </DialogContent>
      <DialogActions className='p-0'>
        <div className='p-4'>
          {/* <Button variant='contained' type='submit' disabled={false} onClick={() => console.log(selectedOptions)} > */}
          <Button variant='contained' type='submit' disabled={false} onClick={handleSave} >
            Save
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handlePraClose}>Cancel</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default PrakritiPopUp;
