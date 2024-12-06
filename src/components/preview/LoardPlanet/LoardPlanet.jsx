import { Box, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function LoardPlanet({ LoardData, SelectedEventVal, symbols }) {

  const applyOccupancyColor = (Occupancy) => {
    if (SelectedEventVal) {
      const positive = SelectedEventVal.Positive?.split(", ").map(Number) || [];
      const negative = SelectedEventVal.Negative?.split(", ").map(Number) || [];
      const occupancyNumber = Number(Occupancy);

      if (positive.includes(occupancyNumber)) {
        return <div className='bg-[var(--green-bg-color)] px-[2px]'>
          <span className="text-[var(--green-text-color)] font-ea-sb">
            {occupancyNumber}
          </span>
        </div>
      } else if (negative.includes(occupancyNumber)) {
        return <div className='bg-[var(--red-bg-color)] px-[2px]'>
          <span className="text-[var(--red-text-color)] font-ea-sb">
            {occupancyNumber}
          </span>
        </div>
      }
    }
    return Occupancy;
  };

  const applyOwnerShipColor = (OwnershipArray) => {
    const formattedOwnership = OwnershipArray?.map((ownershipItem, index) => {
      const ownershipNumber = Number(ownershipItem);

      if (SelectedEventVal) {
        const positiveValues = SelectedEventVal.Positive.split(', ').map(Number);
        const negativeValues = SelectedEventVal.Negative.split(', ').map(Number);

        // Apply green color if ownership is in Positive, red if in Negative
        if (positiveValues.includes(ownershipNumber)) {
          return (
            <div className='bg-[var(--green-bg-color)] px-[2px]'>
              <span key={index} className="text-[var(--green-text-color)] font-ea-sb">
                {ownershipItem}
                {index < OwnershipArray.length - 1 && ', '}
              </span>
            </div>
            // <span key={index} className="text-[var(--green-text-color)] font-ea-sb">
            //   {ownershipItem}
            //   {index < OwnershipArray.length - 1 && ', '}
            // </span>
          );
        } else if (negativeValues.includes(ownershipNumber)) {
          return (
            <div className='bg-[var(--red-bg-color)] px-[2px]'>
              <span key={index} className="text-[var(--red-text-color)] font-ea-sb">
                {ownershipItem}
                {index < OwnershipArray.length - 1 && ', '}
              </span>
            </div>
            // <span key={index} className="text-[var(--red-text-color)] font-ea-sb">
            //   {ownershipItem}
            //   {index < OwnershipArray.length - 1 && ', '}
            // </span>
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

  const getSymbolArr = (data) => {
    const { IsRetro, IsExalted, IsDebilitated, IsCombust, IsUntenanted, IsSelfStar, IsExchange } = data;
    const activeSymbols = [
      IsExalted && symbols.IsExalted,
      IsDebilitated && symbols.IsDebilitated,
      IsCombust && symbols.IsCombust,
      IsExchange && symbols.IsExchange,
      IsUntenanted && symbols.IsUntenanted,
      IsSelfStar && symbols.IsSelfStar,
      IsRetro && symbols.IsRetro,
    ].filter(Boolean).join(" ");
    return activeSymbols;
  }

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
      <span className={`pl-${fullName} row-title  font-ea-sb`} key={abbreviation}>
        {value}
      </span>
    );
  };


  const columns1 = [
    {
      field: 'rahuId',
      headerName: LoardData.Planet,
      width: 130,
      headerClassName: 'rowheader',
      renderCell: (params) => {
        if (params?.row?.symbol) {
          return <div className='flex justify-between rahuHeader'>
            {/* <div>{params.value}</div> */}
            {highlightText(params.value)}
            <div>{params?.row?.symbol}</div>
          </div>;
        }
        // return <div className='rahuHeader'>{params.value}</div>;
        return <> {highlightText(params.value)}</>;
      },
    },
    {
      field: 'rahuScriptFull',
      headerClassName: 'rowheader',
      headerName: (
        <div className='valueHeader'>
          <div className='me-1'>{LoardData.Nakshatra}</div> /{' '}
          <div className='ms-1'>{LoardData.NakshatraPada}</div>
        </div>
      ),
      width: 10,
      flex: 1,
      renderCell: (params) => {
        const scriptFull = params.value || '';
        let formattedScript = scriptFull.split(" / ");
        let ownership = Array(formattedScript[1]?.split(", "))
        return <div className='degreeDiv'>{applyOccupancyColor(formattedScript[0])} &nbsp;/&nbsp; {applyOwnerShipColor(ownership[0])}
        </div>;
      },
    },
  ];

  const rows = [
    // { rahuId: 'Vedic Aspect', rahuScriptFull: LoardData.Aspect }
    { rahuId: LoardData.PL.Planet, rahuScriptFull: LoardData.PL.ScriptFull, symbol: getSymbolArr(LoardData) },
    { rahuId: LoardData.NL.Planet, rahuScriptFull: LoardData.NL.ScriptFull, symbol: "" },
    { rahuId: LoardData.SL.Planet, rahuScriptFull: LoardData.SL.ScriptFull, symbol: "" },
  ];

  const rowsSummaryData = rows?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

  return (
    <Box >

        <DataGrid
          showCellVerticalBorder
          // getRowId={(row) => row.rahuId}
          getRowId={rowsSummaryData.id}
          rows={rowsSummaryData}
          columns={columns1}
          disableColumnSorting
          disableColumnMenu
          rowHeight={30}
          columnHeaderHeight={38}
          disableColumnResize
          disableRowSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
        />

    </Box>
  )
}

export default LoardPlanet
