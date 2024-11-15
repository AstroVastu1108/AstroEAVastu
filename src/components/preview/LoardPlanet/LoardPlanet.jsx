import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function LoardPlanet({ LoardData, SelectedEventVal }) {

  const applyOccupancyColor = (Occupancy) => {
    if (SelectedEventVal) {
      const positive = SelectedEventVal.Positive?.split(", ").map(Number) || [];
      const negative = SelectedEventVal.Negative?.split(", ").map(Number) || [];
      const occupancyNumber = Number(Occupancy);

      if (positive.includes(occupancyNumber)) {
        return <span className="text-[var(--green-text-color)] font-semibold">{occupancyNumber}</span>;
      } else if (negative.includes(occupancyNumber)) {
        return <span className="text-[var(--red-text-color)] font-semibold">{occupancyNumber}</span>;
      }
    }
    return Occupancy;
  };

  const applyOwnerShipColor=(OwnershipArray)=>{
    const formattedOwnership = OwnershipArray?.map((ownershipItem, index) => {
      const ownershipNumber = Number(ownershipItem);

      if (SelectedEventVal) {
        const positiveValues = SelectedEventVal.Positive.split(', ').map(Number);
        const negativeValues = SelectedEventVal.Negative.split(', ').map(Number);

        // Apply green color if ownership is in Positive, red if in Negative
        if (positiveValues.includes(ownershipNumber)) {
          return (
            <span key={index} className="text-[var(--green-text-color)] font-semibold">
              {ownershipItem}
              {index < OwnershipArray.length - 1 && ', '}
            </span>
          );
        } else if (negativeValues.includes(ownershipNumber)) {
          return (
            <span key={index} className="text-[var(--red-text-color)] font-semibold">
              {ownershipItem}
              {index < OwnershipArray.length - 1 && ', '}
            </span>
          );
        }
      }
      // Default case with no color
      return (
        <span key={index}>
          {ownershipItem}
          {index < OwnershipArray.length - 1 && ', '}
        </span>
      );
    });
    return formattedOwnership;
  }


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
        const scriptFull = params.value || '';
        let formattedScript = scriptFull.split(" / ");
        let ownership = Array(formattedScript[1]?.split(", "))
        return <div className='degreeDiv'>{applyOccupancyColor(formattedScript[0])} / {applyOwnerShipColor(ownership[0])}
        </div>;
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
        '& .MuiDataGrid-columnHeader--withRightBorder': {
          borderRightWidth: '0px !important'
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none !important'
        },
        '& .MuiDataGrid-columnHeader': {
          cursor: 'default !important', // Change to your desired color
        },
        '& .MuiDataGrid-columnHeader:focus': {
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
