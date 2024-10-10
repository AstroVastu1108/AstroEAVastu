import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

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

  const columns = [
    {
      field: 'name',
      headerName: '',
      width: 150,
      minWidth:150,
      align:"end",
      renderCell: (params) => (
        <span variant="h6">{params.value}</span>
      )
    },
    {
      field: 'vata',
      headerName: 'Vata',
      // width: 150,
      minWidth:150,
      headerClassName: 'rowheader',
      flex:1,
      renderCell: (params) => {

        console.log(params)
        return(
        <FormControlLabel
          label={params.row.vata}
          control={
            <Checkbox
              // value={observation.options.vata}
              onChange={(event) => handleCheck(event, params.row.namee, 'vata')}
            />
          }
        />

      )}
    },
    {
      field: 'pitta',
      headerName: 'Pitta',
      flex:1,
      // width: 150,
      minWidth:150,
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
      flex:1,
      // width: 150,
      minWidth:150,
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
    console.log("Selected options:", selectedOptions);
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
            console.log("submit")
            // handleSubmit();
          },
          // sx: {
          //   width: '650px', // Custom width
          //   maxWidth: '100%', // Ensures it doesn't exceed the viewport width
          // },
        }}
      >
        <DialogTitle className="PopupHeader bg-primary text-white p-4">
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              Prakriti Assessment Questions
            </span>
            <IconButton
              aria-label="close"
              onClick={handlePraClose} // Replace with your close handler function
              sx={{
                color: 'white',
              }}
            >
              <i className='tabler-x'></i>
            </IconButton>
          </div>
          <DialogContentText className="text-white">
            Enter the required information for prakriti.
          </DialogContentText>
        </DialogTitle>
        <DialogContent className=' flex justify-center'>
          <Grid className=' flex justify-center mt-4' container>

            {/* <div style={{ maxHeight: '400px', overflowY: 'auto' }}> */}

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection={false}
              disableSelectionOnClick
              hideFooter={true}
              disableColumnSorting
              disableColumnMenu
              rowHeight={50}
              columnHeaderHeight={55}
              disableColumnResize
              disableRowSelectionOnClick
              hideFooterPagination={true}
            />
            {/* </div> */}

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit' disabled={false} >
            Save
          </Button>
          {/* <Button variant='contained' type='submit' disabled={isDisable} >
            {isDisable ? <>
              <CircularProgress size={14} aria-label="Wait" />
              <span style={{ marginLeft: 8 }}>Saving</span>
            </> : 'Save'}
          </Button> */}

          <Button variant='contained' className='bg-secondary' onClick={handlePraClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PrakritiPopUp
