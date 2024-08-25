import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";
import { useEffect, useState } from "react";
import AddKundliPopUp from "./addKundli/addKundli";
import { GetKundliDataAPI } from "@/app/Server/API/kundliAPI";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader/Loader";
import "./Kundli.css"

export default function KundliMain() {

  // vars
  const columns = [
    // {
    //   field: 'KundaliID', headerName: 'Planet', headerClassName: 'rowheader',
    //   headerAlign: 'left'
    // },
    {
      field: 'FirstName', flex: 2, headerName: 'Full Name', headerClassName: 'rowheader',
      headerAlign: 'left',
      renderCell: (params) => (
        <>
          <span>{params.row.FirstName} {params.row.MiddleName} {params.row.LastName}</span>
        </>
      ),
    },
    {
      field: 'iconColumn', // Unique field name for this column
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handlePreviewClick(params?.row?.KundaliID)}>
            <i
              className={'tabler-arrow-up-right bg-primary'}
            />
          </IconButton>
          <IconButton onClick={() => console.log(params?.row?.KundaliID)}>
            <i
              className={'tabler-edit'}
            />
          </IconButton>
        </>
      ),
    },
    {
      field: 'Gender', flex: 1, headerName: 'Gender', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'BirthDate', flex: 1, headerName: 'BirthDate', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'BirthTime', flex: 1, headerName: 'BirthTime', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'Country', flex: 1, headerName: 'Country', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'CityID', flex: 1, headerName: 'City', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'Prakriti', flex: 1, headerName: 'Prakriti', headerClassName: 'rowheader',
      headerAlign: 'left'
    },

  ];
  const [open, setOpen] = useState(false);
  const [kundliData, setKundliData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  // func
  const handleAddClick = () => {
    setOpen(true)
  }
  const handleAddClose = () => {
    setOpen(false)
  }

  const getAllKundli = async () => {
    setLoading(true);
    const res = await GetKundliDataAPI(1000, 1);
    if (res.hasError) {
      setLoading(false);
      return toastDisplayer("error", res.error);
    } else {
      setKundliData(res?.responseData?.data?.Result?.KundaliList);
      setLoading(false);
    }
  }

  const handlePreviewClick = (kid) => {
    setLoading(true);
    router.push(`kundli/preview?kid=${kid}`)
  }


  // Hooks
  useEffect(() => {
    getAllKundli();
  }, [])

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  const handleFilterModelChange = (e) => {
    console.log(e?.quickFilterValues[0])
  }


  return (
    <>

      {loading && <Loader />}
      <Grid container spacing={6}>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4'>
              <Grid item xs={12} md={12} >
                <div className='flex justify-end gap-4' xs={12} md={12} xl={12}>
                  <Button
                    variant='contained'
                    className='capitalize'
                    onClick={handleAddClick}
                  >
                    New Kundli
                  </Button>
                </div>
              </Grid>
              <div className="KundliList">
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
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  pageSizeOptions={[10]}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                    pinnedColumns: { left: ['FirstName'], left: ['iconColumn'] }
                  }}
                  slots={{ toolbar: CustomToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}
                  onFilterModelChange={handleFilterModelChange}
                />
              </div>
            </CardContent>
          </Card>

        </Grid>
      </Grid>

      {open && (
        <AddKundliPopUp open={open} handleAddClose={handleAddClose} getAllKundli={getAllKundli} />
      )}

    </>
  )
}
