import { Autocomplete, Box, Button, Card, CardContent, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, Select, TextField, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"

import { useEffect, useRef, useState } from "react";
import { DeleteKundli, GetKundliDataAPI } from "@/app/Server/API/kundliAPI";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader/Loader";
import "./devtaVastu.css"
import PageTitle from "@/components/common/PageTitle/PageTitle";
//import KundliDataGrid from "./KundliGrid/kundliGrid";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { GetConfig } from "@/app/Server/API/configuration";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import PreviewActions from "../../kundli/preview/PreviewActions";
import { deleteVastuLayoutsByID, getVastuLayoutsListing } from "@/app/Server/API/vastulayout";
import RemoveVastuLayoutPopUp from "@/components/devta-vastu/RemoveVastuLayoutPopUp/DiscardPopUp";



export default function DevtaVastuMain() {

  const router = useRouter();

  const [deletePopUp, setDeletePopUp] = useState(false)
  const [selectedTab,setSelectedTab] = useState([])
  const highlightText = (text, searchText) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, 'gi');
    const safeText = String(text);
    const parts = safeText.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <span className="font-ea-sb text-[var(--green-color)]" key={index}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    // Extract time components
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Format the output
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return { formattedDate, formattedTime };
  }

  const handleDelete = async () => {
    const res = await deleteVastuLayoutsByID(selectedTab?.VPID);
    if (res.hasError) {
      setLoading(false);
      // if (response.errorMessage) {
      //   // Object.keys(response.errorMessage).forEach((key) => {
      //   //   response.errorMessage[key].forEach((message) => {
      //   //     toast.error(`${key}: ${message}`);
      //   //   });
      //   // });
      // }
      // return;
      // return toastDisplayer("error", res.error);
      return toast.error(res.error);
    } else {
      const index = vastuListingData.findIndex(item => item.VPID === selectedTab?.VPID);
      if (index !== -1) {
        getAllVastuListing(1, searchValue)
        toast.success("Kundli deleted successfully.");
      }
      setLoading(false);
    }
  }

  // vars
  const columns = [
    {
      field: 'ProjectName',
      headerName: 'Project Name',
      headerClassName: 'rowheader',
      flex: 2,
      headerAlign: 'left',
      renderCell: (params) => {
        var projectName = `${params.row.ProjectName}`;
        const searchText = searchValue;
        return <span className="font-ea-sb">{highlightText(projectName, searchText)}</span>;
      },
    },
    {
      field: 'ClientName',
      minWidth: 50,
      headerName: 'Client Name',
      headerClassName: 'rowheader',
      width: 200,
      headerAlign: 'left',
      renderCell: (params) => {
        const ClientName = params.value || '';
        const searchText = searchValue;
        return <span>{highlightText(ClientName, searchText)}</span>;
      }
    },
    {
      field: 'CreateDateTime',
      minWidth: 100,
      headerName: 'Date Created',
      headerClassName: 'rowheader',
      width: 150,
      headerAlign: 'left',
      renderCell: (params) => {
        const dateValue = params.row.CreateDateTime;
        const searchText = searchValue;
        const { formattedDate, formattedTime } = formatDateTime(dateValue);
        const dateVal = highlightText(formattedDate, searchText)
        const timeVal = highlightText(formattedTime, searchText)

        return <div className="flex justify-between">
          <div className="font-ea-sb">{dateVal} </div>
          <div className="font-ea-n">{timeVal}</div>
        </div>
      }
    },
    {
      field: 'EditDateTime',
      minWidth: 100,
      headerName: 'Date Modified',
      headerClassName: 'rowheader',
      width: 150,
      headerAlign: 'left',
      renderCell: (params) => {
        const dateValue = params.row.AuditDate;
        const searchText = searchValue;

        const { formattedDate, formattedTime } = formatDateTime(dateValue);
        const dateVal = highlightText(formattedDate, searchText)
        const timeVal = highlightText(formattedTime, searchText)
        return <div className="flex justify-between">
          <div className="font-ea-sb">{dateVal} </div>
          <div className="font-ea-n">{timeVal}</div>
        </div>
      }
    },
    {
      field: 'TabCount',
      minWidth: 100,
      headerName: 'Total Pages',
      headerClassName: 'rowheader',
      width: 75,
      headerAlign: 'left',
      renderCell: (params) => {
        const ClientName = params.value || '';
        const searchText = searchValue;
        return <span>{highlightText(ClientName, searchText)}</span>;
      }
    },
    {
      field: 'iconColumn', // Unique field name for this column
      type: "actions",
      headerName: '',
      minWidth: 100,
      width: 50,
      headerClassName: 'rowheader',
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const handlePreview = () => {
          handlePreviewClick(params, params?.row?.VPID);
          handleClose();
        };


        const handleRemoveOpen = () => {
          setSelectedTab(params?.row)
          setDeletePopUp(true)
          handleClose();
        }

        return (
          <>
            <IconButton onClick={handleClick}>
              <i className={'tabler-dots-vertical bg-primary'} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handlePreview} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Open</MenuItem>
              <MenuItem onClick={handleRemoveOpen} className="flex gap-1"><i className={'tabler-trash me-2'} />Delete</MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [removePopUp, setSetRemovePopUp] = useState(false);
  const [vastuListingData, setVastuListingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [AKundliData, setAKundliData] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const printRef = useRef(null);

  // func
  const handleAddClick = () => {
    window.open(`devta-vastu/NEW`, '_blank');
  }


  const getAllVastuListing = async (pageNo, searchValue = "") => {
    // setLoading(true);
    const res = await getVastuLayoutsListing(10, pageNo, searchValue);
    if (res.hasError) {
      setLoading(false);
      // return toastDisplayer("error", res.error);
    } else {
      setVastuListingData(res?.responseData?.Result?.VastuLayouts);
      setTotalRowCount(res?.responseData?.Result?.Pagination?.TotalRecords)
      setLoading(false);
    }
  }

  const handlePreviewClick = (event, kid) => {
    window.open(`devta-vastu/${kid}`, '_blank');
  }
  // const handlePreviewClick = (event, kid) => {
  //   window.open(`kundali/${kid}`, '_blank');
  // }


  // Hooks
  useEffect(() => {
    getAllVastuListing(1, "")
  }, []);

  const handleClearSearch = () => {
    setSearchValue("");
    getAllVastuListing(1, "")
  }

  useEffect(() => {
    if (searchValue == "") {
      getAllVastuListing(1, "")
    }
  }, [searchValue])

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="d-flex justify-content-between p-0 w-full align-items-center">
        <PageTitle title={"Vastu Layouts"} endCmp={
          <>
            <TextField
              placeholder="Search..."
              label=""
              variant="standard"
              fullWidth
              sx={{ border: 1, borderColor: "var(--border-color)", padding: "5px 8px", borderRadius: "4px" }}
              value={searchValue}
              onChange={handleInputChange}
              autoFocus={!open}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="tabler-search" aria-label="search icon"></i>
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} edge="end" aria-label="clear search">
                      <i className="tabler-x"></i>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <PreviewActions value={"New Vastu Griding"} onButtonClick={handleAddClick} icon={'tabler-plus'} />
          </>
        } />
      </GridToolbarContainer>
    );
  }

  const fetchData = debounce(async (query) => {
    if (query.length > 0 || query.length !== 0 && searchValue != "") {
      await getAllVastuListing(1, query)
      resetPagination();
    } else {
      getAllVastuListing(1, "")
    }
  }, 100)

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchValue(e.target.value);
    if (query.length > 3) {
      fetchData(query);
    } else {
      getAllVastuListing(1, "")
    }
  }

  const handleFilterModelChange = async (filterModel) => {
    if (filterModel.quickFilterValues.length) {
      let query = filterModel.quickFilterValues.join(' ');
      query = query.replace(/:/g, '');
      setSearchValue(query);
      if (query.length >= 3)
        fetchData(query);
    } else {
      setSearchValue("");
      getAllVastuListing(1, "")
    }
  }

  const fetchDataForPage = (e) => {
    setPageNo(parseInt(e) + 1)
    getAllVastuListing(parseInt(e) + 1, searchValue)
  }


  const resetPagination = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
  };


  return (
    <>

      {loading && <Loader />}

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-2 p-0'>
              <div className="VastuLayoutList">
                <Box>
                  <DataGrid
                    className="VastuLayoutGrid"
                    getRowClassName={(params) =>
                      params.row.IsCurrent ? 'highlight-row' : ''
                    }
                    onRowDoubleClick={(e) => { handlePreviewClick(e, e.row.VPID) }}
                    onFilterModelChange={handleFilterModelChange}
                    getRowId={(row) => row.VPID}
                    rows={vastuListingData}
                    columns={columns}
                    disableColumnMenu
                    rowHeight={45}
                    columnHeaderHeight={45}
                    disableColumnResize
                    disableRowSelectionOnClick
                    pageSizeOptions={[10]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    filterMode="server"
                    rowCount={totalRowCount}
                    onPaginationModelChange={(paginationModel) => {
                      setPaginationModel(paginationModel);
                      fetchDataForPage(paginationModel.page);
                    }}
                    slots={{ toolbar: CustomToolbar }}
                  />
                </Box>
              </div>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
      {deletePopUp && (
        <RemoveVastuLayoutPopUp
          open={deletePopUp}
          handleClose={()=>{setDeletePopUp(!deletePopUp)}}
          TabData={selectedTab}
          handleDeleteClick={handleDelete}
        />
      )}
    </>
  )
}
