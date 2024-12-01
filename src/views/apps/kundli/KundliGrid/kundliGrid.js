// // import React, { useEffect, useState } from 'react'
// // import './kundliGroid.css'
// // import { GetKundliDataAPI } from '@/app/Server/API/kundliAPI'
// // import Loader from '@/components/common/Loader/Loader'
// // import {
// //   Box,
// //   createTheme,
// //   ThemeProvider
// // } from '@mui/material'
// // import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
// // function KundliDataGrid({ columns,pageSize , checkboxSelection, onRowClick }) {
// //   const [loading, setLoading] = useState(false)
// //   const [kundliData, setKundliData] = useState([])
// //   const [totalRowCount, setTotalRowCount] = useState(1000)

// //   const customTheme = createTheme({
// //     components: {
// //       MuiDataGrid: {
// //         styleOverrides: {
// //           root: {
// //             fontFamily: 'Segoe UI, Arial, sans-serif'
// //           },
// //           cell: {
// //             fontFamily: 'Segoe UI, Arial, sans-serif'
// //           },
// //           columnHeaders: {
// //             fontFamily: 'Segoe UI, Arial, sans-serif'
// //           },
// //           toolbar: {
// //             fontFamily: 'Segoe UI, Arial, sans-serif'
// //           }
// //         }
// //       }
// //     }
// //   })

// //   function CustomToolbar() {
// //     return (
// //       <GridToolbarContainer className='px-5  d-flex justify-content-between align-items-center'>
// //         <div className='me-auto' style={{ fontSize: '16px', fontWeight: '500', color: '#2F2B3DB3' }}>
// //           Review your Kundli records below
// //         </div>
// //         <GridToolbarQuickFilter className='SearchBar' />
// //       </GridToolbarContainer>
// //     )
// //   }

// //   const getAllKundli = async pageNo => {
// //     setLoading(true)
// //     const res = await GetKundliDataAPI(10, pageNo)
// //     if (res.hasError) {
// //       setLoading(false)
// //       return toastDisplayer('error', res.error)
// //     } else {
// //       setKundliData(res?.responseData?.data?.Result?.KundaliList)
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     getAllKundli(1)
// //   }, [])

// //   const fetchDataForPage = e => {
// //     getAllKundli(parseInt(e) + 1)
// //   }
// //   return (
// //     <>
// //       {loading && <Loader />}
// //       <div className='KundliList'>
// //         <Box className='p-5'>
// //           <ThemeProvider theme={customTheme}>
// //             <DataGrid
// //               className='KundliListGrid'
// //               //   onFilterModelChange={handleFilterModelChange}
// //               getRowId={row => row.KundaliID}
// //               rows={kundliData}
// //               columns={columns}
// //               disableColumnSorting
// //               disableColumnMenu
// //               rowHeight={45}
// //               columnHeaderHeight={45}
// //               disableColumnResize
// //               disableRowSelectionOnClick
// //               pageSizeOptions={[pageSize]}
// //               initialState={{
// //                 pagination: { paginationModel: { pageSize: pageSize } },
// //                 pinnedColumns: { left: ['FirstName'], left: ['iconColumn'] }
// //               }}
// //               paginationMode='server'
// //               rowCount={totalRowCount} // Set the total count of rows
// //               // paginationModel={paginationModel}
// //               onPaginationModelChange={paginationModel => {
// //                 fetchDataForPage(paginationModel.page)
// //               }}
// //               slots={{ toolbar: CustomToolbar }}
// //               slotProps={{ toolbar: { showQuickFilter: true } }}
// //               disableMultipleSelection
// //               checkboxSelection={checkboxSelection} // Pass the prop
// //               onRowClick={onRowClick} // Pass the prop
// //             />
// //           </ThemeProvider>
// //         </Box>
// //       </div>
// //     </>
// //   )
// // }

// // export default KundliDataGrid

// import React, { useEffect, useState } from 'react'
// import './kundliGroid.css'
// import { GetKundliDataAPI } from '@/app/Server/API/kundliAPI'
// import Loader from '@/components/common/Loader/Loader'
// import {
//   Box,
//   createTheme,
//   ThemeProvider,
//   Button
// } from '@mui/material'
// import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'

// function KundliDataGrid({ columns, pageSize = 5, checkboxSelection = false, onRowClick }) {
//   const [loading, setLoading] = useState(false)
//   const [kundliData, setKundliData] = useState([])
//   const [totalRowCount, setTotalRowCount] = useState(1000)
//   const [selectedRows, setSelectedRows] = useState([])
//   const [searchText, setSearchText] = useState('')

//   const customTheme = createTheme({
//     components: {
//       MuiDataGrid: {
//         styleOverrides: {
//           root: {
//             fontFamily: 'Segoe UI, Arial, sans-serif'
//           },
//           cell: {
//             fontFamily: 'Segoe UI, Arial, sans-serif'
//           },
//           columnHeaders: {
//             fontFamily: 'Segoe UI, Arial, sans-serif'
//           },
//           toolbar: {
//             fontFamily: 'Segoe UI, Arial, sans-serif'
//           }
//         }
//       }
//     }
//   })

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer className='px-5  d-flex justify-content-between align-items-center'>
//         <div className='me-auto' style={{ fontSize: '16px', fontWeight: '500', color: '#2F2B3DB3' }}>
//           Review your Kundli records below
//         </div>
//         <GridToolbarQuickFilter
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           placeholder='Search...'
//           className='SearchBar'
//         />
//       </GridToolbarContainer>
//     )
//   }

//   const getAllKundli = async (pageNo, searchQuery = '') => {
//     setLoading(true)
//     const res = await GetKundliDataAPI(pageSize, pageNo, searchQuery)
//     if (res.hasError) {
//       setLoading(false)
//       return toastDisplayer('error', res.error)
//     } else {
//       setKundliData(res?.responseData?.data?.Result?.KundaliList || [])
//       setTotalRowCount(res?.responseData?.data?.Result?.TotalCount || 1000)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     getAllKundli(1)
//   }, [])

//   const fetchDataForPage = (pageNo) => {
//     getAllKundli(pageNo + 1, searchText)
//   }

//   const handleSearch = () => {
//     getAllKundli(1, searchText) // Reset to the first page with search applied
//   }

//   const handleSelectionChange = (newSelection) => {
//     console.log("handleSelectionChange : ",newSelection)
//     setSelectedRows(newSelection)
//   }

//   return (
//     <>
//       {loading && <Loader />}
//       <div className='KundliList'>
//         <Box className='p-5'>
//           <ThemeProvider theme={customTheme}>
//             <DataGrid
//               className='KundliListGrid'
//               getRowId={(row) => row.KundaliID}
//               rows={kundliData}
//               columns={columns}
//               rowHeight={45}
//               columnHeaderHeight={45}
//               disableColumnResize
//               disableRowSelectionOnClick
//               pageSize={pageSize}
//               paginationMode='server'
//               rowCount={totalRowCount}
//               onPaginationModelChange={(paginationModel) => {
//                 fetchDataForPage(paginationModel.page)
//               }}
//               onSelectionModelChange={handleSelectionChange}
//               checkboxSelection={checkboxSelection}
//               onRowClick={onRowClick}
//               slots={{ toolbar: CustomToolbar }}
//               slotProps={{ toolbar: { showQuickFilter: true } }}
//             />
//             <Button variant='contained' onClick={handleSearch} className='mt-3'>
//               Search
//             </Button>
//           </ThemeProvider>
//         </Box>
//       </div>
//     </>
//   )
// }

// export default KundliDataGrid

import React, { useEffect, useState } from 'react'
import './kundliGroid.css'
import { GetKundliDataAPI, SearchKundli } from '@/app/Server/API/kundliAPI'
import Loader from '@/components/common/Loader/Loader'
import { Box, createTheme, ThemeProvider, Button, debounce, TextField } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'

function KundliDataGrid({ columns, pageSize = 5, checkboxSelection = false, onRowClick }) {
  const [loading, setLoading] = useState(false)
  const [kundliData, setKundliData] = useState([])
  const [totalRowCount, setTotalRowCount] = useState(1000)
  const [selectedRow, setSelectedRow] = useState(null) // Track the selected row
  const [searchText, setSearchText] = useState('')
  const [queryData, setQuery] = useState(null)

  const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          // root: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif'
          // },
          // cell: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif'
          // },
          // columnHeaders: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif'
          // },
          // toolbar: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif'
          // }
        }
      }
    }
  })

  const handleSearch = (e) => {
      // console.log('Searched Data : ', e.target.value)
    //   setQuery(e.target.value)
  }

//   const fetchSearchKundli = debounce(async (query) => {
//     // if (query.length > 1) {
//       try {
//         const response = await SearchKundli(query)
//         console.log("Response : ",response.responseData.Result.KundaliList)
//         setKundliData(response.responseData.Result.KundaliList)
//       } catch (error) {
//         return toastDisplayer("error", `There was a problem with the fetch operation:${error}`)
//       }
//     // }
//   }, 300) // Debounce API requests by 300ms

//   // Use effect to fetch cities when the query changes
//   useEffect(() => {
//     fetchSearchKundli(queryData)
//   }, [queryData])

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer className='px-5  d-flex justify-content-between align-items-center'>
//         <div className='me-auto' style={{ fontSize: '16px', fontWeight: '500', color: '#2F2B3DB3' }}>
//           Review your Kundli records below
//         </div>
//         <GridToolbarQuickFilter
//           // onInput={handleSearch}
//           onInputCapture={handleSearch}
//           // value={searchText} // Set the value from searchText state
//           // onChange={handleSearch} // Pass the event to handleSearch
//           placeholder='Search...'
//           className='SearchBar'
//         />
//       </GridToolbarContainer>
//     )
//   }

function CustomToolbar() {
    return (
      <GridToolbarContainer className='px-5 d-flex justify-content-between align-items-center'>
        <div className='me-auto' style={{ fontSize: '16px', fontWeight: '500', color: '#2F2B3DB3' }}>
          Review your Kundli records below
        </div>
        <TextField
                label="Search"
                onChange={e => {
                    handleSearch(e)
                }}
              />
        {/* <input
          type='text'
          placeholder='Search...'
        //   value={searchText}
          onChange={handleSearch} // Call the handleSearch function on change
          className='SearchBar'
          style={{ marginLeft: 'auto', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        /> */}
      </GridToolbarContainer>
    );
  }

  const getAllKundli = async (pageNo) => {
    setLoading(true)
    const res = await GetKundliDataAPI(pageSize, pageNo,"")
    if (res.hasError) {
      setLoading(false)
      return toastDisplayer('error', res.error)
    } else {
      setKundliData(res?.responseData?.data?.Result?.KundaliList || [])
      setTotalRowCount(res?.responseData?.data?.Result?.TotalCount || 1000)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllKundli(1)
  }, [])

  const fetchDataForPage = pageNo => {
    getAllKundli(pageNo + 1)
  }

  return (
    <>
      {loading && <Loader />}
      <div className='KundliList'>
          <ThemeProvider theme={customTheme}>
            <DataGrid
              className='KundliListGrid'
              getRowId={row => row.KundaliID}
              rows={kundliData}
              columns={columns}
              rowHeight={45}
              columnHeaderHeight={45}
              disableColumnResize
              pageSize={pageSize}
              paginationMode='server'
              rowCount={totalRowCount}
              onPaginationModelChange={paginationModel => {
                fetchDataForPage(paginationModel.page)
              }}
              checkboxSelection={checkboxSelection}
              disableMultipleRowSelection
              onRowClick={onRowClick}
              selectionModel={selectedRow ? [selectedRow.KundaliID] : []} // Control selected rows
              slots={{ toolbar: CustomToolbar }}
              slotProps={{ toolbar: { showQuickFilter: false } }}
            />
          </ThemeProvider>
      </div>
    </>
  )
}

export default KundliDataGrid
