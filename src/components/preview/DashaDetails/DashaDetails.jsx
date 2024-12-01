import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';
import "./DashaDetail.css";

function DashaDetails({ title, DashaData, handleDashadbClick, divref }) {

  // const planetColor = {
  //   ketu: "#7D3434",
  //   venus: "#d646a1",
  //   sun: "#f48d25",
  //   moon: "#0dc6df",
  //   mars: "#c93838",
  //   rahu: "#555555",
  //   jupiter: "#ebbf10",
  //   saturn: "#3652ba",
  //   mercury: "#1c8946",
  //   uranus: "#4E6F73",
  //   neptune: "#6b8ac6",
  //   pluto: "#A6705C"
  // }
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

  const highlightText = (value) => {
    // Split the value by `-` to get individual planet abbreviations
    const planetElements = value.split("-").map((abbr) => {
      const abbreviation = abbr.trim().slice(0, 2); // Remove any extra whitespace
      const fullName = shorthandMap[abbreviation]; // Map to full name
      return (
        <span className={`pl-${fullName}`} key={abbreviation}>
          {abbr}
        </span>
      );
    });

    // Return the elements separated by " - "
    return (
      <span>
        {planetElements.map((el, idx) => (
          <React.Fragment key={idx}>
            {el}
            {idx < planetElements.length - 1 && "-"}
          </React.Fragment>
        ))}
      </span>
    );
  };

  const columns = [
    {
      field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader', flex: 1,
      minWidth: 150,
      renderCell: (params) => highlightText(params.value)
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

  const rowHeight = () => {
    if (divref.current) {
      const height = ((divref.current.offsetHeight) - 30) / 9;
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
          '& .MuiDataGrid-filler': {
            display: 'none'
          }
        }}
      >
          <DataGrid
            getRowHeight={rowHeight}

            //  rowHeight={rowHeight}
            rows={rowsDasha}
            columns={columns}
            pageSize={rowsDasha.length} // Show all rows
            getRowClassName={(params) =>
              params.row.IsCurrent ? 'highlight-row cursor-pointer select-none font-ea-sb text-md' : ''
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

      </Box>
    </>
  )
}

export default DashaDetails
