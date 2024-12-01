import { Box, createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function RahuKetu({ RahuData, KetuData }) {
  const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          // root: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
          // cell: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
          // columnHeaders: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
          // toolbar: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
        },
      },
    },
  });

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
    const abbreviation = value.trim().slice(0, 2);
    const fullName = shorthandMap[abbreviation];

    return (
      <div className={`pl-${fullName} planetName`} key={abbreviation}>
        {value}
      </div>
    );
  };

  const columns1 = [
    {
      field: 'rahuId', headerName: 'Rahu', width: 140, headerClassName: 'rowheader',
      renderCell: (params) => {
        return <div className='rahuHeader font-ea-sb'>{params.value}</div>
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
                <div className='valueData' key={index}>
                  {/* <div className='planetName'>
                    {element?.Planet}
                  </div> */}
                  {highlightText(element?.Planet)}
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
              {/* <div className='planetName'>
                {dataValue?.Planet}
              </div> */}
              {highlightText(dataValue?.Planet)}
              <div className='sf'>
                {dataValue?.ScriptFull}
              </div>
            </div>
          );
        }
      }

    }
  ];
  const columns2 = [
    {
      field: 'ketuId', headerName: 'Ketu', headerClassName: 'rowheader', width: 140, renderCell: (params) => {
        return <div className='rahuHeader font-ea-sb'>{params.value}</div>
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
                <div className='valueData' key={index}>
                  {/* <div className='planetName'>
                    {element?.Planet}
                  </div> */}
                  {highlightText(element?.Planet)}
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
              {/* <div className='planetName'>
                {dataValue?.Planet}
              </div> */}
              {highlightText(dataValue?.Planet)}
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
    return maxLength > 0 ? 30 * maxLength : 30;
  };

  return (
    <>
      {/* <div className='flex flex-col md:flex-row sm:flex-row gap-5 lg:w-[100%] md:w-[calc(100%-20px)] sm:w-[100%]'> */}

        <Box
          className="w-[100%] md:w-[calc(50%-8px)] sm:w-[calc(50%-8px)]"
          // className="w-[100%] md:w-[50%] sm:w-[50%-10px]"
          // width={"50%"}
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
            '& .MuiDataGrid-row:nth-of-type(3)': {
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
            '& .MuiDataGrid-columnHeader--withRightBorder': {
              borderRightWidth: '0px !important'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important'
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
              rows={rows} columns={columns1}
              disableColumnSorting
              disableColumnMenu
              rowHeight={30}
              columnHeaderHeight={38}
              disableColumnResize
              disableRowSelectionOnClick
              hideFooterPagination={true}
              hideFooter={true}
              getRowHeight={getRowHeight}
            />
          </ThemeProvider>

        </Box>
        <Box
          className="w-[100%] md:w-[calc(50%-8px)] sm:w-[calc(50%-8px)]"
          // width={"50%"}
          // className="w-[100%] md:w-[50%] sm:w-[50%-10px]"
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
            '& .MuiDataGrid-row:nth-of-type(3)': {
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
            '& .MuiDataGrid-columnHeader--withRightBorder': {
              borderRightWidth: '0px !important'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important'
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
              rows={rows} columns={columns2}
              disableColumnSorting
              disableColumnMenu
              rowHeight={30}
              columnHeaderHeight={38}
              disableColumnResize
              disableRowSelectionOnClick
              hideFooterPagination={true}
              hideFooter={true}
              getRowHeight={getRowHeight}
            />
          </ThemeProvider>

        </Box>
      {/* </div> */}
    </>
  )
}

export default RahuKetu

// import { Box, createTheme, ThemeProvider } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid';
// import React from 'react'

// function RahuKetu({ RahuData, KetuData }) {
//   const customTheme = createTheme({
//     components: {
//       MuiDataGrid: {
//         styleOverrides: {
//           root: {
//             fontFamily: 'Segoe UI, Arial, sans-serif',
//           },
//           cell: {
//             fontFamily: 'Segoe UI, Arial, sans-serif',
//           },
//           columnHeaders: {
//             fontFamily: 'Segoe UI, Arial, sans-serif',
//           },
//           toolbar: {
//             fontFamily: 'Segoe UI, Arial, sans-serif',
//           },
//         },
//       },
//     },
//   });
//   const columns = [
//     {
//       field: 'rahuId', headerName: 'Rahu', width: 150, headerClassName: 'rowheader',
//       renderCell: (params) => {
//         return <div className='rahuHeader'>{params.value}</div>
//       }
//     },
//     {
//       field: 'rahuScriptFull', headerClassName: 'rowheader columnSpacer',
//       headerName: RahuData.ScriptFull,
//       width: 200,
//       minWidth: 200,
//       flex: 1,
//       renderCell: (params) => {
//         const dataValue = params.value;

//         // If the value is an array, use map to render multiple elements
//         if (Array.isArray(dataValue)) {
//           return (
//             <>
//               {dataValue.map((element, index) => (
//                 <div className='valueData' key={index}>
//                   <div className='planetName'>
//                     {element?.Planet}
//                   </div>
//                   <div className='sf'>
//                     {element?.ScriptFull}
//                   </div>
//                 </div>
//               ))}
//             </>
//           );
//         } else {
//           return (
//             <div className='valueData'>
//               <div className='planetName'>
//                 {dataValue?.Planet}
//               </div>
//               <div className='sf'>
//                 {dataValue?.ScriptFull}
//               </div>
//             </div>
//           );
//         }
//       }

//     },
//     {
//       field: 'ketuId', headerName: 'Ketu', headerClassName: 'rowheader', width: 150, renderCell: (params) => {
//         return <div className='rahuHeader'>{params.value}</div>
//       }
//     },
//     {
//       field: 'ketuScriptFull', headerClassName: 'rowheader',
//       headerName: KetuData.ScriptFull,
//       width: 200,
//       minWidth: 200,
//       flex: 1,
//       renderCell: (params) => {
//         const dataValue = params.value;

//         // If the value is an array, use map to render multiple elements
//         if (Array.isArray(dataValue)) {
//           return (
//             <>
//               {dataValue.map((element, index) => (
//                 <div className='valueData' key={index}>
//                   <div className='planetName'>
//                     {element?.Planet}
//                   </div>
//                   <div className='sf'>
//                     {element?.ScriptFull}
//                   </div>
//                 </div>
//               ))}
//             </>
//           );
//         } else {
//           return (
//             <div className='valueData'>
//               <div className='planetName'>
//                 {dataValue?.Planet}
//               </div>
//               <div className='sf'>
//                 {dataValue?.ScriptFull}
//               </div>
//             </div>
//           );
//         }
//       }

//     },
//   ];

//   const rows = [
//     { rahuId: 'Conjunction', rahuScriptFull: RahuData.Conjunction, ketuId: 'Conjunction', ketuScriptFull: KetuData.Conjunction },
//     { rahuId: 'Vedic Aspect', rahuScriptFull: RahuData.Aspect, ketuId: 'Vedic Aspect', ketuScriptFull: KetuData.Aspect },
//     { rahuId: 'Nakshatra', rahuScriptFull: RahuData.NL, ketuId: 'Nakshatra', ketuScriptFull: KetuData.NL },
//     { rahuId: 'Sign', rahuScriptFull: RahuData.RL, ketuId: 'Sign', ketuScriptFull: KetuData.RL },
//   ];

//   const getRowHeight = (params) => {
//     const rahudataValue = params?.model?.rahuScriptFull;
//     const ketudataValue = params?.model?.ketuScriptFull;

//     // Check if both values are arrays, and take the maximum length
//     const rahuLength = Array.isArray(rahudataValue) ? rahudataValue.length : 0;
//     const ketuLength = Array.isArray(ketudataValue) ? ketudataValue.length : 0;

//     // Get the maximum length from both arrays
//     const maxLength = Math.max(rahuLength, ketuLength);

//     // Adjust the row height based on the maximum length, otherwise return default height
//     return maxLength > 0 ? 28 * maxLength : 40;
//   };

//   return (

//     <Box width={"100%"}
//       sx={{
//         '& .MuiDataGrid-root': {
//           borderRadius: 0, // Remove border radius
//           borderLeft: '0px',
//           borderRight: '0px',
//         },
//         '& .MuiDataGrid-row:nth-of-type(odd)': {
//           backgroundColor: '#ffffff', // Light color for odd rows
//         },
//         '& .MuiDataGrid-row:nth-of-type(even)': {
//           backgroundColor: '#f5f5f5', // White color for even rows
//         },
//         '& .MuiDataGrid-row:hover': {
//           color: 'var(--primary-color) !important',
//           backgroundColor: 'var(--secondary-soft-color) !important',
//         },
//         '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
//           color: 'white', // Change to your desired color
//         },
//       }}
//     >
//       <ThemeProvider theme={customTheme}>

//         <DataGrid
//           showCellVerticalBorder
//           getRowId={(row) => row.rahuId}
//           rows={rows} columns={columns}
//           disableColumnSorting
//           disableColumnMenu
//           // rowHeight={30}
//           columnHeaderHeight={38}
//           disableColumnResize
//           disableRowSelectionOnClick
//           hideFooterPagination={true}
//           hideFooter={true}
//           getRowHeight={getRowHeight}
//           getRowClassName={() => 'columnSpacer'}
//         />

//       </ThemeProvider>

//     </Box>
//   )
// }

// export default RahuKetu
