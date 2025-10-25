import { Autocomplete, Box, Button, Card, CardContent, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, Select, TextField, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";
import { useEffect, useRef, useState } from "react";
import AddKundliPopUp from "./addKundli/addKundli";
import { DeleteKundli, GetKundliDataAPI, GetKundliIDDataAPI } from "@/app/Server/API/kundliAPI";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader/Loader";
import "./Kundli.css"
import PageTitle from "@/components/common/PageTitle/PageTitle";
//import KundliDataGrid from "./KundliGrid/kundliGrid";

import PreviewCard from "./preview/PreviewCard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getKundliPdf } from "@/app/Server/API/common";

import RemoveKundli from "./removeKundli/RemoveKundli";

// import { toastDisplayer } from "@/@core/components/toast-displayer/toastdisplayer";
import { useAuth } from "@/@core/contexts/authContext";
import { GetConfig } from "@/app/Server/API/configuration";
import dayjs from "dayjs";
import { null_ } from "valibot";
import DuplicateKundali from "./duplicateKundali/DuplicateKundali";
import { toast } from "react-toastify";



export default function KundliMain() {

  const router = useRouter();

  const highlightText = (text, searchText) => {
    if (!searchText) return text;
    if (text=="" || text == null || text == undefined) return;

    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);

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


  // vars
  const columns = [
    {
      field: 'FirstName',
      headerName: 'Full Name',
      headerClassName: 'rowheader',
      minWidth: 200,
      flex: 2,
      headerAlign: 'left',
      renderCell: (params) => {
        var fullName = `${params.row.FirstName} ${params.row.LastName}`;
        if (params.row.MiddleName != "") {
          fullName = `${params.row.FirstName} ${params.row.MiddleName} ${params.row.LastName}`;
        }
        const searchText = searchValue;
        // const searchText = searchInputRef.current.value;
        return <span className="font-ea-sb">{highlightText(fullName, searchText)}</span>;
      },
    },
    {
      field: 'Gender',
      minWidth: 50,
      headerName: 'Gender',
      headerClassName: 'rowheader',
      width: 75,
      headerAlign: 'left',
      renderCell: (params) => {
        const genderValue = params.value || '';
        // const searchText = searchInputRef.current.value;
        const searchText = searchValue;
        return <span>{highlightText(genderValue, searchText)}</span>;
      }
    },
    {
      field: 'BirthTime',
      minWidth: 100,
      headerName: 'Birth Date & Time',
      headerClassName: 'rowheader',
      width: 150,
      headerAlign: 'left',
      renderCell: (params) => {
        const dateValue = params?.row?.BirthDate;
        const timeValue = params?.value?.toString();
        const formattedTime = timeValue?.slice(0, 2) + ':' + timeValue?.slice(2, 4) + ':' + (timeValue?.slice(4, 6) ? timeValue?.slice(4, 6) : '00');
        // const searchText = searchInputRef.current.value;
        const searchText = searchValue;

        const fullValue = `${dateValue} ${formattedTime}`;
        const dateVal = highlightText(dateValue, searchText)
        const timeVal = highlightText(formattedTime, searchText)
        return <div className="flex justify-between">
          <div className="font-ea-sb">{dateVal} </div>
          <div className="font-ea-n">{timeVal}</div>
        </div>
        // return <span className="font-ea-sb">{highlightText(fullValue, searchText)}</span>;
      }
    },
    {
      field: 'City',
      minWidth: 100,
      headerName: 'City',
      headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left',
      renderCell: (params) => {
        const cityValue = params.value || '';
        // const searchText = searchInputRef.current.value;
        const searchText = searchValue;
        return highlightText(cityValue, searchText);
      }
    },
    {
      field: 'Country',
      minWidth: 100,
      headerName: 'Country',
      headerClassName: 'rowheader',
      flex: 1,
      headerAlign: 'left',
      renderCell: (params) => {
        const countryValue = params.value || '';
        // const searchText = searchInputRef.current.value;
        const searchText = searchValue;
        return highlightText(countryValue, searchText);
      }
    },
    {
      field: 'Prakriti',
      minWidth: 100,
      headerName: 'Prakriti',
      headerClassName: 'rowheader',
      width: 100,
      headerAlign: 'left',
      renderCell: (params) => {
        const prakritiValue = params.value || '';
        // const searchText = searchInputRef.current.value;
        const searchText = searchValue;
        return highlightText(prakritiValue, searchText);
      }
    },
    {
      field: 'Group',
      minWidth: 100,
      headerName: 'Group',
      headerClassName: 'rowheader',
      width: 100,
      headerAlign: 'left',
      renderCell: (params) => {
        const prakritiValue = params.value || '';
        // const searchText = searchInputRef.current.value;
        const searchText = searchValue;
        return highlightText(prakritiValue, searchText);
      }
    },
    {
      field: 'iconColumn', // Unique field name for this column
      type: "actions",
      headerName: '',
      minWidth: 50,
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
          handlePreviewClick(params, params?.row?.KundaliID);
          handleClose();
        };

        const handleEdit = () => {
          handleEditClick(params?.row);
          handleClose();
        };


        const handleRemoveOpen = () => {
          setUserData(params?.row)
          setSetRemovePopUp(true)
          handleClose();
        }

        const handleDuplicateOpen = () => {
          setUserData(params?.row)
          setSetDuplicatPopUp(true);
          handleClose();
        }

        // const handleDownload = () => {
        //   getAKundliData(params?.row?.KundaliID)
        //   handleClose();
        // };

        // const handleDownload = () => {
        //   const cname = params?.row?.FirstName + " " + params?.row?.LastName;
        //   getAKundliData(params?.row?.KundaliID,cname)
        //   handleClose();
        // };

        const handleDownload = () => {
          setLoading(true);
          const link = document.createElement('a');
          link.href = `${process.env.NEXT_PUBLIC_APIURL}/astro/astro-vastu-report-pdf/${params?.row?.KundaliID}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          handleClose();
          setLoading(false);
        };

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
              <MenuItem onClick={handleEdit} className="flex gap-1"><i className={'tabler-edit me-2'} />Edit</MenuItem>
              <MenuItem onClick={handleRemoveOpen} className="flex gap-1"><i className={'tabler-trash me-2'} />Delete</MenuItem>
              <MenuItem onClick={handleDuplicateOpen} className="flex gap-1"><i className={'tabler-copy me-2'} />New &gt; Location Chart</MenuItem>
              <Divider />
              <MenuItem onClick={handleDownload} className="flex gap-1"><i className={'tabler-download me-2'} />Download</MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const { user } = useAuth()
  const [open, setOpen] = useState(false);
  const [removePopUp, setSetRemovePopUp] = useState(false);
  const [duplicatPopUp, setSetDuplicatPopUp] = useState(false);
  const [kundliData, setKundliData] = useState([]);
  const [groupData, setGroupData] = useState(["All"]);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [loading, setLoading] = useState(false);
  const [AKundliData, setAKundliData] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [userData, setUserData] = useState({
    KundaliID: '',
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Gender: 'Male',
    BirthDate: dayjs(),
    Country: { CountryCode: 'IN', Country: 'India' },
    BirthTime: dayjs(),
    CityID: {
      CityID: 1255364, FormattedCity: 'Surat, Gujarat', "Latitude": 21.19594,
      "Longitude": 72.83023,
      "Timezone": "Asia/Kolkata"
    },
    // City:'Surat, Gujarat',
    // CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998',
    isUpdate: false,
    Group: "Client"
    // City: 'Surat'
  })
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  const printRef = useRef(null);
  const fetchConfig = async (id) => {
    const res = await GetConfig();
    if (res.hasError) {
      setLoading(false);
      // return toastDisplayer("error", res.error);
    } else {
      setLoading(false);
      const response = await res.responseData
      if (response?.Country?.CountryCode) {

        setUserData((prev) => ({
          ...prev,
          CityID: {
            CityID: response?.City?.CityID, // Set correct property name
            FormattedCity: response?.City?.FormattedCity // Set correct property name
          },
          Country: {
            CountryCode: response?.Country?.CountryCode,
            Country: response?.Country?.Country
          }
        }));
      } else {
        setUserData((prev) => ({
          ...prev,
          CityID: {
            "CityID": 1255364,
            "FormattedCity": "Surat, Gujarat"
          },
          Country: { CountryCode: 'IN', Country: 'India' }
        }));
      }
    }
  }
  // const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchConfig()
  }, [])

  // func
  const handleAddClick = () => {
    setUserData({
      KundaliID: '',
      FirstName: '',
      LastName: '',
      MiddleName: '',
      Gender: 'Male',
      BirthDate: null,
      Country: { CountryCode: 'IN', Country: 'India' },
      BirthTime: null,
      CityID: {
        CityID: 1255364, FormattedCity: 'Surat, Gujarat', "Latitude": 21.19594,
        "Longitude": 72.83023,
        "Timezone": "Asia/Kolkata"
      },
      isUpdate: false,
      Remark: "",
      Reference: "",
      Group: "Client"
      // City: 'Surat'
    })
    // setUserData(userData)
    fetchConfig();
    setOpen(true);
  }

  const handleDeleteClick = async (kid) => {
    const res = await DeleteKundli(kid);
    if (res.hasError) {
      setLoading(false);
      if (response.errorMessage) {
        Object.keys(response.errorMessage).forEach((key) => {
          response.errorMessage[key].forEach((message) => {
            toast.error(`${key}: ${message}`);
          });
        });
      }
      return;
      // return toastDisplayer("error", res.error);
    } else {
      const index = kundliData.findIndex(item => item.KundaliID === kid);
      if (index !== -1) {
        getAllKundli(1, searchValue, selectedGroup);

        // const updatedKundliData = [...kundliData];
        // updatedKundliData.splice(index, 1);
        // setKundliData(updatedKundliData);
        // setTotalRowCount(totalRowCount - 1);
        toast.success("Kundli deleted successfully.");
      }
      setLoading(false);
    }
  }

  const handleAddClose = () => {
    setOpen(false)
  }

  const handleRemoveClose = () => {
    setSetRemovePopUp(false)
  }

  const handleDuplicatClose = () => {
    setSetDuplicatPopUp(false)
  }


  const getAllKundli = async (pageNo, searchValue = "", group = "") => {
    // setLoading(true);
    const res = await GetKundliDataAPI(10, pageNo, searchValue, group);
    if (res.hasError) {
      setLoading(false);
      // return toastDisplayer("error", res.error);
    } else {
      setKundliData(res?.responseData?.data?.Result?.KundaliList);
      var Groupdata = res?.responseData?.data?.Result?.Group;
      var filteredData = Groupdata.filter(item => item != null && item !== "");
      setGroupData(filteredData);
      setTotalRowCount(res?.responseData?.data?.Result?.KundaliCount)
      setLoading(false);
    }
  }

  const handlePreviewClick = (event, kid) => {
    window.open(`kundali/${kid}`, '_blank');
    // router.push(`kundali/${kid}`)
  }
  // const handlePreviewClick = (event, kid) => {
  //   window.open(`kundali/${kid}`, '_blank');
  // }

  const handleEditClick = (data) => {
    setLoading(true);
    data.isUpdate = true;
    if (!data.Group)
      data.Group = "Client";
    const birthTime = data.BirthTime;
    const hours = parseInt(birthTime?.slice(0, 2), 10);   // First 2 characters (HH)
    const minutes = parseInt(birthTime?.slice(2, 4), 10);  // Next 2 characters (MM)
    const seconds = parseInt(birthTime?.slice(4, 6), 10);  // Last 2 characters (SS)

    data.time = dayjs().hour(hours).minute(minutes).second(seconds);
    setUserData(data)
    setOpen(true);
    setLoading(false);
  }


  // Hooks
  useEffect(() => {
    getAllKundli(1, "", selectedGroup);
  }, []);

  const handleClearSearch = () => {
    // setSearchQuery("")
    setSearchValue("");
    getAllKundli(1, "", selectedGroup);
  }

  useEffect(() => {
    if (searchValue == "") {
      getAllKundli(1, "", selectedGroup);
    }
  }, [searchValue])

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="d-flex justify-content-between p-0 w-full align-items-center">
        <PageTitle title={"Kundali / Birth Charts"} endCmp={
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
            {/* <GridToolbarQuickFilter autoFocus={!open} className="SearchBar w-full lg:w-9/12 sm:w-5/12 md:w-6/12" /> */}
            <Select
              labelId="country-select-label"
              id="country-select"
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                // getAllKundli(1, searchInputRef.current?.value, e.target.value);
                getAllKundli(1, searchValue, e.target.value);
                resetPagination();
              }}
              disableClearable
              className="w-6/12 lg:w-3/12 md:w-4/12 sm:w-4/12"
              size="small"
            >
              <MenuItem value="All">ALL</MenuItem>
              {groupData.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <PreviewActions value={"New Kundali"} onButtonClick={handleAddClick} icon={'tabler-plus'} />
          </>
        } />
      </GridToolbarContainer>
    );
  }

  const fetchData = debounce(async (query) => {
    if (query.length > 0 || query.length !== 0 && searchValue != "") {
      await getAllKundli(1, query, selectedGroup);
      resetPagination();
    } else {
      getAllKundli(1, "", selectedGroup);
    }
  }, 100)

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchValue(e.target.value);
    if (query.length > 3) {
      fetchData(query);
    } else {
      // setSearchValue("");
      getAllKundli(1, "", selectedGroup);
    }
  }

  const handleFilterModelChange = async (filterModel) => {
    if (filterModel.quickFilterValues.length) {
      let query = filterModel.quickFilterValues.join(' ');
      query = query.replace(/:/g, '');
      setSearchValue(query);
      // if (query.length >= 3) {
      //   await getAllKundli(1, query, selectedGroup);
      //   resetPagination();
      // }
      if (query.length >= 3)
        fetchData(query);
    } else {
      setSearchValue("");
      getAllKundli(1, "", selectedGroup);
    }
  }

  const fetchDataForPage = (e) => {
    setPageNo(parseInt(e) + 1)
    getAllKundli(parseInt(e) + 1, searchValue, selectedGroup);
    // getAllKundli(parseInt(e) + 1, searchInputRef.current?.value ? searchInputRef.current?.value : "", selectedGroup);
  }

  useEffect(() => {
    if (AKundliData != null) {
      if (printRef.current) {
        setLoading(true)
        setTimeout(() => {
          html2canvas(printRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 2); // Convert to JPEG with lower quality
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 200; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 4;

            pdf.addImage(imgData, 'JPEG', 4, position, imgWidth, imgHeight, '', 'FAST');
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'JPEG', 4, position, imgWidth, imgHeight, '', 'FAST');
              heightLeft -= pageHeight;
            }

            pdf.save('document.pdf');
          });
          setLoading(false)
        }, 2000);
      }
    }
  }, [AKundliData])


  const resetPagination = () => {
    // Reset page number to 0
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
  };


  return (
    <>

      {loading && <Loader />}
      {AKundliData &&
        <>
          <div ref={printRef} className='previewPDFPrint' style={{ width: "1240px" }}>
            <PreviewCard kundliData={AKundliData} isPrintDiv={true} />
          </div>
        </>
      }
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-2 p-0'>
              <div className="KundliList">
                <Box>
                  <DataGrid
                    className="KundliListGrid"
                    getRowClassName={(params) =>
                      params.row.IsCurrent ? 'highlight-row' : ''
                    }
                    onRowDoubleClick={(e) => { handlePreviewClick(e, e.row.KundaliID) }}
                    onFilterModelChange={handleFilterModelChange}
                    getRowId={(row) => row.KundaliID}
                    rows={kundliData}
                    columns={columns}
                    disableColumnMenu
                    rowHeight={40}
                    columnHeaderHeight={45}
                    disableColumnResize
                    disableRowSelectionOnClick
                    pageSizeOptions={[10]}
                    // initialState={{
                    //   pagination: { paginationModel: { pageSize: 10 } },
                    // }}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    filterMode="server"
                    rowCount={totalRowCount}
                    onPaginationModelChange={(paginationModel) => {
                      setPaginationModel(paginationModel);
                      fetchDataForPage(paginationModel.page);
                    }}
                    slots={{ toolbar: CustomToolbar }}
                  // slotProps={{ toolbar: { showQuickFilter: true } }}
                  // showFirstButton
                  // showLastButton
                  // pagination
                  />


                </Box>
              </div>
              {/* <KundliDataGrid columns={columns} pageSize={10} /> */}
            </CardContent>
          </Card>

        </Grid>
      </Grid>
      {open && (
        <AddKundliPopUp open={open} handleAddClose={handleAddClose} getAllKundli={getAllKundli} setUserData={setUserData} userData={userData} GroupData={groupData} setKundliData={setKundliData} kundliData={kundliData} />
      )}
      {removePopUp && (
        <RemoveKundli open={removePopUp} isDelete={true} handleClose={handleRemoveClose} userData={userData} handleDeleteClick={handleDeleteClick} />
      )}
      {duplicatPopUp && (
        <DuplicateKundali open={duplicatPopUp} isDelete={false} handleClose={handleDuplicatClose} userData={userData} handleDeleteClick={handleDeleteClick} getAllKundli={getAllKundli} />
      )}

    </>
  )
}
