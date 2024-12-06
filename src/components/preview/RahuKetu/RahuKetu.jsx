import { Box, createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function RahuKetu({ RahuData, KetuData }) {

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

        // If the value is an array, use map to render multiple elements
        if (Array.isArray(dataValue)) {
          return (
            <>
              {dataValue.map((element, index) => (
                <div className='valueData' key={index}>
                  {highlightText(element?.Planet)}
                  <div className='sf'>
                    {element?.ScriptFull}
                  </div>
                </div>
              ))}
            </>
          );
        } else {
          return (
            <div className='valueData'>
              {highlightText(dataValue?.Planet)}
              <div className='sf'>
                {dataValue?.ScriptFull}
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
      renderCell: (params) => {
        const dataValue = params.value;

        // If the value is an array, use map to render multiple elements
        if (Array.isArray(dataValue)) {
          return (
            <>
              {dataValue.map((element, index) => (
                <div className='valueData' key={index}>
                  {highlightText(element?.Planet)}
                  <div className='sf'>
                    {element?.ScriptFull}
                  </div>
                </div>
              ))}
            </>
          );
        } else {
          return (
            <div className='valueData'>
              {highlightText(dataValue?.Planet)}
              <div className='sf'>
                {dataValue?.ScriptFull}
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
