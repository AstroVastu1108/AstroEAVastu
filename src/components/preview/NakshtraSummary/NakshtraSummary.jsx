import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import "./NakshtraSummary.css"
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { nonEmpty } from 'valibot';
import EventModel from '@/components/EventModel/eventModel';
import { value } from 'valibot';

function NakshtraSummary({ SummaryData, Aspect, symbols, SelectedEventVal }) {

  const applyOccupancyColor = (Occupancy) => {
    if (SelectedEventVal) {
      const positive = SelectedEventVal.Positive?.split(", ").map(Number) || [];
      const negative = SelectedEventVal.Negative?.split(", ").map(Number) || [];
      const occupancyNumber = Number(Occupancy);

      if (positive.includes(occupancyNumber)) {
        return <span className="text-[var(--green-text-color)] font-semibold">{occupancyNumber}</span>;
      } else if (negative.includes(occupancyNumber)) {
        return <span className="text-[var(--red-text-color)] font-semibold">{occupancyNumber}</span>;
      }
    }
    return Occupancy;
  };

  const applyOwnerShipColor = (OwnershipArray) => {
    const formattedOwnership = OwnershipArray.map((ownershipItem, index) => {
      const ownershipNumber = Number(ownershipItem);

      if (SelectedEventVal) {
        const positiveValues = SelectedEventVal.Positive.split(', ').map(Number);
        const negativeValues = SelectedEventVal.Negative.split(', ').map(Number);

        // Apply green color if ownership is in Positive, red if in Negative
        if (positiveValues.includes(ownershipNumber)) {
          return (
            <span key={index} className="text-[var(--green-text-color)] font-semibold">
              {ownershipItem}
              {index < OwnershipArray.length - 1 && ', '}
            </span>
          );
        } else if (negativeValues.includes(ownershipNumber)) {
          return (
            <span key={index} className="text-[var(--red-text-color)] font-semibold">
              {ownershipItem}
              {index < OwnershipArray.length - 1 && ', '}
            </span>
          );
        }
      }
      // Default case with no color
      return (
        <span key={index}>
          {ownershipItem}
          {index < OwnershipArray.length - 1 && ', '}
        </span>
      );
    });
    return formattedOwnership;
  }

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
              <div className="planet-col-title cursor-pointer">
                <div className='planet-row'>{e.value}
                </div>
                {activeSymbols && <span className='rashiDiv' style={{ fontSize: "16px" }}>{activeSymbols}</span>}
              </div>
            </>
          );
        }
      }
      : {
        field: 'id', headerName: '#', headerClassName: 'rowheader', width: 65, minWidth: 65, align: 'center', headerAlign: 'center',
        renderCell: (e) => {
          return (
            <>
              <div className="planet-col-title cursor-pointer">
                <div className='planet-row'>{e.value}</div>
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
            <div className="planet-col-sign flex justify-between cursor-pointer">
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
            <div className="planet-col-nakshatra flex justify-between cursor-pointer">
              <div className=''>{e.value}</div>
              <span className=''>{e?.row?.NakshatraPada}</span>
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
            <div className="plDiv cursor-pointer">
              <div className='signDiv'>{e.value}</div>
            </div>
          </>
        );
      }
    },
    {
      field: 'PL',
      headerName: (
        <>
          PL <span className="planet-col-title-small">(Source)</span>
        </>
      ),
      headerClassName: 'rowheader',
      minWidth: 120,
      flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.PL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.PL?.Occupancy || "";
        const OwnershipArray = e?.row?.PL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span> / {applyOwnerShipColor(OwnershipArray)}</span> : ""}
            </div>
          </div>
        );
      },
    },
    {
      field: 'NL',
      headerName: (
        <>
          NL <span className="planet-col-title-small">(Result)</span>
        </>
      ),
      headerClassName: 'rowheader',
      minWidth: 120,
      flex: 1,
      cellClassName: 'nl-column-cell',
      renderCell: (e) => {
        // const planetName = e?.row?.NL?.Planet?.slice(0, 3) || "";
        // const Occupancy = e?.row?.NL?.Occupancy || "";
        // const scriptFull = e?.row?.NL?.ScriptFull || "";

        // return (
        //   <div className="flex justify-between cursor-pointer">
        //     <div className="planet-col-planet-text">{planetName}</div>
        //     <span className="degreeDiv">
        //       {applyOccupancyColor(Occupancy)} / {scriptFull}
        //     </span>
        //   </div>
        // );

        const planetName = e?.row?.NL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.NL?.Occupancy || "";
        const OwnershipArray = e?.row?.NL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span> / {applyOwnerShipColor(OwnershipArray)}</span> : ""}
              {/* / {applyOwnerShipColor(OwnershipArray)} */}
            </div>
          </div>
        );
      },
    },
    {
      field: 'SL',
      headerName: (
        <>
          SL <span className="planet-col-title-small">(Verifier)</span>
        </>
      ),
      headerClassName: 'rowheader',
      minWidth: 120,
      flex: 1,
      renderCell: (e) => {
        // const planetName = e?.row?.SL?.Planet?.slice(0, 3) || "";
        // const Occupancy = e?.row?.SL?.Occupancy || "";
        // const scriptFull = e?.row?.SL?.ScriptFull || "";

        // return (
        //   <div className="flex justify-between cursor-pointer">
        //     <div className="planet-col-planet-text">{planetName}</div>
        //     <span className="degreeDiv">
        //       {applyOccupancyColor(Occupancy)} / {scriptFull}
        //     </span>
        //   </div>
        // );

        const planetName = e?.row?.SL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.SL?.Occupancy || "";
        const OwnershipArray = e?.row?.SL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span> / {applyOwnerShipColor(OwnershipArray)}</span> : ""}
              {/* / {applyOwnerShipColor(OwnershipArray)} */}
            </div>
          </div>
        );
      },
    },
    {
      field: 'NLSL',
      headerName: (
        <>
          NL-SL <span className="planet-col-title-small">(InnerSelf)</span>
        </>
      ),
      headerClassName: 'rowheader',
      minWidth: 120,
      flex: 1,
      renderCell: (e) => {
        // const planetName = e?.row?.NLSL?.Planet?.slice(0, 3) || "";
        // const Occupancy = e?.row?.NLSL?.Occupancy || "";
        // const scriptFull = e?.row?.NLSL?.ScriptFull || "";

        // return (
        //   <div className="flex justify-between cursor-pointer">
        //     <div className="planet-col-planet-text">{planetName}</div>
        //     <span className="degreeDiv">
        //       {applyOccupancyColor(Occupancy)} / {scriptFull}
        //     </span>
        //   </div>
        // );

        const planetName = e?.row?.NLSL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.NLSL?.Occupancy || "";
        const OwnershipArray = e?.row?.NLSL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span> / {applyOwnerShipColor(OwnershipArray)}</span> : ""}
              {/* / {applyOwnerShipColor(OwnershipArray)} */}
            </div>
          </div>
        );
      },
    },
    {
      field: 'PHScriptFull', headerName: 'PH', headerClassName: 'rowheader', minWidth: 100, with: 100,
      renderCell: (e) => {
        return <span className='planet-col-ph cursor-pointer'>{e.value}</span>
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
    setSelectedTitle(house + " 🡒 " + title);
    setOpen(true)
    setSelectedEvent(data);
  }

  return (
    <>
      {open && (
        <EventModel open={open} handleAddClose={handleAddClose} headerTitle={selectedTitle} displayData={selectedEvent} />
      )}
      <Box width={"100%"}
        sx={{
          '& .MuiDataGrid-root': {
            borderRadius: 0, // Remove border radius
            borderLeft: '0px',
            borderRight: '0px',
          },
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
          '& .MuiDataGrid-columnHeader--withRightBorder': {
            borderRightWidth: '0px !important'
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none !important'
          },
          '& .Mui-selected': {
            backgroundColor: '#99e27b65 !important'
          },
          '& .MuiDataGrid-columnHeader': {
            cursor: 'default !important', // Change to your desired color
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important'
          },
          '& .MuiDataGrid-scrollbar--vertical': {
            display: 'none'
          },
          '& .MuiDataGrid-scrollbarFiller--header': {
            display: 'none'
          }
        }}
      >

        <ThemeProvider theme={customTheme}>

          <DataGrid
            showCellVerticalBorder
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
            onCellDoubleClick={(params) => handleEvent("cell", params.field, `${params?.value?.Planet ? params?.value?.Planet : ""} ${params?.value?.ScriptFull ? params?.value?.ScriptFull : params?.value}`, `${params?.value?.Planet ? params?.value?.Planet : ""} ${params?.value?.ScriptFull ? params?.value?.ScriptFull : params?.value}`)}
            // onCellClick={(params) => console.log(`Cell clicked: ${params.field} - Value: ${params.value}`, params)}
            getRowClassName={(params) => params.id === selectedRowId ? 'Mui-selected' : ''}
          />
        </ThemeProvider>

      </Box>
    </>
  )
}

export default NakshtraSummary
