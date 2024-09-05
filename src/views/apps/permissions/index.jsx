// 'use client';

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';


// function EnhancedTableHead(props) {
//   const { order, orderBy } = props;

//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align='center'
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             {headCell.label}
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//       ]}
//     >
//       <Typography
//         sx={{ flex: '1 1 100%' }}
//         variant="h6"
//         id="tableTitle"
//         component="div"
//       >
//         User Permission
//       </Typography>
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
//   const [rows, setRows] = useState(initialRows);
//   const [selected, setSelected] = useState([]);

//   const handleCheckboxChange = (index, type) => {
//     const updatedRows = [...rows];
//     updatedRows[index].rightsAccess[type] = !updatedRows[index].rightsAccess[type];
//     setRows(updatedRows);
//   };

//   const handleButtonClick = () => {
//     console.log('Updated rows data:', rows);
//     // You can now send this data to your backend or perform any other operation.
//   };
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     if (value) {
//       setSelectedValue(value);
//     }
//   };
//   return (
//     <>
//       <Grid item xs={12} md={12}>
//         <Card>
//           <CardContent>
//             <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
//               <Grid item xs={8}>
//                 <EnhancedTableToolbar numSelected={selected.length} />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Select Item"
//                   value={selectedValue}
//                   fullWidth
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={handleClickOpen}>
//                           <i className="tabler-eye-off" />
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             <TableContainer sx={{ marginTop: 2 }}>
//               <Table
//                 sx={{ minWidth: 750 }}
//                 aria-labelledby="tableTitle"
//                 size="medium"
//               >
//                 <EnhancedTableHead
//                   order="asc"
//                   orderBy="Module"
//                 />
//                 <TableBody>
//                   {rows.map((item, index) => (
//                     <TableRow
//                       hover
//                       key={item.label}
//                       sx={{ cursor: 'pointer' }}
//                     >
//                       <TableCell
//                         component="th"
//                         id={item.label}
//                         scope="row"
//                         padding="normal"
//                         align="center"
//                         sx={{ fontSize: '14pt' }}
//                       >
//                         {item.label}
//                       </TableCell>
//                       <TableCell align="center">
//                         <Checkbox
//                           color="primary"
//                           checked={item.rightsAccess.read}
//                           onChange={() => handleCheckboxChange(index, 'read')}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <Checkbox
//                           color="primary"
//                           checked={item.rightsAccess.write}
//                           onChange={() => handleCheckboxChange(index, 'write')}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//               <Button variant="contained" color="primary" onClick={handleButtonClick}>
//                 Get Updated Data
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Grid>
//     </>
//   );
// }

'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useAuth } from '@/@core/contexts/authContext';
import Loader from '@/components/common/Loader/Loader';
import { GetUserAuthRule, GetUsers } from '@/app/Server/API/userPermission';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import UserPopUp from './user-popup/selectUser';


const initialRows = [
  {
    Label: "Home",
    Href: "/home",
    Icon: "tabler-smart-home",
    HasAccess: true,
    rightsAccess: [{
      read: true,
      write: true
    }]
  },
  {
    Label: "Kundli",
    Href: "/kundlipage",
    Icon: "tabler-smart-home",
    HasAccess: true,
    rightsAccess: [{
      read: true,
      write: true
    }]
  },
  {
    Label: "About",
    Href: "/about",
    Icon: "tabler-info-circle",
    HasAccess: false,
    rightsAccess: [{
      read: true,
      write: false
    }]
  }
];


const headCells = [
  {
    id: 'Module',
    numeric: false,
    disablePadding: false,
    label: 'Module',
  },
  {
    id: 'read',
    numeric: true,
    disablePadding: false,
    label: 'Read',
  },
  {
    id: 'write',
    numeric: true,
    disablePadding: false,
    label: 'Write',
  },
];


function EnhancedTableHead(props) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: '12pt', fontFamily: 'Segoe UI' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          fontSize: '12pt',
          fontFamily: 'Segoe UI'
        },
      ]}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        User Permission
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();



  console.log("user : ", user)
  const fetchUsers = async (transactionID) => {
    try {
      setLoading(true)
      console.log("transactionID =========>", transactionID)
      const response = await GetUsers(transactionID)
      if (response.hasError) {
        setLoading(false)
        return toastDisplayer("error", response?.errorMessage)
      }
      setLoading(false)
      console.log("response : ", response.responseData)
      setUsersData(response.responseData)

    } catch (error) {

    }
  }

  const fetchUserAuthRule = async (transactionID, Email) => {
    try {
      setLoading(true)
      const response = await GetUserAuthRule(transactionID, Email)
      if (response.hasError) {
        setLoading(false)
        return toastDisplayer("error", response?.errorMessage)
      }
      setLoading(false)
      console.log("responseData : ", response.responseData)
      setRows(response.responseData)

    } catch (error) {

    }
  }
  React.useEffect(() => {
    if (user?.transactionID) {
      fetchUsers(user?.transactionID)
    }
  }, [user])

  const handleCheckboxChange = (index, type) => {
    const updatedRows = [...rows];
    updatedRows[index].rightsAccess[0][type] = !updatedRows[index].rightsAccess[0][type];
    setRows(updatedRows);
  };

  const handleButtonClick = () => {
    console.log('Updated rows data:', rows);
    // You can now send this data to your backend or perform any other operation.
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleAddClose = () => {
    // const handleAddClose = (value) => {
    setOpen(false);
    // if (value) {
    //   setSelectedValue(value);
    // }
  };

  const handleSelectUser = (user) => {
    setSelectedValue(user);
  };

  React.useEffect(() => {
    if (user?.transactionID && selectedValue != "") {
      fetchUserAuthRule(user?.transactionID, selectedValue.email)
    }
    console.log("selectedValue : ", selectedValue)
  }, [selectedValue])


  return (
    <>
      {open && (
        <UserPopUp open={open} handleAddClose={handleAddClose} userData={usersData} onSelectUser={handleSelectUser} />
      )}
      {loading && <Loader />}
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
              <Grid item xs={8}>
                <EnhancedTableToolbar numSelected={selected.length} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Select User"
                  value={selectedValue ? selectedValue.email : ""}
                  placeholder='Select user to give permission'
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {selectedValue && (
                          <IconButton onClick={() => setSelectedValue("")} sx={{ p: 1 }}>
                            X
                          </IconButton>
                        )}
                        <IconButton onClick={handleClickOpen} sx={{ p: 1 }}>
                          <i className="tabler-circle-arrow-up-right " style={{ fontSize: '24px !important' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ fontSize: '12pt', fontFamily: 'Segoe UI' }}
                />
              </Grid>
            </Grid>

            <TableContainer sx={{ marginTop: 2 }}>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  order="asc"
                  orderBy="Module"
                />
                <TableBody>
                  {rows.map((item, index) => (
                    <TableRow
                      hover
                      key={item.Label}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={item.Label}
                        scope="row"
                        padding="normal"
                        align="center"
                        sx={{ fontSize: '12pt', fontFamily: 'Segoe UI' }}
                      >
                        {item.Label}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          color="primary"
                          checked={item.rightsAccess[0].read}
                          onChange={() => handleCheckboxChange(index, 'read')}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          color="primary"
                          checked={item.rightsAccess[0].write}
                          onChange={() => handleCheckboxChange(index, 'write')}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Get Updated Data
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
