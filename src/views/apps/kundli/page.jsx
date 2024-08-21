import { Button, Card, CardContent, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";

export default function KundliMain({ kundliData }) {
  // vars
  const columns = [
    // {
    //   field: 'KundaliID', headerName: 'Planet', headerClassName: 'rowheader',
    //   headerAlign: 'left'
    // },
    {
      field: 'FirstName',flex: 1,  headerName: 'First Name', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'MiddleName',flex: 1,  headerName: 'Middle Name', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'LastName',flex: 1,  headerName: 'Last Name', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'Gender',flex: 1,  headerName: 'Gender', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'BirthDate',flex: 1,  headerName: 'BirthDate', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'BirthTime',flex: 1,  headerName: 'BirthTime', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'Country',flex: 1,  headerName: 'Country', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'CityID',flex: 1,  headerName: 'City', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'Prakriti',flex: 1,  headerName: 'Prakriti', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
  ];
  // Adding unique IDs
  // const newKundliData = kundliData?.map((item, index) => ({
  //   id: index + 1, // You can use uuidv4() for truly unique IDs if needed
  //   ...item
  // }));
  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4'>
              <Grid item xs={12} md={12} >
                <div className='flex justify-end gap-4' xs={12} md={12} xl={12}>
                  <Button
                    // fullWidth
                    variant='contained'
                    className='capitalize'
                    // startIcon={<i classNam e='tabler-download' />}
                    // onClick={onButtonClick}
                  >
                    Add New
                  </Button>
                </div>
              </Grid>
              <DataGrid
                getRowId={(row) => row.KundaliID}
                rows={kundliData}
                columns={columns}
                disableColumnMenu
                rowHeight={50}
                columnHeaderHeight={60}
                disableColumnResize
                disableRowSelectionOnClick
                pagination
                initialState={{
                  ...kundliData.initialState,
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
              />
            </CardContent>
          </Card>

        </Grid>
      </Grid>

    </>
  )
}
