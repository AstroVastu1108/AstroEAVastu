import { Box, createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function RahuKetu({ RahuData, KetuData, SelectedEventVal }) {

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
    const abbreviation = value.trim().slice(0, 2);
    const fullName = shorthandMap[abbreviation];

    return (
      <div className={`pl-${fullName} planetName`} key={abbreviation}>
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

        // Apply green color if ownership is in Positive, red if in Negative
        if (positiveValues.includes(ownershipNumber)) {
          return (
            <div className='bg-[var(--green-bg-color)] px-[2px]'>
              <span key={index} className="text-[var(--green-text-color)] font-ea-sb">
                {ownershipItem}
                {index < OwnershipArray.length - 1 && ', '}
              </span>
            </div>
          );
        } else if (negativeValues.includes(ownershipNumber)) {
          return (
            <div className='bg-[var(--red-bg-color)] px-[2px]'>
              <span key={index} className="text-[var(--red-text-color)] font-ea-sb">
                {ownershipItem}
                {index < OwnershipArray.length - 1 && ', '}
              </span>
            </div>
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

  const columns1 = [
    {
      field: 'rahuId', headerName: 'Rahu', width: 140, headerClassName: 'rowheader',
      renderCell: (params) => {
        return <div className='rahuHeader font-ea-sb'>{params.value}</div>
      }
    },
    {
      field: 'rahuScriptFull', headerClassName: 'rowheader',
      headerName: RahuData.ScriptFull,
      width: 200,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const dataValue = params.value;
        const Occupancy = params?.row?.rahuScriptFull?.Occupancy || "";
        const OwnershipArray = params?.row?.rahuScriptFull?.Ownership || [];
        // If the value is an array, use map to render multiple elements
        if (Array.isArray(dataValue)) {
          return (
            <>
              {dataValue.map((element, index) => (
                <div className="valueData flex " key={index}>
                  {highlightText(element?.Planet)}
                  <div className="degreeDiv">
                    {applyOccupancyColor(element?.Occupancy)}
                    {element?.Ownership.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(element?.Ownership)}</span> : ""}
                  </div>
                </div>
              ))}
            </>
          );
        } else {
          return (
            <div className="valueData flex ">
              {highlightText(dataValue?.Planet)}
              <div className="degreeDiv">
                {applyOccupancyColor(Occupancy)}
                {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
              </div>
            </div>
          );
        }
      }

    }
  ];

  const columns2 = [
    {
      field: 'ketuId', headerName: 'Ketu', headerClassName: 'rowheader', width: 140, renderCell: (params) => {
        return <div className='rahuHeader font-ea-sb'>{params.value}</div>
      }
    },
    {
      field: 'ketuScriptFull', headerClassName: 'rowheader',
      headerName: KetuData.ScriptFull,
      width: 200,
      minWidth: 200,
      flex: 1,
      // renderCell: (params) => {
      //   const dataValue = params.value;

      //   // If the value is an array, use map to render multiple elements
      //   if (Array.isArray(dataValue)) {
      //     return (
      //       <>
      //         {dataValue.map((element, index) => (
      //           <div className='valueData' key={index}>
      //             {highlightText(element?.Planet)}
      //             <div className='sf'>
      //               {element?.ScriptFull}
      //             </div>
      //           </div>
      //         ))}
      //       </>
      //     );
      //   } else {
      //     return (
      //       <div className='valueData'>
      //         {highlightText(dataValue?.Planet)}
      //         <div className='sf'>
      //           {dataValue?.ScriptFull}
      //         </div>
      //       </div>
      //     );
      //   }
      // }
      renderCell: (params) => {
        const dataValue = params.value;

        const Occupancy = params?.row?.ketuScriptFull?.Occupancy || "";
        const OwnershipArray = params?.row?.ketuScriptFull?.Ownership || [];
        // If the value is an array, use map to render multiple elements
        if (Array.isArray(dataValue)) {
          return (
            <>
              {dataValue.map((element, index) => (
                <div className="valueData flex " key={index}>
                  {highlightText(element?.Planet)}
                  <div className="degreeDiv">
                    {applyOccupancyColor(element?.Occupancy)}
                    {element?.Ownership.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(element?.Ownership)}</span> : ""}
                  </div>
                </div>
              ))}
            </>
          );
        } else {
          return (
            <div className="valueData flex ">
              {/* <div className="planet-col-planet-text">{planetName}</div> */}
              {highlightText(dataValue?.Planet)}
              <div className="degreeDiv">
                {applyOccupancyColor(Occupancy)}
                {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
              </div>
            </div>
          );
        }
      }

    },
  ];

  const rows = [
    { rahuId: 'Conjunction', rahuScriptFull: RahuData.Conjunction, ketuId: 'Conjunction', ketuScriptFull: KetuData.Conjunction },
    { rahuId: 'Vedic Aspect', rahuScriptFull: RahuData.Aspect, ketuId: 'Vedic Aspect', ketuScriptFull: KetuData.Aspect },
    { rahuId: 'Nakshatra', rahuScriptFull: RahuData.NL, ketuId: 'Nakshatra', ketuScriptFull: KetuData.NL },
    { rahuId: 'Sign', rahuScriptFull: RahuData.RL, ketuId: 'Sign', ketuScriptFull: KetuData.RL },
  ];

  const getRowHeight = (params) => {
    const rahudataValue = params?.model?.rahuScriptFull;
    const ketudataValue = params?.model?.ketuScriptFull;

    // Check if both values are arrays, and take the maximum length
    const rahuLength = Array.isArray(rahudataValue) ? rahudataValue.length : 0;
    const ketuLength = Array.isArray(ketudataValue) ? ketudataValue.length : 0;

    // Get the maximum length from both arrays
    const maxLength = Math.max(rahuLength, ketuLength);

    // Adjust the row height based on the maximum length, otherwise return default height
    return maxLength > 0 ? 30 * maxLength : 30;
  };

  return (
    <>
      <Box className="w-[100%] md:w-[calc(50%-8px)] sm:w-[calc(50%-8px)]" >

        <DataGrid
          showCellVerticalBorder
          getRowId={(row) => row.rahuId}
          rows={rows} columns={columns1}
          disableColumnSorting
          disableColumnMenu
          rowHeight={30}
          columnHeaderHeight={38}
          disableColumnResize
          disableRowSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
          getRowHeight={getRowHeight}
          className='RahuKetuGrid'
        />

      </Box>
      <Box className="w-[100%] md:w-[calc(50%-8px)] sm:w-[calc(50%-8px)]">
        <DataGrid
          showCellVerticalBorder
          getRowId={(row) => row.rahuId}
          rows={rows} columns={columns2}
          disableColumnSorting
          disableColumnMenu
          rowHeight={30}
          columnHeaderHeight={38}
          disableColumnResize
          disableRowSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
          getRowHeight={getRowHeight}
        />
      </Box>
    </>
  )
}

export default RahuKetu
