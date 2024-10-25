import { Box, Button, Card, CardContent, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Menu, MenuItem, TextField, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import PreviewActions from "./preview/PreviewActions";
import { useEffect, useRef, useState } from "react";
import AddKundliPopUp from "./addKundli/addKundli";
import { GetKundliDataAPI, GetKundliIDDataAPI } from "@/app/Server/API/kundliAPI";
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


export default function KundliMain() {

  const highlightText = (text, searchText) => {
    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <span className="font-semibold" key={index} style={{ color: '#00a75a' }}>
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
        const fullName = `${params.row.FirstName} ${params.row.MiddleName} ${params.row.LastName}`;
        const searchText = searchInputRef.current.value;
        return <span className="font-semibold">{highlightText(fullName, searchText)}</span>;
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
        const searchText = searchInputRef.current.value;
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
        const dateValue = params.row.BirthDate;
        const timeValue = params.value.toString();
        const formattedTime = timeValue.slice(0, 2) + ':' + timeValue.slice(2, 4);
        const searchText = searchInputRef.current.value;

        const fullValue = `${dateValue} ${formattedTime}`;
        return <span className="font-semibold">{highlightText(fullValue, searchText)}</span>;
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
        const searchText = searchInputRef.current.value;
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
        const searchText = searchInputRef.current.value;
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
        const searchText = searchInputRef.current.value;
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
          // Create a download link
          const link = document.createElement('a');
          // Set the href to the provided URL
          link.href = `${process.env.NEXT_PUBLIC_APIURL}/astro/astro-vastu-report-pdf/${params?.row?.KundaliID}`;

          // Set the link to open in a new tab (optional)
          // link.target = '_blank';

          // Append the link to the document body
          document.body.appendChild(link);

          // Trigger the download by simulating a click
          link.click();

          // Remove the link from the document after download is triggered
          document.body.removeChild(link);

          handleClose();
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
              <MenuItem onClick={handlePreview} className="flex gap-1"><i className={'tabler-arrow-up-right bg-primary'}/>Open</MenuItem>
              <MenuItem onClick={handleEdit}  className="flex gap-1"><i className={'tabler-edit bg-secondary'}/>Edit</MenuItem>
              <MenuItem onClick={handleDownload}  className="flex gap-1"><i className={'tabler-download bg-danger'}/>Download</MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];


  const [open, setOpen] = useState(false);
  const [kundliData, setKundliData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [AKundliData, setAKundliData] = useState(false);
  const [userData, setUserData] = useState({
    KundaliID: '',
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Gender: 'Male',
    BirthDate: null,
    Country: { iso2: 'IN', name: 'India' },
    BirthTime: null,
    CityID: { CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998', FormattedCity: 'Surat, Gujarat' },
    // City:'Surat, Gujarat',
    // CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998',
    isUpdate: false,
    // City: 'Surat'
  })
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const searchInputRef = useRef(null);
  const printRef = useRef(null);

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
      CityID: { CityID: 'A1AE28185ED49D47211760BF32D40EB742C84998', FormattedCity: 'Surat, Gujarat' },
      isUpdate: false,
      // City: 'Surat'
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
      setTotalRowCount(res?.responseData?.data?.Result?.KundaliCount)
      setLoading(false);
    }
  }

  const handlePreviewClick = (event, kid) => {
    window.open(`preview?kid=${kid}`, '_blank');
  }

  const handleEditClick = (data) => {
    console.log("edited data :",userData)
    setLoading(true);
    data.isUpdate = true;
    // data.CityID = {
    //   CityID: userData.CityID,
    //   FormattedCity: userData.City
    // }
    setUserData(data)
    setOpen(true);
    setLoading(false);
  }


  // Hooks
  useEffect(() => {
    getAllKundli(1, "");
  }, [])

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="d-flex justify-content-between p-0 w-full align-items-center">
        <PageTitle title={"Kundali / Birth Charts"} endCmp={
          <>
            <GridToolbarQuickFilter inputRef={searchInputRef} autoFocus={!open} className="SearchBar w-full md:w-full sm:w-8/12 " />
            <PreviewActions value={"New Kundali"} onButtonClick={handleAddClick} icon={'tabler-plus'} />
          </>
        } />
      </GridToolbarContainer>
    );
  }

  const fetchData = debounce(async (query) => {
    if (query.length > 0 || query.length == 0) {
      await getAllKundli(pageNo, query);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 1000);
    }
  }, 500)

  const handleFilterModelChange = (filterModel) => {
    if (filterModel.quickFilterValues.length) {
      const query = filterModel.quickFilterValues.join(' ');
      if (query.length >= 3)
        fetchData(query);
    } else {
      getAllKundli(pageNo, "");
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

  // Func
  const getAKundliData = async (kId,cname) => {
    if (kId) {
      try {
        setLoading(true);
        const response = await getKundliPdf(kId);
        console.log(response);

        if (response.hasError) {
          setLoading(false);
          return toastDisplayer("error", response.error);
        }

        // Create a Blob from the PDF
        const pdfBlob = new Blob([response.responseData.data], { type: 'application/pdf' });

        // Create a URL for the Blob
        const pdfURL = URL.createObjectURL(pdfBlob);

        // Create an anchor element and simulate a click to download the file
        const link = document.createElement('a');
        link.href = pdfURL;
        link.setAttribute('download', `kundli_${cname}.pdf`); // Set the file name
        document.body.appendChild(link);
        link.click(); // Simulate the click
        document.body.removeChild(link); // Clean up

        setLoading(false);
      } catch (error) {
        console.error("Error downloading PDF:", error);
        setLoading(false);
      }
    } else {
      return toastDisplayer("error", "Kundli ID not found.");
    }
  };
  // const getAKundliData = async (kId) => {
  //   if (kId != "undefined" && kId != null) {
  //     setLoading(true);
  //     const res = await GetKundliIDDataAPI(kId);
  //     setLoading(false);
  //     if (res.hasError) {
  //       // router.push('/kundlipage')
  //       return toastDisplayer("error", res.error);
  //     } else {
  //       setAKundliData(res?.responseData?.data?.Result)
  //     }
  //   } else {
  //     // router.push('/kundlipage')
  //     return toastDisplayer("error", "Kundli Id not found.");
  //   }

  // }

  useEffect(() => {
    if(AKundliData!=null){
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
                  <ThemeProvider theme={customTheme}>
                    <DataGrid
                      className="KundliListGrid"
                      getRowClassName={(params) =>
                        params.row.IsCurrent ? 'highlight-row' : ''
                      }
                      sx={{
                        '& .MuiDataGrid-row:nth-of-type(odd)': {
                          backgroundColor: '#ffffff', // Light color for odd rows
                        },
                        '& .MuiDataGrid-row:nth-of-type(even)': {
                          backgroundColor: '#f5f5f5', // White color for even rows
                        },
                        '& .MuiDataGrid-row:hover': {
                          color: 'var(--primary-color) !important',
                          backgroundColor: 'var(--secondary-soft-color) !important',
                        },
                        '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                          color: 'white', // Change to your desired color
                        },
                      }}
                      onRowDoubleClick={(e) => { handlePreviewClick(e, e.row.KundaliID) }}
                      onFilterModelChange={(e) => handleFilterModelChange(e, searchInputRef)}
                      getRowId={(row) => row.KundaliID}
                      rows={kundliData}
                      columns={columns}
                      disableColumnMenu
                      rowHeight={45}
                      columnHeaderHeight={45}
                      disableColumnResize
                      disableRowSelectionOnClick
                      pageSizeOptions={[10]}
                      initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                        pinnedColumns: {
                          right: ['iconColumn'],  // iconColumn pinned to the right
                        }
                      }}
                      paginationMode="server"
                      filterMode="server"
                      rowCount={totalRowCount}
                      onPaginationModelChange={(paginationModel) => {
                        fetchDataForPage(paginationModel.page);
                      }}
                      slots={{ toolbar: CustomToolbar }}
                      slotProps={{ toolbar: { showQuickFilter: true } }}
                    />
                  </ThemeProvider>


                </Box>
              </div>
              {/* <KundliDataGrid columns={columns} pageSize={10} /> */}
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
