import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function LoardPlanet({ LoardData,  SelectedEventVal}) {
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
  // const columns1 = [
  //   {
  //     field: 'rahuId', headerName: LoardData.Planet, width: 100, headerClassName: 'rowheader',
  //     renderCell: (params) => {
  //       return <div className='rahuHeader'>{params.value}</div>
  //     }
  //   },
  //   {
  //     field: 'rahuScriptFull', headerClassName: 'rowheader',
  //     headerName: <div className='valueHeader'><div className='me-1'>{LoardData.Nakshatra}</div> / <div className='ms-1'>{LoardData.NakshatraPada}</div></div> ,
  //     width: 10,
  //     // minWidth: 10,
  //     flex: 1,
  //   }
  // ];


  const columns1 = [
    {
      field: 'rahuId',
      headerName: LoardData.Planet,
      width: 100,
      headerClassName: 'rowheader',
      renderCell: (params) => {
        return <div className='rahuHeader'>{params.value}</div>;
      },
    },
    {
      field: 'rahuScriptFull',
      headerClassName: 'rowheader',
      headerName: (
        <div className='valueHeader'>
          <div className='me-1'>{LoardData.Nakshatra}</div> /{' '}
          <div className='ms-1'>{LoardData.NakshatraPada}</div>
        </div>
      ),
      width: 10,
      flex: 1,
      renderCell: (params) => {
        console.log(params)
        const scriptFull = params.value || '';
        let formattedScript = scriptFull;

        if (SelectedEventVal) {
          const positiveValues = SelectedEventVal.Positive.split(', ').map(Number);
          const negativeValues = SelectedEventVal.Negative.split(', ').map(Number);

          // Check if scriptFull is included in Positive or Negative lists
          const scriptFullNumber = Number(scriptFull);

          if (positiveValues.includes(scriptFullNumber)) {
            formattedScript = (
              <span className="text-[var(--green-text-color)]">{scriptFull}</span>
            );
          } else if (negativeValues.includes(scriptFullNumber)) {
            formattedScript = (
              <span className="text-[var(--red-text-color)]">{scriptFull}</span>
            );
          }
        }

        return <div className='degreeDiv'>{formattedScript}</div>;
      },
    },
  ];

  const rows = [
    // { rahuId: 'Vedic Aspect', rahuScriptFull: LoardData.Aspect }
    { rahuId: LoardData.PL.Planet, rahuScriptFull: LoardData.PL.ScriptFull },
    { rahuId: LoardData.NL.Planet, rahuScriptFull: LoardData.NL.ScriptFull },
    { rahuId: LoardData.SL.Planet, rahuScriptFull: LoardData.SL.ScriptFull },
  ];

  return (
      <Box
        // width={"100%"}
        sx={{
          '& .MuiDataGrid-root': {
            borderRadius: 0, // Remove border radius
            borderLeft: '0px',
            borderRight: '0px',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#daffaf45',
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
          // '& .MuiDataGrid-columnHeaderTitleContainerContent':{
          //   width: '100% !important'
          // },
          // '& .MuiDataGrid-columnHeaderTitle':{
          //   width: '100% !important'
          // },
          '& .MuiDataGrid-columnHeader--withRightBorder':{
            borderRightWidth:'0px !important'
          },
          '& .MuiDataGrid-columnSeparator':{
            display:'none !important'
          },
          '& .MuiDataGrid-columnHeader': {
            cursor: 'default !important', // Change to your desired color
          },
          '& .MuiDataGrid-columnHeader:focus':{
            outline: 'none !important'
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
  )
}

export default LoardPlanet
