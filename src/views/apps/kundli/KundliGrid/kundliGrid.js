import React, { useEffect, useState } from 'react'
import './kundliGroid.css'
import { GetKundliDataAPI, SearchKundli } from '@/app/Server/API/kundliAPI'
import Loader from '@/components/common/Loader/Loader'
import { Box, createTheme, ThemeProvider, Button, debounce, TextField } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'

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
    //   setQuery(e.target.value)
  }



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
      // return toastDisplayer('error', res.error)
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
