import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React from 'react'

function DashaDetails({ title, DashaData }) {
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
    </>
  )
}

export default DashaDetails
