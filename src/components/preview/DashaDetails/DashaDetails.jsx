import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React from 'react'

function DashaDetails({ title, DashaData, handleDashadbClick, divref }) {

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
      minWidth: 80
      // headerAlign: 'center', textAlign:'center'
    },
    {
      field: 'StartDt', headerName: 'Beginning', headerClassName: 'rowheader', width: 80,
      minWidth: 100
      // headerAlign: 'center'
    },
    {
      field: 'EndDt', headerName: 'Ending', headerClassName: 'rowheader', width: 80,
      minWidth: 100
      // headerAlign: 'center'
    },
  ];
  // Adding unique IDs
  const rowsDasha = DashaData?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

  const handleDashaClick = (e) => {
    // console.log(e);
    // if(e.row?.IsCurrent)
      handleDashadbClick(e.row);
  }

  const rowHeight = ()=>
  {
    if (divref.current) {
      const height = ((divref.current.offsetHeight)-30)/9;
      return height;
    }
    return 25
  }



  return (
    <>
      <Box
        // width={"30%"}
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
          // '& .MuiDataGrid-cell': {
          //   lineHeight: '30px !important'
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
          '& .MuiDataGrid-scrollbar--vertical': {
            display: 'none'
          },
          '& .MuiDataGrid-filler':{
            display:'none'
          }
        }}
      >
        <ThemeProvider theme={customTheme}>

          <DataGrid
              getRowHeight={rowHeight}

          //  rowHeight={rowHeight}
            rows={rowsDasha}
            columns={columns}
            pageSize={rowsDasha.length} // Show all rows
            getRowClassName={(params) =>
              params.row.IsCurrent ? 'highlight-row cursor-pointer select-none' : ''
            }
            onRowDoubleClick={handleDashaClick}
            disableColumnSorting
            disableColumnMenu
            // rowHeight={25}
            columnHeaderHeight={30}
            disableColumnResize
            disableRowSelectionOnClick
            hideFooterPagination={true}
            hideFooter={true}
          // slots={{ toolbar: () => <CustomToolbar title={title} /> }}
          />

        </ThemeProvider>

      </Box>
    </>
  )
}

export default DashaDetails
