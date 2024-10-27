import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React from 'react'

function DashaDetails({ title, DashaData }) {

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

  function CustomToolbar({ title }) {
    return (
      <GridToolbarContainer className="flex-row justify-center items-center w-100 py-2">
        <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-color)' }}>{title}</div>
        {/* <GridToolbarQuickFilter className="SearchBar" /> */}
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader', flex: 1,
      // headerAlign: 'center', textAlign:'center'
    },
    {
      field: 'StartDt', headerName: 'Beginning', headerClassName: 'rowheader', flex: 1,
      // headerAlign: 'center'
    },
    {
      field: 'EndDt', headerName: 'Ending', headerClassName: 'rowheader', flex: 1,
      // headerAlign: 'center'
    },
  ];
  // Adding unique IDs
  const rowsDasha = DashaData?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

  return (
    <>
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
            rows={rowsDasha}
            columns={columns}
            pageSize={rowsDasha.length} // Show all rows
            getRowClassName={(params) =>
              params.row.IsCurrent ? 'highlight-row' : ''
            }
            disableColumnSorting
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={38}
            disableColumnResize
            disableRowSelectionOnClick
            hideFooterPagination={true}
            hideFooter={true}
            slots={{ toolbar: () => <CustomToolbar title={title} /> }}
          />

        </ThemeProvider>

      </Box>
    </>
  )
}

export default DashaDetails
