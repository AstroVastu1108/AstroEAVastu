import Loader from '@/components/common/Loader/Loader'
import { Box, Card, CardContent, debounce, Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react'
import PageTitle from '@/components/common/PageTitle/PageTitle';
import { GetLogDataAPI } from '@/app/Server/API/LogAPI';
import "./ActivityLog.css";

function ActivityLog() {
  const [loading, setLoading] = useState(false);
  const [LogData, setLogData] = useState(false);
  const [TotalRowCount, setTotalRowCount] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const searchInputRef = useRef(null);
  const [pageNo, setPageNo] = useState(1);

  const highlightText = (text, searchText) => {
    if (!searchText) return text;

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

  const columns = [
    {
      field: 'DT', headerName: 'Date & Time', headerClassName: 'rowheader', width: 180, renderCell: (param) => {
        const DateNew = new Date(param.value);

        const year = DateNew.getFullYear();
        const month = String(DateNew.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
        const day = String(DateNew.getDate()).padStart(2, '0');
        const hours = String(DateNew.getHours()).padStart(2, '0');
        const minutes = String(DateNew.getMinutes()).padStart(2, '0');
        const seconds = String(DateNew.getSeconds()).padStart(2, '0');

        // Format the date in the desired format
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const [date, timeWithZ] = param.value.split("T");
        const time = timeWithZ.replace("Z", "").split(".")[0];
        const searchText = searchInputRef.current.value;
        return <>
          <span className='font-ea-sb'>{highlightText(`${day}-${month}-${year}`, searchText)}</span>  {hours}:{minutes}:{seconds}
        </>
      }
    },
    {
      field: 'Operation', headerName: 'Operation', headerClassName: 'rowheader', width: 90, renderCell: (param) => {
        const data = param.value;
        const searchText = searchInputRef.current.value;
        return <>
          <span className='font-ea-n'>{highlightText(data, searchText)}</span>
        </>
      }
    },
    {
      field: 'Action', headerName: 'Action', headerClassName: 'rowheader', width: 70,
      renderCell: (param) => {
        const data = param.value;
        const searchText = searchInputRef.current.value;
        return <>
          <span className='font-ea-n'>{highlightText(data, searchText)}</span>
        </>
      }
    },
    {
      field: 'Detail', headerName: 'Detail', flex: 1, headerClassName: 'rowheader', width: 120, renderCell: (param) => {
        const data = param.value;
        const eventData = data.split("@");
        const searchText = searchInputRef.current.value;
        if (eventData !== "" && eventData !== "undefined" && eventData.length > 1) {
          return (<div>
            {highlightText(data.split("#")[0], searchText)}
            <a target='blank' href={`${process.env.NEXT_PUBLIC_APP_URL}/kevent/${eventData[1]}`} className='text-primary font-ea-sb'>#{highlightText(eventData[0].split("#")[1], searchText)} <span className='text-red-700'>@{highlightText(eventData[1], searchText)}</span>
            </a>
          </div>)
        }
        if (data) {
          return (<div>
            {highlightText(data.split("#")[0], searchText)}
            <a target='blank' href={`${process.env.NEXT_PUBLIC_APP_URL}/kundali/${data.split("#")[1]}`} className='text-primary font-ea-sb'>#{highlightText(data.split("#")[1], searchText)}</a>
          </div>)
        }
      }
    },
    {
      field: 'Email', headerName: 'Email', headerClassName: 'rowheader', width: 200,
      renderCell: (param) => {
        const data = param.value;
        const searchText = searchInputRef.current.value;
        return <>
          <span className='font-ea-n'>{highlightText(data, searchText)}</span>
        </>
      }
    },
    {
      field: 'IpAdd', headerName: 'IpAdd', headerClassName: 'rowheader', width: 120,
      renderCell: (param) => {
        const data = param.value;
        const searchText = searchInputRef.current.value;
        return <>
          <span className='font-ea-n'>{highlightText(data, searchText)}</span>
        </>
      }
    },
  ];


  function CustomToolbar() {
    return (
      <GridToolbarContainer className="d-flex justify-content-between p-0 w-full align-items-center">
        <PageTitle title={"Activity Log"} endCmp={
          <>
            <GridToolbarQuickFilter inputRef={searchInputRef} autoFocus className="SearchBar w-full lg:w-9/12 sm:w-5/12 md:w-6/12" />
            {/* <PreviewActions value={"New Kundali"} onButtonClick={""} icon={'tabler-plus'} /> */}
          </>
        } />
      </GridToolbarContainer>
    );
  }


  const getAllLog = async (pageNo, searchValue = "") => {
    // setLoading(true);
    const res = await GetLogDataAPI(10, pageNo, searchValue);
    if (res.hasError) {
      setLoading(false);
    } else {
      setLogData(res?.responseData?.data?.Result?.LogList);
      setTotalRowCount(res?.responseData?.data?.Result?.LogCount)
      setLoading(false);
    }
  }

  // Hooks
  useEffect(() => {
    getAllLog(1, "");
  }, []);

  const fetchDataForPage = (e) => {
    setPageNo(parseInt(e) + 1)
    getAllLog(parseInt(e) + 1, searchInputRef.current?.value ? searchInputRef.current?.value : "");
  }

  const fetchData = debounce(async (query) => {
    if (query.length > 0 || query.length == 0) {
      await getAllLog(pageNo, query);
      setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    }
  }, 500)

  const handleFilterModelChange = (filterModel) => {
    if (filterModel.quickFilterValues.length) {
      let query = filterModel.quickFilterValues.join(' ');
      query = query.replace(/:/g, '');
      if (query.length >= 3)

        fetchData(query);
    } else {
      getAllLog(pageNo, "");
    }
  }

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-2 p-0'>
              <div className="KundliList">
                <Box>
                  <DataGrid
                    className="KundliListGrid ActivityGrid"
                    getRowClassName={(params) =>
                      params.row.IsCurrent ? 'highlight-row' : ''
                    }
                    // onRowDoubleClick={(e) => { handlePreviewClick(e, e.row.KundaliID) }}
                    onFilterModelChange={(e) => handleFilterModelChange(e, searchInputRef)}
                    getRowId={(row) => row.LogID}
                    rows={LogData}
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
                    rowCount={TotalRowCount}
                    onPaginationModelChange={(paginationModel) => {
                      setPaginationModel(paginationModel);
                      fetchDataForPage(paginationModel.page);
                    }}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                  // getCellClassName={"text-s"}
                  />


                </Box>
              </div>
              {/* <KundliDataGrid columns={columns} pageSize={10} /> */}
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  )
}

export default ActivityLog
