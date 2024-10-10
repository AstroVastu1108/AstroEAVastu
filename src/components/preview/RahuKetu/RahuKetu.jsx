import { Box, createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function RahuKetu({ RahuData, KetuData }) {
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
  const columns = [
    {
      field: 'rahuId', headerName: 'Rahu', width: 150, headerClassName: 'rowheader',
      renderCell: (params) => {
        return <div className='rahuHeader'>{params.value}</div>
      }
    },
    {
      field: 'rahuScriptFull', headerClassName: 'rowheader',
      headerName: RahuData.ScriptFull,
      width: 200,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const dataValue = params.value;

        // If the value is an array, use map to render multiple elements
        if (Array.isArray(dataValue)) {
          return (
            <>
              {dataValue.map((element, index) => (
                <div className='valueData'  key={index}>
                <div className='planetName'>
                  {element?.Planet}
                </div>
                <div className='sf'>
                  {element?.ScriptFull}
                </div>
              </div>
              ))}
            </>
          );
        } else {
          return (
            <div className='valueData'>
              <div className='planetName'>
                {dataValue?.Planet}
              </div>
              <div className='sf'>
                {dataValue?.ScriptFull}
              </div>
            </div>
          );
        }
      }

    },
    {
      field: 'ketuId', headerName: 'Ketu', headerClassName: 'rowheader', width: 150, renderCell: (params) => {
        return <div className='rahuHeader'>{params.value}</div>
      }
    },
    {
      field: 'ketuScriptFull', headerClassName: 'rowheader',
      headerName: KetuData.ScriptFull,
      width: 200,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const dataValue = params.value;

        // If the value is an array, use map to render multiple elements
        if (Array.isArray(dataValue)) {
          return (
            <>
              {dataValue.map((element, index) => (
                <div className='valueData'  key={index}>
                <div className='planetName'>
                  {element?.Planet}
                </div>
                <div className='sf'>
                  {element?.ScriptFull}
                </div>
              </div>
              ))}
            </>
          );
        } else {
          return (
            <div className='valueData'>
              <div className='planetName'>
                {dataValue?.Planet}
              </div>
              <div className='sf'>
                {dataValue?.ScriptFull}
              </div>
            </div>
          );
        }
      }

    },
  ];

  const rows = [
    { rahuId: 'Conjunction', rahuScriptFull: RahuData.Conjunction, ketuId: 'Conjunction', ketuScriptFull: KetuData.Conjunction },
    { rahuId: 'Vedic Aspect', rahuScriptFull: RahuData.Aspect, ketuId: 'Vedic Aspect', ketuScriptFull: KetuData.Aspect },
    { rahuId: 'Nakshatra', rahuScriptFull: RahuData.NL, ketuId: 'Nakshatra', ketuScriptFull: KetuData.NL },
    { rahuId: 'Sign', rahuScriptFull: RahuData.RL, ketuId: 'Sign', ketuScriptFull: KetuData.RL },
  ];

  const getRowHeight = (params) => {
    const rahudataValue = params?.model?.rahuScriptFull;
    const ketudataValue = params?.model?.ketuScriptFull;

    // Check if both values are arrays, and take the maximum length
    const rahuLength = Array.isArray(rahudataValue) ? rahudataValue.length : 0;
    const ketuLength = Array.isArray(ketudataValue) ? ketudataValue.length : 0;

    // Get the maximum length from both arrays
    const maxLength = Math.max(rahuLength, ketuLength);

    // Adjust the row height based on the maximum length, otherwise return default height
    return maxLength > 0 ? 28 * maxLength : 40;
  };

  return (

    <Box width={"100%"} sx={{
      '& .MuiDataGrid-cell': {
        fontSize: "14px",
        borderLeft: '0.5px solid var(--border-color)',
        borderBottom: '0.5px solid var(--border-color)',
        lineHeight: '25px !important'
      },
      '& .MuiDataGrid-cell:last-child': {
        borderRight: '0.5px solid var(--border-color)',
      }
    }}>
      <ThemeProvider theme={customTheme}>

        <DataGrid
          getRowId={(row) => row.rahuId}
          rows={rows} columns={columns}
          disableColumnSorting
          disableColumnMenu
          // rowHeight={30}
          columnHeaderHeight={38}
          disableColumnResize
          disableRowSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
          getRowHeight={getRowHeight} />
      </ThemeProvider>

    </Box>
  )
}

export default RahuKetu
