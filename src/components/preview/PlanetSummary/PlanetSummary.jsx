import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import "./PlanetSummary.css"

const SummaryAspect = ({ SummaryData, Aspect }) => {
  const formatAspect = (data) => {
    if (data?.IsWithRaKe) {
      return `<span class='rake'><span>${data?.Aspect}</span><span>⦿</span></span>`;
    } else if (data?.Aspect === 0 && data?.IsAspect) {
      return `<span class='neutral'>${data?.Aspect}</span>`;
    } else if (data?.IsPositive) {
      return `<span class='positive'>${data?.Aspect}</span>`;
    } else if (data?.IsAspect) {
      return `<span class='negative'>${data?.Aspect}</span>`;
    }
    return '';
  };

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
    const abbreviation = value.trim().slice(0, 2); // Remove any extra whitespace
    const fullName = shorthandMap[abbreviation];

    // Split the value by `-` to get individual planet abbreviations

    // Return the elements separated by " - "
    return (
      <span className={`pl-${fullName} row-title`} key={abbreviation}>
        {value}
      </span>
    );
  };

  const { columns, rows } = useMemo(() => {
    const headerNames = Aspect === "P"
      ? ['Planet', 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Urans', 'Neptune', 'Pluto']
      : ['House', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const columns = headerNames.map((headerName, index) => ({
      field: index === 0 ? 'RowTitle' : `Aspect${index}`,
      headerName,
      flex: 1,
      headerClassName: 'rowheader',
      align: index === 0 ? 'left' : 'center',
      headerAlign: index === 0 ? 'left' : 'center',
      minWidth: index === 0 ? 100 : 70,
      renderCell: (params) => {
        if (index === 0) {
          // Apply primary color to the first column
          return highlightText(params.value);
          // return <span className="row-title">{params.value}</span>;
        } else {
          const value = typeof params.value === 'string' ? params.value : String(params.value || '');
          return <span className="summaryTxt" dangerouslySetInnerHTML={{ __html: value }} />;
        }
      }
    }));

    const rows = SummaryData.map((planet, rowIndex) => ({
      id: rowIndex + 1,
      RowTitle: planet.RowTitle,
      ...planet.Aspect.reduce((acc, data, idx) => {
        acc[`Aspect${idx + 1}`] = formatAspect(data);
        return acc;
      }, {})
    }));

    return { columns, rows };
  }, [SummaryData, Aspect]);
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
  return (
    <Box
      // sx={{
      //   '& .MuiDataGrid-cell': {
      //     // borderLeft: '0.5px solid var(--border-color)',
      //     borderBottom: '1px solid var(--border-color)',
      //     borderTop: '0px solid var(--border-color)',
      //   },
      //   '& .MuiDataGrid-cell:last-child': {
      //     // borderRight: '0.5px solid var(--border-color)',
      //   }
      // }}
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
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          disableColumnSorting
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
          rowHeight={30}
          columnHeaderHeight={44}
        />
      </ThemeProvider>

    </Box>
  );
};

export default SummaryAspect;
