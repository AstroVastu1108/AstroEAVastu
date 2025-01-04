import Loader from '@/components/common/Loader/Loader'
import { Box, Card, CardContent, Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { useState } from 'react'
import PreviewActions from '../kundli/preview/PreviewActions';
import PageTitle from '@/components/common/PageTitle/PageTitle';

function ActivityLog() {
  const [loading, setLoading] = useState(false);
  const activityLogData = [
    {
      id: 1,
      user: "John Doe",
      activity: "Logged in",
      timestamp: "2025-01-03 10:15:30",
      status: "Success",
    },
    {
      id: 2,
      user: "Jane Smith",
      activity: "Updated Profile",
      timestamp: "2025-01-03 11:00:45",
      status: "Success",
    },
    {
      id: 3,
      user: "Sam Wilson",
      activity: "Attempted Login",
      timestamp: "2025-01-03 11:30:00",
      status: "Failed",
    },
    {
      id: 4,
      user: "Chris Evans",
      activity: "Reset Password",
      timestamp: "2025-01-03 12:00:00",
      status: "Success",
    },
    {
      id: 5,
      user: "Natasha Romanoff",
      activity: "Logged out",
      timestamp: "2025-01-03 12:30:00",
      status: "Success",
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', flex:1,headerClassName: 'rowheader', },
    { field: 'user', headerName: 'User', flex:1, headerClassName: 'rowheader', },
    { field: 'activity', headerName: 'Activity', flex:1, headerClassName: 'rowheader', },
    { field: 'timestamp', headerName: 'Timestamp', flex:1, headerClassName: 'rowheader', },
    { field: 'status', headerName: 'Status', flex:1, headerClassName: 'rowheader', },
  ];
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 50,headerClassName: 'rowheader', },
  //   { field: 'user', headerName: 'User', width: 150, headerClassName: 'rowheader', },
  //   { field: 'activity', headerName: 'Activity', width: 200, headerClassName: 'rowheader', },
  //   { field: 'timestamp', headerName: 'Timestamp', width: 200, headerClassName: 'rowheader', },
  //   { field: 'status', headerName: 'Status', width: 100, headerClassName: 'rowheader', },
  // ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="d-flex justify-content-between p-0 w-full align-items-center">
        <PageTitle title={"Activity Log"} endCmp={
          <>
            <GridToolbarQuickFilter autoFocus className="SearchBar w-full lg:w-9/12 sm:w-5/12 md:w-6/12" />
            {/* <PreviewActions value={"New Kundali"} onButtonClick={""} icon={'tabler-plus'} /> */}
          </>
        } />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-2 p-0'>
              <div className="KundliList">
                <Box>
                  <DataGrid
                    className="KundliListGrid"
                    // getRowClassName={(params) =>
                    //   params.row.IsCurrent ? 'highlight-row' : ''
                    // }
                    // onRowDoubleClick={(e) => { handlePreviewClick(e, e.row.KundaliID) }}
                    // onFilterModelChange={(e) => handleFilterModelChange(e, searchInputRef)}
                    // getRowId={(row) => row.KundaliID}
                    rows={activityLogData}
                    columns={columns}
                    disableColumnMenu
                    rowHeight={45}
                    columnHeaderHeight={45}
                    disableColumnResize
                    disableRowSelectionOnClick
                    pageSizeOptions={[10]}
                    // initialState={{
                    //   pagination: { paginationModel: { pageSize: 10 } },
                    // }}
                    // paginationModel={paginationModel}
                    paginationMode="server"
                    filterMode="server"
                  // rowCount={totalRowCount}
                  // onPaginationModelChange={(paginationModel) => {
                  //   setPaginationModel(paginationModel);
                  //   fetchDataForPage(paginationModel.page);
                  // }}
                  slots={{ toolbar: CustomToolbar }}
                  slotProps={{ toolbar: { showQuickFilter: true } }}
                  />


                </Box>
              </div>
              {/* <KundliDataGrid columns={columns} pageSize={10} /> */}
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  )
}

export default ActivityLog
