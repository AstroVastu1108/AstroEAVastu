import { Box, Card, CardContent, createTheme, Grid, IconButton, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader/Loader";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import AddClientPopUp from "./addClient/addClient";
import PreviewActions from "../kundli/preview/PreviewActions";
import { CreateClient, DeleteClient, GetClients } from "@/app/Server/API/client";
import { useAuth } from "@/@core/contexts/authContext";
import { toastDisplayer } from "@/@core/components/toast-displayer/toastdisplayer";
import VerificationPopup from "@/@core/components/custom-verification/verification-popup";

export default function ClientMain() {
  const { user } = useAuth();
  const router = useRouter()

  const handleClientDetail = (data)=>{
    router.push(`clientDetail/${data.clientID}`)
  }

  // vars
  const columns = [
    { field: 'clientID', headerName: 'Client ID', width: 350, headerClassName: 'rowheader', },
    { field: 'name', headerName: 'Name', width: 250, headerClassName: 'rowheader', renderCell: (params) => (
      <>
        <span className="font-ea-sb">{params.row.name}</span>
      </>
    ), },
    { field: 'status', headerName: 'Status', width: 80, headerClassName: 'rowheader', },
    { field: 'aliasID', headerName: 'Alias ID', width: 150, headerClassName: 'rowheader', },
    { field: 'person', headerName: 'Person', width: 150, headerClassName: 'rowheader', },
    { field: 'reference', headerName: 'Reference', width: 180, headerClassName: 'rowheader', },
    { field: 'building', headerName: 'Building', width: 200, headerClassName: 'rowheader', },
    { field: 'lane', headerName: 'Lane', width: 150, headerClassName: 'rowheader', },
    { field: 'area', headerName: 'Area', width: 150, headerClassName: 'rowheader', },
    { field: 'country', headerName: 'Country', width: 150, headerClassName: 'rowheader', },
    { field: 'state', headerName: 'State', width: 150, headerClassName: 'rowheader', },
    { field: 'city', headerName: 'City', width: 250, headerClassName: 'rowheader', },
    { field: 'pin', headerName: 'Pin', width: 100, headerClassName: 'rowheader', },
    { field: 'phone1', headerName: 'Phone 1', width: 130, headerClassName: 'rowheader', },
    { field: 'phone2', headerName: 'Phone 2', width: 130, headerClassName: 'rowheader', },
    { field: 'phone3', headerName: 'Phone 3', width: 130, headerClassName: 'rowheader', },
    { field: 'phone1Name', headerName: 'Phone 1 Name', width: 180, headerClassName: 'rowheader', },
    { field: 'phone2Name', headerName: 'Phone 2 Name', width: 180, headerClassName: 'rowheader', },
    { field: 'phone3Name', headerName: 'Phone 3 Name', width: 180, headerClassName: 'rowheader', },
    { field: 'email1', headerName: 'Email', width: 200, headerClassName: 'rowheader', },
    { field: 'gstin', headerName: 'GSTIN', width: 150, headerClassName: 'rowheader', },
    {
      field: 'iconColumn', // Unique field name for this column
      headerName: '',
      width: 150,
      headerClassName: 'rowheader',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleClientDetail(params?.row)}>
            <i
              className={'tabler-arrow-up-right bg-primary'}
            />
          </IconButton>
          <IconButton >
            <i
              className={'tabler-edit bg-primary'}
            />
          </IconButton>
          <IconButton onClick={() => handleOpenDeletePopup(params?.row)}>
            <i
              className={'tabler-trash bg-primary'}
            />
          </IconButton>
        </>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [selectedClientData, setSelectedClientData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [totalRowCount, setTotalRowCount] = useState(1000);

  const handleOpenDeletePopup = (data) => {
    setSelectedClientData(data);
    return setOpenDelete(true);
  }

  // func
  const handleAddClick = () => {
    setOpen(true);
  }

  const handleAddClose = () => {
    setOpen(false)
  }

  const handleDeletClose = () => {
    setOpenDelete(false)
  }

  const getAllClients = async (transactionID) => {
    setLoading(true);
    const res = await GetClients(transactionID);
    if (res.hasError) {
      setLoading(false);
      return toastDisplayer("error", res.error);
    } else {
      setClientData(res?.responseData);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.transactionID) {
      getAllClients(user?.transactionID);
    }
  }, [user])

  const handleSaveClient = async (payload) => {
    try {
      const response = await CreateClient(payload);
      if (response.hasError) {
        setIsSaving(false)
        return toastDisplayer("error", response.errorMessage);
      } else {
        setOpen(false);
        // toastDisplayer("success", "Client added successfully.");
        if (user?.transactionID) {
          getAllClients(user?.transactionID);
        }
      }
    } catch (error) {
      return toastDisplayer("error", error);
    }
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="px-5  d-flex justify-content-between align-items-center">

        <div className="me-auto" >  <GridToolbarColumnsButton />
          {/* <GridToolbarExport className="SearchBar" /> */}
        </div>
        <GridToolbarQuickFilter className="SearchBar" />

      </GridToolbarContainer>
    );
  }

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

  const handleClientDelete = async ()=>{

    try {
      if (selectedClientData != null && user?.transactionID) {
        const response = await DeleteClient(selectedClientData?.clientID, user?.transactionID);
        if (response.hasError) {
          return toastDisplayer("error", response.errorMessage);
        } else {
          setOpenDelete(false);
          // toastDisplayer("success", "Client deleted successfully.");
          if (user?.transactionID) {
            getAllClients(user?.transactionID);
          }
        }
      }
    } catch (error) {
      return toastDisplayer("error", error);
    }
  }


  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={6}>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-0'>
              <PageTitle title={"Client List"} endCmp={<PreviewActions value={"New Client"} onButtonClick={handleAddClick} />
              } />
              <div className="KundliList">

                  <ThemeProvider theme={customTheme}>
                    <DataGrid
                      className="KundliListGrid"
                      getRowClassName={(params) =>
                        params.row.IsCurrent ? 'highlight-row font-ea-sb' : ''
                      }
                      sx={{
                        '& .MuiDataGrid-row:nth-of-type(odd)': {
                          backgroundColor: '#ffffff', // Light color for odd rows
                        },
                        '& .MuiDataGrid-row:nth-of-type(even)': {
                          backgroundColor: '#f5f5f5', // White color for even rows
                        },
                        '& .MuiDataGrid-row:hover': {
                          color:'var(--primary-color) !important',
                          backgroundColor: 'var(--secondary-soft-color) !important',
                        },
                      }}
                      rows={clientData}
                      columns={columns}
                      getRowId={(row) => row.clientID}
                      rowHeight={45}
                      disableColumnMenu
                      disableColumnResize
                      disableRowSelectionOnClick
                      initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                        columns: {
                          columnVisibilityModel: {
                            person:false,
                            reference:false,
                            building:false,
                            lane:false,
                            pin:false,
                            state:false,
                            area:false,
                            phone2:false,
                            phone3:false,
                            phone2Name:false,
                            gstin:false,
                            phone3Name:false,
                            aliasID: false,
                            clientID: false,
                            phone2: false,
                            phone3: false,
                            phone2Name: false,
                            phone3Name: false
                          },
                        },
                      }}
                      paginationMode="client"
                      slots={{ toolbar: CustomToolbar }}
                      slotProps={{ toolbar: { showQuickFilter: true } }}
                    />
                  </ThemeProvider>


              </div>
            </CardContent>
          </Card>

        </Grid>
      </Grid>

      {open && (
        <AddClientPopUp open={open} handleAddClose={handleAddClose} saveClient={handleSaveClient} />
      )}

      {openDelete && (
        <VerificationPopup open={openDelete} cancelBtnFunction={handleDeletClose} cancelBtnTxt={"Cancel"} headerMessage={"Are you sure you want to delete client ?"} descriptionMessage={"If you are deleting client then you can`t revert it back."} successBtnFunction={handleClientDelete} successBtnTxt={"Delete"} />
      )}

    </>
  )
}
