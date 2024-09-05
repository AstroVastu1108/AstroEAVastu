import { Box, Button, Card, CardContent, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";
import { useEffect, useState } from "react";
import AddKundliPopUp from "./addKundli/addKundli";
import { GetKundliDataAPI } from "@/app/Server/API/kundliAPI";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader/Loader";
import "./Kundli.css"
import PageTitle from "@/components/common/PageTitle/PageTitle";

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
      headerClassName: 'rowheader',

      renderCell: (params) => (
        <>
          <IconButton onClick={() => handlePreviewClick(params?.row?.KundaliID)}>
            <i
              className={'tabler-arrow-up-right bg-primary'}
            />
          </IconButton>
          <IconButton onClick={() => handleEditClick(params?.row)}>
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
  const router = useRouter();
  const [userData, setUserData] = useState({
    KundaliID: '',
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Gender: 'Male',
    BirthDate: null,
    Country: { iso2: 'IN', name: 'India' },
    BirthTime: null,
    CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998',
    isUpdate: false
  })
  const [totalRowCount, setTotalRowCount] = useState(1000);



  // func
  const handleAddClick = () => {
    setUserData({
      FirstName: '',
      LastName: '',
      MiddleName: '',
      Gender: 'Male',
      BirthDate: null,
      Country: { iso2: 'IN', name: 'India' },
      BirthTime: null,
      CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998',
      isUpdate: false
    })
    setOpen(true);
  }
  const handleAddClose = () => {
    setOpen(false)
  }

  const getAllKundli = async (pageNo) => {
    setLoading(true);
    const res = await GetKundliDataAPI(10, pageNo);
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
    router.push(`preview?kid=${kid}`)
  }

  const handleEditClick = (data) => {
    setLoading(true);
    data.isUpdate = true;
    setUserData(data)
    setOpen(true);
    setLoading(false);
  }


  // Hooks
  useEffect(() => {
    getAllKundli(1);
  }, [])

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="px-5  d-flex justify-content-between align-items-center">
        <div className="me-auto" style={{ fontSize: '16px', fontWeight: '500', color: "#2F2B3DB3" }}>Review your Kundli records below</div>
        <GridToolbarQuickFilter className="SearchBar" />
      </GridToolbarContainer>
    );
  }

  const handleFilterModelChange = (e) => {
    console.log(e?.quickFilterValues[0])
  }

  const fetchDataForPage = (e) => {
    console.log(e)
    getAllKundli(parseInt(e)+1);
  }

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
    <>

      {loading && <Loader />}
      <Grid container spacing={6}>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-0'>
              <PageTitle title={"Kundli List"} endCmp={<PreviewActions value={"New Kundli"} onButtonClick={handleAddClick} />
              } />
              <div className="KundliList">
                <Box className="p-5">

                  {/* <DataGrid
                    className="KundliListGrid"
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
                  /> */}

                  <ThemeProvider theme={customTheme}>
                    <DataGrid
                      className="KundliListGrid"
                      onFilterModelChange={handleFilterModelChange}
                      getRowId={(row) => row.KundaliID}
                      rows={kundliData}
                      columns={columns}
                      disableColumnSorting
                      disableColumnMenu
                      rowHeight={45}
                      columnHeaderHeight={45}
                      disableColumnResize
                      disableRowSelectionOnClick
                      pageSizeOptions={[10]}
                      initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                        pinnedColumns: { left: ['FirstName'], left: ['iconColumn'] }
                      }}
                      paginationMode="server"
                      rowCount={totalRowCount} // Set the total count of rows
                      // paginationModel={paginationModel}
                      onPaginationModelChange={(paginationModel) => {
                        fetchDataForPage(paginationModel.page);
                      }}
                      slots={{ toolbar: CustomToolbar }}
                      slotProps={{ toolbar: { showQuickFilter: true } }}
                    />
                  </ThemeProvider>


                </Box>
              </div>
            </CardContent>
          </Card>

        </Grid>
      </Grid>

      {open && (
        <AddKundliPopUp open={open} handleAddClose={handleAddClose} getAllKundli={getAllKundli} setUserData={setUserData} userData={userData} />
      )}

    </>
  )
}
