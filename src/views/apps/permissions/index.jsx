'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button, Card, CardContent,
  createTheme, Grid, IconButton, InputAdornment, TextField, ThemeProvider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from '@/@core/contexts/authContext';
import Loader from '@/components/common/Loader/Loader';
import { GetUserAuthRule, GetUsers, saveUserAuthRule } from '@/app/Server/API/userPermission';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import UserPopUp from './user-popup/selectUser';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import { LoadingButton } from '@mui/lab';
import "./permissions.css";

const initialRows = [
  { Label: "Kundli", Href: "/kundlipage", Icon: "tabler-smart-home", HasAccess: false, rightsAccess: [{ read: false, write: false }] },
  { Label: "User", Href: "/user", Icon: "tabler-user-pentagon", HasAccess: false, rightsAccess: [{ read: false, write: false }] }
];

const headCells = [
  { id: 'Module', label: 'Module' },
  { id: 'read', label: 'Read', align: 'center' },
  { id: 'write', label: 'Write', align: 'center' }
];

function EnhancedTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label, align = 'left' }) => (
          <TableCell key={id} align={align} sx={{ fontSize: '12pt' }}>
            {label}
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

export default function EnhancedTable() {
  const { user } = useAuth();
  const [rows, setRows] = useState(initialRows);
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [open, setOpen] = useState(false);

  const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          // root: { fontFamily: 'Segoe UI, Arial, sans-serif' },
          // cell: { fontFamily: 'Segoe UI, Arial, sans-serif' },
          // columnHeaders: { fontFamily: 'Segoe UI, Arial, sans-serif' },
          // toolbar: { fontFamily: 'Segoe UI, Arial, sans-serif' },
        },
      },
    },
  });

  useEffect(() => {
    if (user?.transactionID) {
      fetchUsers(user.transactionID);
    }
  }, [user]);

  useEffect(() => {
    if (user?.transactionID && selectedValue) {
      fetchUserAuthRule(user.transactionID, selectedValue.email);
    }
  }, [selectedValue, user]);

  const fetchUsers = async (transactionID) => {
    setLoading(true);
    try {
      const response = await GetUsers(transactionID);
      if (response.hasError) {
        toastDisplayer("error", response.errorMessage);
      } else {
        setUsersData(response.responseData);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchUserAuthRule = async (transactionID, email) => {
    setLoading(true);
    try {
      const response = await GetUserAuthRule(transactionID, email);
      if (response.hasError) {
        toastDisplayer("error", response.errorMessage);
      } else {
        setIsVisible(true);
        const updatedRows = initialRows.map(row => {
          const updatedRow = response.responseData.find(data => data.Href === row.Href);
          return updatedRow ? { ...row, HasAccess: updatedRow.HasAccess, rightsAccess: updatedRow.rightsAccess } : row;
        });
        setRows(updatedRows);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (index, type) => {
    const updatedRows = [...rows];
    updatedRows[index].rightsAccess[0][type] = !updatedRows[index].rightsAccess[0][type];
    setRows(updatedRows);
  };

  const handleButtonClick = async () => {
    if (!user?.transactionID) return toastDisplayer("error", "User Transaction ID not found.");
    if (!selectedValue.email) return toastDisplayer("error", "Selected user not found.");

    setLoading(true);
    try {
      const updatedRows = rows.map(row => ({
        ...row,
        HasAccess: row.rightsAccess.some(access => access.read || access.write)
      }));
      const response = await saveUserAuthRule(user.transactionID, selectedValue.email, updatedRows);
      if (response.hasError) {
        toastDisplayer("error", response.errorMessage);
      } else {
        setIsVisible(false);
        setSelectedValue("");
        // toastDisplayer("success", response.responseData.statusMsg);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <UserPopUp open={open} handleAddClose={() => setOpen(false)} userData={usersData} onSelectUser={setSelectedValue} />
      )}
      {loading && <Loader />}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-0'>
              <PageTitle
                title="User Permission"
                endCmp={
                  <TextField
                    label="Select User"
                    value={selectedValue?.email || ""}
                    placeholder='Select user to give permission'
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {selectedValue && (
                            <IconButton onClick={() => setSelectedValue("")} sx={{ p: 1 }}>
                              <i className="tabler-circle-x" style={{ fontSize: '18px' }} />
                            </IconButton>
                          )}
                          <IconButton className='HelperBtn' onClick={() => setOpen(true)} sx={{ p: 1 }}>
                            <i className="tabler-circle-arrow-up-right" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ fontSize: '12pt' }}
                  />
                }
              />

              {isVisible && (
                <Box className="p-5">
                  <ThemeProvider theme={customTheme}>
                    <Table sx={{ minWidth: 750 }} size="medium">
                      <EnhancedTableHead order="asc" orderBy="Module" />
                      <TableBody>
                        {rows.map((item, index) => (
                          <TableRow hover key={item.Label} sx={{ cursor: 'pointer' }}>
                            <TableCell align="center" sx={{ fontSize: '12pt' }}>
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
                  </ThemeProvider>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <LoadingButton
                      variant='contained'
                      onClick={handleButtonClick}
                      loading={loading}
                      loadingPosition="start"
                      sx={{ width: '200px' }}
                      className='mt-4 d-flex justify-content-end'
                      type='submit'
                      color="primary"
                    >
                       {loading ? "Loading ...": "Give Permission"}
                    </LoadingButton>
                    {/* <Button variant="contained" color="primary" onClick={handleButtonClick}>
                      Give Permission
                    </Button> */}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
