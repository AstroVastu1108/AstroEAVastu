import { Box, Button, Card, CardContent, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";
import { useEffect, useRef, useState } from "react";
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
      field: 'FirstName', headerName: 'Full Name', headerClassName: 'rowheader',
      minWidth: 200,
      flex: 2,
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
      minWidth: 100,
      flex: 1,
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
      field: 'Gender', minWidth: 100, headerName: 'Gender', headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left'
    },
    {
      field: 'BirthDate', minWidth: 100, headerName: 'BirthDate', headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'BirthTime', minWidth: 100, headerName: 'BirthTime', headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left'
    },
    {
      field: 'Country', minWidth: 100, headerName: 'Country', headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left'
    },
    {
      field: 'City', minWidth: 100, headerName: 'City', headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left'
    },
    {
      field: 'Prakriti', minWidth: 100, headerName: 'Prakriti', headerClassName: 'rowheader',
      flex: 1,
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
    CityID: { CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998', City: 'Surat, Gujarat' },
    isUpdate: false,
    City: 'Surat'
  })
  const [totalRowCount, setTotalRowCount] = useState(1000);
  const [pageNo, setPageNo] = useState(1);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Focus on the search bar when the component mounts
    }
  }, [searchInputRef]);


  // func
  const handleAddClick = () => {
    setUserData({
      KundaliID: '',
      FirstName: '',
      LastName: '',
      MiddleName: '',
      Gender: 'Male',
      BirthDate: null,
      Country: { iso2: 'IN', name: 'India' },
      BirthTime: null,
      // CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998',
      CityID: { CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998', City: 'Surat, Gujarat' },
      isUpdate: false,
      City: 'Surat'
    })
    setOpen(true);
  }
  const handleAddClose = () => {
    setOpen(false)
  }

  const getAllKundli = async (pageNo, searchValue) => {
    // setLoading(true);
    const res = await GetKundliDataAPI(10, pageNo, searchValue);
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
    getAllKundli(1, "");
  }, [])

  function CustomToolbar({searchInputRef}) {
    return (
      <GridToolbarContainer className="px-5  d-flex justify-content-between align-items-center">
        <div className="me-auto" style={{ fontSize: '16px', fontWeight: '500', color: "#2F2B3DB3" }}>Review your Kundli records below</div>
        <GridToolbarQuickFilter inputRef={searchInputRef} className="SearchBar" />
      </GridToolbarContainer>
    );
  }

  const fetchData = debounce(async (query) => {
    if (query.length > 0) {
      await getAllKundli(pageNo,query);
      if(searchInputRef.current)
        searchInputRef.current.focus();
    }
  }, 500)

  const handleFilterModelChange = (filterModel) => {
    if (filterModel.quickFilterValues) {
      const query = filterModel.quickFilterValues.join(' ');
      fetchData(query);
    }
  }

  const fetchDataForPage = (e) => {
    setPageNo(parseInt(e) + 1)
    getAllKundli(parseInt(e) + 1, searchInputRef.current?.value ? searchInputRef.current?.value : "");
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
                  <ThemeProvider theme={customTheme}>
                    <DataGrid
                      className="KundliListGrid"
                      onFilterModelChange={(e)=>handleFilterModelChange(e,searchInputRef)}
                      getRowId={(row) => row.KundaliID}
                      rows={kundliData}
                      columns={columns}
                      disableColumnSorting
                      disableColumnMenu
                      rowHeight={45}
                      columnHeaderHeight={45}
                      disableColumnResize
                      disableRowSelectionOnClick
                      pageSizeOptions={[5]}
                      initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                        pinnedColumns: { left: ['FirstName'], left: ['iconColumn'] }
                      }}
                      paginationMode="server"
                      filterMode="server"
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
