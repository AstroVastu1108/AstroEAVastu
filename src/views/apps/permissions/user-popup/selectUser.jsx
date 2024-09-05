// import React, { useState } from 'react'
// import { Button,CircularProgress,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
// import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

// function UserPopUp({ open, handleAddClose, userData }) {

//   const [isDisable, setIsDisable] = useState(false);
// //   const [userData, setUserData] = useState([])

//   const [errors, setErrors] = useState({
//     FirstName: false,
//     LastName: false,
//     MiddleName: false,
//     Gender: false,
//     BirthDate: false,
//     Country: false,
//     BirthTime: false,
//     CityID: false,
//     Prakriti: false
//   })
  

//   const [query, setQuery] = useState('')

//   const handleSubmit = async () => {
//     // event.preventDefault()

//   }

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer>
//         <GridToolbarQuickFilter />
//       </GridToolbarContainer>
//     );
//   }

//   const columns = [
//     {
//         field: 'email', flex: 1, headerName: 'User Email', headerClassName: 'rowheader',
//         headerAlign: 'left'
//     },
//     {
//         field: 'phone', flex: 1, headerName: 'User Phone No.', headerClassName: 'rowheader',
//         headerAlign: 'left'
//     },
//     {
//         field: 'gender', flex: 1, headerName: 'User Gender', headerClassName: 'rowheader',
//         headerAlign: 'left'
//     },
// ]

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleAddClose}
//         maxWidth="md"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
//         fullWidth={true}  // Ensures the dialog takes up full width of the container
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event) => {
//             event.preventDefault();
//             handleSubmit();
//           },
//         }}
//       >
//         <DialogTitle className='PopupHeader'>Select User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Select the user to whom you want to give permissions.
//           </DialogContentText>
//           <Grid className='mt-4 p-3' container spacing={5}>
//                 <DataGrid
//                   getRowId={(row) => row.email}
//                   rows={userData}
//                   columns={columns}
//                   disableColumnMenu
//                   rowHeight={50}
//                   columnHeaderHeight={60}
//                   disableColumnResize
//                   disableRowSelectionOnClick
//                   pagination
//                   disableColumnFilter
//                   disableColumnSelector
//                   disableDensitySelector
//                   pageSizeOptions={[5]}
//                   initialState={{
//                     pagination: { paginationModel: { pageSize: 10 } },
//                   }}
//                   slots={{ toolbar: CustomToolbar }}
//                   slotProps={{
//                     toolbar: {
//                       showQuickFilter: true,
//                     },
//                   }}
//                 />
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddClose}>Cancel</Button>
//           <Button variant='outlined' type='submit' disabled={isDisable} >
//             {isDisable ? <>
//               <CircularProgress size={14} aria-label="Wait" />
//               <span style={{ marginLeft: 8 }}>Selecting ...</span>
//             </> : 'Select'}
//           </Button>
         
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }

// export default UserPopUp
import React, { useState } from 'react';
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

function UserPopUp({ open, handleAddClose, userData, onSelectUser }) {
  const [isDisable, setIsDisable] = useState(false);
  const [user, setUser] = useState([]);

  const columns = [
    {
        field: 'select',
        headerName: '',
        width: 50,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <Checkbox
            checked={user?.email === params.row.email}
          />
        ),
      },
    { field: 'email', flex: 1, headerName: 'User Email', headerClassName: 'rowheader', headerAlign: 'left' },
    { field: 'phone', flex: 1, headerName: 'User Phone No.', headerClassName: 'rowheader', headerAlign: 'left' },
    { field: 'gender', flex: 1, headerName: 'User Gender', headerClassName: 'rowheader', headerAlign: 'left' },
  ];

  const handleSubmit = ()=>{
    onSelectUser(user);
    handleAddClose();
  }

  const handleRowSelection = (params) => {
    const selectedUser = params.row;
    setUser(selectedUser)
    // onSelectUser(selectedUser);
    // handleAddClose();
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleAddClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
        },
      }}
    >
      <DialogTitle className='PopupHeader'>Select User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the user to whom you want to give permissions.
        </DialogContentText>
        <Grid className='mt-4 p-3' container spacing={5}>
          <DataGrid
            getRowId={(row) => row.email}
            rows={userData}
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
            pageSizeOptions={[5]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            slots={{ toolbar: CustomToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            onRowClick={handleRowSelection}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddClose}>Cancel</Button>
        <Button variant='outlined' disabled={isDisable} onClick={handleSubmit}>
          {isDisable ? <>
            <CircularProgress size={14} aria-label="Wait" />
            <span style={{ marginLeft: 8 }}>Selecting ...</span>
          </> : 'Select'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserPopUp;
