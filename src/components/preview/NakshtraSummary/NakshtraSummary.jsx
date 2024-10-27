import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import "./NakshtraSummary.css"
import { Box, createTheme, ThemeProvider } from '@mui/material';
import EventModel from '@/components/EventModel/eventModel';
import { value } from 'valibot';

function NakshtraSummary({ SummaryData, Aspect, symbols }) {
  const columns = [
    Aspect === 'P'
      ? {
        field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader', minWidth: 160, flex: 1,
        renderCell: (e) => {
          const { IsRetro, IsExalted, IsDebilitated, IsCombust, IsUntenanted, IsSelfStar, IsExchange } = e.row;
          const activeSymbols = [
            IsExalted && symbols.IsExalted,
            IsDebilitated && symbols.IsDebilitated,
            IsCombust && symbols.IsCombust,
            IsExchange && symbols.IsExchange,
            IsUntenanted && symbols.IsUntenanted,
            IsSelfStar && symbols.IsSelfStar,
            IsRetro && symbols.IsRetro,
          ].filter(Boolean).join(" "); // Filter out false values and join symbols with a space

          return (
            <>
              <div className="rashiMainDiv cursor-pointer">
                <div className='planetN'>{e.value}
                </div>
                {activeSymbols && <span className='rashiDiv' style={{ fontSize: "16px" }}>{activeSymbols}</span>}
              </div>
            </>
          );
        }
      }
      : {
        field: 'id', headerName: 'House', headerClassName: 'rowheader',width:65, minWidth: 65, align: 'center',
        renderCell: (e) => {
          return (
            <>
              <div className="plDiv">
                <div className='planetN'>{e.value}</div>
              </div>
            </>
          );
        }
      },
    {
      field: 'Rashi', headerName: 'Sign', headerClassName: 'rowheader', minWidth: 80, flex: 1,
      renderCell: (e) => {
        const Rashi = e?.value.slice(0, 3) || "";
        const Degree = e?.row?.Degree?.split(":")[0] || "";
        return (
          <>
            <div className="rashiMainDiv">
              <div className='signDiv'>{Rashi}.</div>
              <span className='degreeDiv'>{Degree}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'Nakshatra', headerName: 'Nakshatra', headerClassName: 'rowheader', minWidth: 150, flex: 1.5,
      renderCell: (e) => {
        return (
          <>
            <div className="NMainDiv">
              <div className='degreeDiv'>{e.value}</div>
              <span className='degreeDiv'>{e?.row?.NakshatraPada}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'EnergyField', headerName: 'Devta', headerClassName: 'rowheader', minWidth: 100, flex: 1,
      renderCell: (e) => {
        return (
          <>
            <div className="plDiv">
              <div className='signDiv'>{e.value}</div>
            </div>
          </>
        );
      }
    },
    {
      field: 'PL', headerName: 'PL (Source)', headerClassName: 'rowheader', minWidth: 120, flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.PL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.PL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span className='degreeDiv'>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'NL', headerName: 'NL (Result)', headerClassName: 'rowheader', minWidth: 120, flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.NL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.NL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span className='degreeDiv'>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'SL', headerName: 'SL (Verifier)', headerClassName: 'rowheader', minWidth: 120, flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.SL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.SL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span className='degreeDiv'>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'NLSL', headerName: 'NL-SL (InnerSelf)', headerClassName: 'rowheader', minWidth: 120, flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.NLSL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.NLSL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span className='degreeDiv'>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'PHScriptFull', headerName: 'PH', headerClassName: 'rowheader', minWidth: 100, with: 100,
      renderCell: (e) => {
        return <span className='degreeDiv'>{e.value}</span>
      }
    },
  ];
  // Adding unique IDs
  const rowsSummaryData = SummaryData?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

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

  const [selectedRowId, setSelectedRowId] = useState(null);

  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState([])
  const [selectedTitle, setSelectedTitle] = useState("")
  const handleAddClose = () => {
    setOpen(false)
  }

  const handleEvent = (type, house, title, data) => {
    console.log("Data : ", data)
    setSelectedTitle(house + " 🡒 " + title);
    setOpen(true)
    setSelectedEvent(data);
  }

  return (
    <>
    {open && (
      <EventModel open={open} handleAddClose={handleAddClose} headerTitle={selectedTitle} displayData={selectedEvent} />
    )}
    <Box width={"100%"} sx={{
      '& .MuiDataGrid-cell': {
        fontSize: "14px",
        borderLeft: '0.5px solid var(--border-color)',
        borderBottom: '0.5px solid var(--border-color)',
      },
      '& .MuiDataGrid-cell:last-child': {
        borderRight: '0.5px solid var(--border-color)',
      },
      '& .Mui-selected': {
        backgroundColor: 'var(--secondary-soft-color) !important',
      },
    }}>
      <ThemeProvider theme={customTheme}>

        <DataGrid
          rows={rowsSummaryData}
          columns={columns}
          initialState={{
            pinnedColumns: { left: ['id', 'Planet'] } // Combine both columns here
          }}
          disableColumnSorting
          disableColumnMenu
          rowHeight={30}
          columnHeaderHeight={38}
          disableColumnResize
          disableRowSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
          onRowClick={(params) => setSelectedRowId(params.id)}
          onCellClick={(params) => handleEvent("cell",params.field,`${params?.value?.Planet ? params?.value?.Planet : ""} ${params?.value?.ScriptFull ?params?.value?.ScriptFull : params?.value}`,`${params?.value?.Planet ? params?.value?.Planet : ""} ${params?.value?.ScriptFull ?params?.value?.ScriptFull : params?.value}` )}
          // onCellClick={(params) => console.log(`Cell clicked: ${params.field} - Value: ${params.value}`, params)}
          getRowClassName={(params) => params.id === selectedRowId ? 'Mui-selected' : ''}
       
        />
      </ThemeProvider>

    </Box>
    </>
  )
}

export default NakshtraSummary
