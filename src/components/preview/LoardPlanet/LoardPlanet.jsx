import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function LoardPlanet({ LoardData }) {
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
  const columns1 = [
    {
      field: 'rahuId', headerName: LoardData.Planet, width: 140, headerClassName: 'rowheader',
      renderCell: (params) => {
        return <div className='rahuHeader'>{params.value}</div>
      }
    },
    {
      field: 'rahuScriptFull', headerClassName: 'rowheader',
      headerName: LoardData.ScriptFull,
      width: 200,
      minWidth: 200,
      flex: 1,
      // renderCell: (params) => {
      //   const dataValue = params.value;

      //   // If the value is an array, use map to render multiple elements
      //   if (Array.isArray(dataValue)) {
      //     return (
      //       <>
      //         {dataValue.map((element, index) => (
      //           <div className='valueData' key={index}>
      //             <div className='planetName'>
      //               {element?.Planet}
      //             </div>
      //             <div className='sf'>
      //               {element?.ScriptFull}
      //             </div>
      //           </div>
      //         ))}
      //       </>
      //     );
      //   } else {
      //     return (
      //       <div className='valueData'>
      //         <div className='planetName'>
      //           {dataValue?.Planet}
      //         </div>
      //         <div className='sf'>
      //           {dataValue?.ScriptFull}
      //         </div>
      //       </div>
      //     );
      //   }
      // }

    }
  ];

  const rows = [
    // { rahuId: 'Vedic Aspect', rahuScriptFull: LoardData.Aspect }
    { rahuId: LoardData.PL.Planet, rahuScriptFull: LoardData.PL.ScriptFull },
    { rahuId: LoardData.NL.Planet, rahuScriptFull: LoardData.NL.ScriptFull },
    { rahuId: LoardData.SL.Planet, rahuScriptFull: LoardData.SL.ScriptFull },
  ];

  return (
    <div>
      <Box
        width={"100%"}
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
          '& .MuiDataGrid-cell': {
            lineHeight: '30px !important'
          },
        }}
      >
        <ThemeProvider theme={customTheme}>

          <DataGrid
            showCellVerticalBorder
            getRowId={(row) => row.rahuId}
            rows={rows}
            columns={columns1}
            disableColumnSorting
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={38}
            disableColumnResize
            disableRowSelectionOnClick
            hideFooterPagination={true}
            hideFooter={true}
          />
        </ThemeProvider>

      </Box>
    </div>
  )
}

export default LoardPlanet
