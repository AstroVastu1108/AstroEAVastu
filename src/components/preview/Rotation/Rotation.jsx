import { ThemeProvider } from '@emotion/react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

function Rotation({ open, handleClose, rotationType, hanldeRotationChange }) {

  const [selectedRowsTable1, setSelectedRowsTable1] = useState([]);
  const [selectedRowsTable2, setSelectedRowsTable2] = useState([]);
  const [selectedRowsTable3, setSelectedRowsTable3] = useState([]);
  const [selectedRowsTable4, setSelectedRowsTable4] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const planetClass = {
    ketu: "ketu",
    venus: "venus",
    sun: "sun",
    moon: "moon",
    mars: "mars",
    rahu: "rahu",
    jupiter: "jupiter",
    saturn: "saturn",
    mercury: "mercury",
    uranus: "uranus",
    neptune: "neptune",
    pluto: "pluto"
  };

  const shorthandMap = {
    Ke: planetClass.ketu,
    Ve: planetClass.venus,
    Su: planetClass.sun,
    Mo: planetClass.moon,
    Ma: planetClass.mars,
    Ra: planetClass.rahu,
    Ju: planetClass.jupiter,
    Sa: planetClass.saturn,
    Me: planetClass.mercury,
    Ur: planetClass.uranus,
    Ne: planetClass.neptune,
    Pl: planetClass.pluto
  };

  const highlightText = (value, tb) => {
    const abbreviation = value.trim().slice(0, 2);
    const fullName = shorthandMap[abbreviation];

    return (
      <div onClick={(e) => setSelectedRow({ value, "table": tb, "formattedStr": value })} className={`pl-${fullName} planetName`} key={abbreviation}>
        {value}
      </div>
    );
  };

  const houseText = (value, tb) => {
    const houseValue = value.split(" ")[1];
    return (
      <div onClick={(e) => setSelectedRow({ "value": houseValue, "table": tb, "formattedStr": value })}>
        {value}
      </div>
    );
  };

  const PHData1 =
    [
      { "house": "House 1", "planet": "Ketu" },
      { "house": "House 2", "planet": "Venus" },
      { "house": "House 3", "planet": "Sun" },
      { "house": "House 4", "planet": "Moon" },
      { "house": "House 5", "planet": "Mars" },
      { "house": "House 6", "planet": "Rahu" }
    ];
  const PHData2 =
    [
      { id: 7, house: 'House 7', planet: 'Jupiter' },
      { id: 8, house: 'House 8', planet: 'Saturn' },
      { id: 9, house: 'House 9', planet: 'Mercury' },
      { id: 10, house: 'House 10', planet: 'Uranus' },
      { id: 11, house: 'House 11', planet: 'Neptune' },
      { id: 12, house: 'House 12', planet: 'Pluto' },
    ];

  const columns1 = [
    {
      field: 'house', headerName: 'From House', flex: 1, headerClassName: 'rowheader',
      renderCell: (params) => {
        return houseText(params.value, "t1");
      },
    },
  ];
  const columns2 = [
    {
      field: 'house', headerName: '', flex: 1, headerClassName: 'rowheader',
      renderCell: (params) => {
        return houseText(params.value, "t2");
      },
    },
  ];
  const columns3 = [
    {
      field: 'planet', headerName: 'From Planet', flex: 1, headerClassName: 'rowheader',
      renderCell: (params) => {
        return highlightText(params.value, "t3")
      },
    }
  ];
  const columns4 = [
    {
      field: 'planet', headerName: '', flex: 1, headerClassName: 'rowheader',
      renderCell: (params) => {
        return highlightText(params.value, "t4")
      },
    }
  ];

  const handleRowSelection = (table, params) => {
    // setSelectedRow({ table, params })
    if (table === 'table1') {
      setSelectedRowsTable1([params.id]);
      setSelectedRowsTable2([]); // Clear selection of table 2
      setSelectedRowsTable3([]); // Clear selection of table 2
      setSelectedRowsTable4([]); // Clear selection of table 2
    } else if (table === 'table2') {
      setSelectedRowsTable2([params.id]);
      setSelectedRowsTable1([]); // Clear selection of table 1
      setSelectedRowsTable4([]); // Clear selection of table 1
      setSelectedRowsTable3([]); // Clear selection of table 1
    } else if (table === 'table3') {
      setSelectedRowsTable3([params.id]);
      setSelectedRowsTable1([]); // Clear selection of table 1
      setSelectedRowsTable2([]); // Clear selection of table 1
      setSelectedRowsTable4([]); // Clear selection of table 1
    } else if (table === 'table4') {
      setSelectedRowsTable4([params.id]);
      setSelectedRowsTable1([]); // Clear selection of table 1
      setSelectedRowsTable2([]); // Clear selection of table 1
      setSelectedRowsTable3([]); // Clear selection of table 1
    }
  };

  const onSave = () => {
    const payload = {
      "IsRotate": true,
      "RotateType": rotationType,
      "RotateFrom": selectedRow?.value,
      "formattedStr":selectedRow?.formattedStr
    }
    hanldeRotationChange(payload);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      PaperProps={{
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
      <DialogTitle className="PopupHeader text-white p-3">
        <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-primary text-2xl font-ea-sb !pl-3'>
            Rotate Chart
          </span>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: 'white',
            }}
          >
            <i className='tabler-x text-primary'></i>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className=' flex justify-center'>
        <Box
          width={"25%"}
          className="flex"
          sx={{
            '& .MuiDataGrid-root': {
              borderRadius: 0, // Remove border radius
              borderLeft: '0px',
              borderRight: '0px',
              borderTop: '0px !important',
              borderBottom: '0px !important'
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'var(--primary-color) !important',
              backgroundColor: 'var(--secondary-soft-color) !important',
            },
            '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
              color: 'white', // Change to your desired color
            },
            '& .MuiDataGrid-cell': {
              lineHeight: '30px !important'
            },
            '& .MuiDataGrid-columnHeader--withRightBorder': {
              borderRightWidth: '0px !important'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important'
            },
            '& .MuiDataGrid-columnHeader': {
              cursor: 'default !important', // Change to your desired color
              borderBottom: 'none !important',
              borderTop: 'none !important'
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none !important'
            },
            '& .Mui-selected': {
              backgroundColor: selectedRowsTable1.length ? '#99e27b65 !important' : 'transparent', // Change background for selected cell only
            },
          }}
        >

          <DataGrid
            rows={PHData1}
            columns={columns1} // Pass columns as a prop
            getRowId={(row) => row.planet} // Adjust based on your data
            pageSize={5}
            hideFooter={true}
            disableColumnSorting
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={38}
            onRowClick={(params) => handleRowSelection('table1', params)}
            selectionModel={selectedRowsTable1}
          />
        </Box>
        <Box
          width={"25%"}
          className="flex"
          sx={{
            '& .MuiDataGrid-root': {
              borderRadius: 0, // Remove border radius
              borderLeft: '0px',
              borderRight: '0px',
              borderTop: '0px !important',
              borderBottom: '0px !important'
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'var(--primary-color) !important',
              backgroundColor: 'var(--secondary-soft-color) !important',
            },
            '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
              color: 'white', // Change to your desired color
            },
            '& .MuiDataGrid-cell': {
              lineHeight: '30px !important'
            },
            '& .MuiDataGrid-columnHeader--withRightBorder': {
              borderRightWidth: '0px !important'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important'
            },
            '& .MuiDataGrid-columnHeader': {
              cursor: 'default !important', // Change to your desired color
              borderBottom: 'none !important',
              borderTop: 'none !important'
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none !important'
            },
            '& .Mui-selected': {
              backgroundColor: selectedRowsTable2.length ? '#99e27b65 !important' : 'transparent', // Change background for selected cell only
            },
          }}
        >

          <DataGrid
            rows={PHData2}
            columns={columns2} // Pass columns as a prop
            getRowId={(row) => row.planet} // Adjust based on your data
            pageSize={5}
            hideFooter={true}
            disableColumnSorting
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={38}
            onRowClick={(params) => handleRowSelection('table2', params)}
            selectionModel={selectedRowsTable2}
          />
        </Box>
        <Box
          width={"25%"}
          className="flex"
          sx={{
            '& .MuiDataGrid-root': {
              borderRadius: 0, // Remove border radius
              borderLeft: '0px',
              borderRight: '0px',
              borderTop: '0px !important',
              borderBottom: '0px !important'
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'var(--primary-color) !important',
              backgroundColor: 'var(--secondary-soft-color) !important',
            },
            '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
              color: 'white', // Change to your desired color
            },
            '& .MuiDataGrid-cell': {
              lineHeight: '30px !important'
            },
            '& .MuiDataGrid-columnHeader--withRightBorder': {
              borderRightWidth: '0px !important'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important'
            },
            '& .MuiDataGrid-columnHeader': {
              cursor: 'default !important', // Change to your desired color
              borderBottom: 'none !important',
              borderTop: 'none !important'
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none !important'
            },
            '& .Mui-selected': {
              backgroundColor: selectedRowsTable3.length ? '#99e27b65 !important' : 'transparent', // Change background for selected cell only
            },
          }}
        >

          <DataGrid
            rows={PHData1}
            columns={columns3} // Pass columns as a prop
            getRowId={(row) => row.planet} // Adjust based on your data
            pageSize={5}
            hideFooter={true}
            disableColumnSorting
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={38}
            onRowClick={(params) => handleRowSelection('table3', params)}
            selectionModel={selectedRowsTable3}
          />
        </Box>
        <Box
          width={"25%"}
          className="flex"
          sx={{
            '& .MuiDataGrid-root': {
              borderRadius: 0, // Remove border radius
              borderLeft: '0px',
              borderRight: '0px',
              borderTop: '0px !important',
              borderBottom: '0px !important'
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'var(--primary-color) !important',
              backgroundColor: 'var(--secondary-soft-color) !important',
            },
            '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
              color: 'white', // Change to your desired color
            },
            '& .MuiDataGrid-cell': {
              lineHeight: '30px !important'
            },
            '& .MuiDataGrid-columnHeader--withRightBorder': {
              borderRightWidth: '0px !important'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important'
            },
            '& .MuiDataGrid-columnHeader': {
              cursor: 'default !important', // Change to your desired color
              borderBottom: 'none !important',
              borderTop: 'none !important'
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none !important'
            },
            '& .Mui-selected': {
              backgroundColor: selectedRowsTable4.length ? '#99e27b65 !important' : 'transparent', // Change background for selected cell only
            },
          }}
        >

          <DataGrid
            rows={PHData2}
            columns={columns4} // Pass columns as a prop
            getRowId={(row) => row.planet} // Adjust based on your data
            pageSize={5}
            hideFooter={true}
            disableColumnSorting
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={38}
            onRowClick={(params) => handleRowSelection('table4', params)}
            selectionModel={selectedRowsTable4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <div className='p-4'>
          <Button variant='contained' type='submit' disabled={false} onClick={onSave}>
            Save
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default Rotation