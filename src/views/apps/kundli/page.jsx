import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";
import { useEffect, useState } from "react";
import AddKundliPopUp from "./addKundli/addKundli";
import { GetKundliDataAPI } from "@/app/Server/API/kundliAPI";
import classNames from "classnames";
import { useRouter } from "next/navigation";

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
        <IconButton onClick={() => handlePreviewClick(params?.row?.KundaliID)}>
          <i
            className={'tabler-arrow-up-right bg-primary'}
          />
        </IconButton>
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
    {
      field: 'iconColumn', // Unique field name for this column
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handlePreviewClick(params?.row?.KundaliID)}>
          <i
            className={'tabler-arrow-up-right bg-primary'}
          />
        </IconButton>
      ),
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
    setLoading(false);
    if (res.hasError) {
      return toastDisplayer("error", res.error);
    } else {
      setKundliData(res?.responseData?.data?.Result?.KundaliList);
    }
  }

  const handlePreviewClick=(kid)=>{
    router.push(`kundli/preview?kid=${kid}`)
  }


  // Hooks
  useEffect(() => {
    getAllKundli();
  }, [])


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
                    onClick={handleAddClick}
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
                components={{ Toolbar: GridToolbar }}
              />
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
