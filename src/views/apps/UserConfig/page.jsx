import { Box, Button, Card, CardContent, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import Loader from "@/components/common/Loader/Loader";
import AddKundliPopUp from "../kundli/addKundli/addKundli";
import PreviewActions from "../kundli/preview/PreviewActions";
import { GetUsers } from "@/app/Server/API/userPermission";
import { useAuth } from "@/@core/contexts/authContext";
import { toastDisplayer } from "@/@core/components/toast-displayer/toastdisplayer";
import AddUserPopUp from "./addUser/addUser";
import { useImageVariant } from "@/@core/hooks/useImageVariant";

export default function UserListing({mode}) {


  // vars
  const userImg = './../../images/illustrations/auth/user.png'

  const userIllustration = useImageVariant(
    mode,
    userImg,
    // darkIllustration,
    // borderedLightIllustration,
    // borderedDarkIllustration
  )

  const columns = [
    // {
    //   field: 'KundaliID', headerName: 'Planet', headerClassName: 'rowheader',
    //   headerAlign: 'left'
    // },
    {
      field: 'email', flex: 2, headerName: 'Email', headerClassName: 'rowheader',
      headerAlign: 'left',
      // renderCell: (params) => (
      //   <>
      //     <span>{params.row.FirstName} {params.row.MiddleName} {params.row.LastName}</span>
      //   </>
      // ),
    },
    {
      field: 'gender', flex: 1, headerName: 'Gender', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'userAvatar', flex: 1, headerName: 'Avtar', headerClassName: 'rowheader',
      headerAlign: 'left',
      renderCell: (params) => {
        const base64Image = params.value;
        const defaultAvatar = "/images/avatars/user.jpg";
        return (
          <img
            src={base64Image ? `data:image/png;base64${base64Image}` : defaultAvatar}
            alt="User Avatar"
            style={{ width: 40, height: 40, borderRadius: '50%' }} // You can adjust styles as needed
          />
        );
      }
    },
    {
      field: 'phone', flex: 1, headerName: 'Mobile No', headerClassName: 'rowheader',
      headerAlign: 'left'
    },
    {
      field: 'iconColumn', // Unique field name for this column
      headerName: '',
      width: 100,
      headerClassName: 'rowheader',

      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params?.row)}>
            <i
              className={'tabler-edit bg-primary'}
            />
          </IconButton>
          {/* <IconButton onClick={() => handlePreviewClick(params?.row?.KundaliID)}>
            <i
              className={'tabler-delete bg-primary'}
            />
          </IconButton> */}
        </>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [AllUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    gender: "Male",
    cmpTransId: "",
    userAvatar: "",
    phone: "",
    isActive:"Y"
  })
  const { user } = useAuth();


  // func
  const handleAddClick = () => {
    setOpen(true);
  }
  const handleAddClose = () => {
    setOpen(false)
  }

  const getAllUsers = async () => {
    setLoading(true)
    const response = await GetUsers(user?.transactionID)
    if (response.hasError) {
      setLoading(false)
      return toastDisplayer("error", response?.errorMessage)
    }
    setLoading(false)
    setAllUserData(response.responseData)
  }

  const handleEditClick = (data) => {
    // setLoading(true);
    // data.isUpdate = true;
    // setUserData(data)
    // setOpen(true);
    // setLoading(false);
  }


  // Hooks
  useEffect(() => {
    if (user?.transactionID) {
      getAllUsers();
      setUserData(prev => ({
        ...prev,
        ["cmpTransId"]: user?.transactionID
      }))
    }
  }, [user])

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="px-5  d-flex justify-content-between align-items-center">
        <div className="me-auto" style={{ fontSize: '16px', fontWeight: '500', color: "#2F2B3DB3" }}>Review User records below</div>
        <GridToolbarQuickFilter className="SearchBar" />
      </GridToolbarContainer>
    );
  }

  const handleFilterModelChange = (e) => {
    // console.log(e?.quickFilterValues[0])
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
              <PageTitle title={"User List"} endCmp={<PreviewActions value={"Add User"} onButtonClick={handleAddClick} />
              } />
              <div className="KundliList">
                  <ThemeProvider theme={customTheme}>
                    <DataGrid
                      className="KundliListGrid"
                      onFilterModelChange={handleFilterModelChange}
                      getRowId={(row) => row.email}
                      rows={AllUserData}
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
        <AddUserPopUp open={open} handleAddClose={handleAddClose} getAllUsers={getAllUsers} setUserData={setUserData} userData={userData} />
      )}

    </>
  )
}
