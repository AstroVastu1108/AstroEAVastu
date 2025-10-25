import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import "./NakshtraSummary.css"
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { nonEmpty } from 'valibot';
import EventModel from '@/components/EventModel/eventModel';
import { value } from 'valibot';

function NakshtraSummary({ SummaryData, Aspect, symbols, SelectedEventVal }) {

  const planetClass = {
    ketu: "ketu",
    venus: "venus",
    sun: "sun",
    moon: "moon",
    mars: "mars",
    rahu: "rahu",
    jupiter: "jupiter",
    saturn: "saturn",
    mercury: "mercury",
    uranus: "uranus",
    neptune: "neptune",
    pluto: "pluto"
  };

  const shorthandMap = {
    Ke: planetClass.ketu,
    Ve: planetClass.venus,
    Su: planetClass.sun,
    Mo: planetClass.moon,
    Ma: planetClass.mars,
    Ra: planetClass.rahu,
    Ju: planetClass.jupiter,
    Sa: planetClass.saturn,
    Me: planetClass.mercury,
    Ur: planetClass.uranus,
    Ne: planetClass.neptune,
    Pl: planetClass.pluto
  };

  const highlightText = (value) => {
    const abbreviation = value.trim().slice(0, 2); // Remove any extra whitespace
    const fullName = shorthandMap[abbreviation];

    // Split the value by `-` to get individual planet abbreviations

    // Return the elements separated by " - "
    return (
      <div className={`pl-${fullName} row-title font-ea-sb`} key={abbreviation}>
        {value}
      </div>
    );
  };

  const applyOccupancyColor = (Occupancy) => {
    if (SelectedEventVal) {
      const positive = SelectedEventVal.Positive?.split(", ").map(Number) || [];
      const negative = SelectedEventVal.Negative?.split(", ").map(Number) || [];
      const occupancyNumber = Number(Occupancy);

      if (positive.includes(occupancyNumber)) {
        return <div className='bg-[var(--green-bg-color)] px-[2px]'>
          <span className="text-[var(--green-text-color)] font-ea-sb">{occupancyNumber}</span>
        </div>
      } else if (negative.includes(occupancyNumber)) {
        return <div className='bg-[var(--red-bg-color)] px-[2px]'>
          <span className="text-[var(--red-text-color)] font-ea-sb">{occupancyNumber}</span>
        </div>
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

        if (positiveValues.includes(ownershipNumber)) {
          return (
            <div className='flex' key={index}>
              <div className='bg-[var(--green-bg-color)] px-[2px]'>
                <span className="text-[var(--green-text-color)] font-ea-sb">
                  {ownershipItem}
                </span>
              </div>
              {index < OwnershipArray.length - 1 && <span>,&nbsp;</span>}
            </div>
          );
        } else if (negativeValues.includes(ownershipNumber)) {
          return (
            <div className='flex' key={index}>
              <div className='bg-[var(--red-bg-color)] px-[2px]'>
                <span className="text-[var(--red-text-color)] font-ea-sb">
                  {ownershipItem}
                </span>
              </div>
              {index < OwnershipArray.length - 1 && <span>,&nbsp;</span>}
            </div>
          );
        }
      }

      return (
        <span key={index}>
          {ownershipItem}
          {index < OwnershipArray.length - 1 && <span>,&nbsp;</span>}
        </span>
      );
    });

    return formattedOwnership;
  }

  const columns = [
    Aspect === 'P'
      ? {
        field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader', minWidth: 130, width: 130,
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
              <div className="planet-col-title cursor-pointer font-ea-sb">
                {/* <div className='planet-row'>{e.value}</div> */}
                {highlightText(e.value)}
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
                <div className='planet-row font-ea-sb'>{e.value}</div>
              </div>
            </>
          );
        }
      },
    {
      field: 'Rashi', headerName: 'Sign', headerClassName: 'rowheader', minWidth: 120, width: 120,
      renderCell: (e) => {
        const Rashi = e?.value.slice(0, 3) || "";
        const Degree = e?.row?.Degree?.split(":")[0] || "";
        const Min = e?.row?.Degree?.split(":")[1] || "";
        return (
          <>
            <div className="planet-col-sign flex justify-between cursor-pointer">
              <div className='signDiv'>{Rashi}.</div>
              <span className='degreeDiv'>{Degree}° {Min}'</span>

            </div>
          </>
        );
      }
    },
    {
      field: 'Nakshatra', headerName: 'Nakshatra', headerClassName: 'rowheader', minWidth: 140, width: 140,
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
            {/* <div className="planet-col-planet-text">{planetName}</div> */}
            {highlightText(planetName)}
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
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

        const planetName = e?.row?.NL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.NL?.Occupancy || "";
        const OwnershipArray = e?.row?.NL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text  font-ea-sb">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span style={{ display: "flex" }}> &nbsp;/&nbsp; {applyOwnerShipColor(OwnershipArray)}</span> : ""}
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

        const planetName = e?.row?.SL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.SL?.Occupancy || "";
        const OwnershipArray = e?.row?.SL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text  font-ea-sb">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
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
    {
      field: 'NLSL',
      headerName: (
        <>
          NL-SL <span className="planet-col-title-small">(InnerSelf)</span>
        </>
      ),
      headerClassName: 'rowheader',
      cellClassName: 'nlsl-column-cell',
      minWidth: 120,
      flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.NLSL?.Planet?.slice(0, 3) || "";
        const Occupancy = e?.row?.NLSL?.Occupancy || "";
        const OwnershipArray = e?.row?.NLSL?.Ownership || [];

        return (
          <div className="planet-col-script flex justify-between cursor-pointer">
            <div className="planet-col-planet-text font-ea-sb">{planetName}</div>
            <div className="degreeDiv">
              {applyOccupancyColor(Occupancy)}
              {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
            </div>
          </div>
        );
      },
    },
  ];
  // Adding unique IDs
  const rowsSummaryData = SummaryData?.map((item, index) => ({
    id: index + 1,
    ...item
  }));

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  const handleGridHover = (e) => {
    // Find closest data grid cell or header under the mouse
    const cell = e.target.closest('.MuiDataGrid-cell');
    if (!cell) {
      setHoveredCol(null);
      return;
    }
    const field = cell.getAttribute('data-field');
    if (field) setHoveredCol(field);
  }

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
  <Box width={"100%"} className={`border-radius ${hoveredCol ? `hover-col-${hoveredCol}` : ''}`} onMouseMove={handleGridHover} onMouseLeave={() => setHoveredCol(null)}>

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
          getRowClassName={(params) => params.id === selectedRowId ? 'Mui-selected' : ''}
          // className='rounded-md'
        />

        {/* Dynamic CSS to highlight hovered column (targets MUI DataGrid cells by data-field)
            Header intentionally NOT targeted so its color stays unchanged */}
        <style jsx global>{`
          ${hoveredCol ? `
          .hover-col-${hoveredCol} .MuiDataGrid-cell[data-field="${hoveredCol}"] {
            background-color: var(--secondary-soft-color) !important;
          }
          ` : ''}
        `}</style>

      </Box>
    </>
  )
}

export default NakshtraSummary
