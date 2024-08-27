import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import "./NakshtraSummary.css"
import { Box } from '@mui/material';

function NakshtraSummary({ SummaryData, Aspect, symbols }) {
  const columns = [
    Aspect === 'P'
      ? {
        field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader', flex: 1,
        renderCell: (e) => {
          const { IsRetro, IsExalted, IsDebilitated, IsCombust, IsUntenanted, IsSelfStar } = e.row;
          const activeSymbols = [
            IsRetro && symbols.IsRetro,
            IsExalted && symbols.IsExalted,
            IsDebilitated && symbols.IsDebilitated,
            IsCombust && symbols.IsCombust,
            IsUntenanted && symbols.IsUntenanted,
            IsSelfStar && symbols.IsSelfStar
          ].filter(Boolean).join(" "); // Filter out false values and join symbols with a space

          return (
            <>
              <div className="rashiMainDiv">
                <div className='planetN'>{e.value}
                </div>
                {activeSymbols && <span className='rashiDiv' style={{fontSize:"16px"}}>{activeSymbols}</span>}
              </div>
            </>
          );
        }
      }
      : {
        field: 'id', headerName: 'House', headerClassName: 'rowheader', flex: 1, align: 'center',
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
      field: 'Rashi', headerName: 'Sign', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        const Rashi = e?.value.slice(0, 3) || "";
        const Degree = e?.row?.Degree?.split(":")[0] || "";
        return (
          <>
            <div className="rashiMainDiv">
              <div className='rashiDiv'>{Rashi}.</div>
              <span className='degreeDiv'>{Degree}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'Nakshatra', headerName: 'Nakshatra', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        const Degree = e?.row?.Degree?.split(":")[0] || "";
        return (
          <>
            <div className="NMainDiv">
              <div>{e.value}</div>
              <span className='degreeDiv'>{e?.row?.NakshatraPada}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'EnergyField', headerName: 'Devta', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        return (
          <>
            <div className="plDiv">
              <div className='rashiDiv'>{e.value}</div>
            </div>
          </>
        );
      }
    },
    {
      field: 'PL', headerName: 'PL (Source)', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.PL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.PL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'NL', headerName: 'NL (Result)', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.NL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.NL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'SL', headerName: 'SL (Verifier)', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.SL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.SL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'NLSL', headerName: 'NL-SL (InnerSelf)', headerClassName: 'rowheader', flex: 1,
      renderCell: (e) => {
        const planetName = e?.row?.NLSL?.Planet?.slice(0, 3) || "";
        const scriptFull = e?.row?.NLSL?.ScriptFull || "";

        return (
          <>
            <div className="plDiv">
              <div className='planetN'>{planetName}</div>
              <span>{scriptFull}</span>
            </div>
          </>
        );
      }
    },
    {
      field: 'PHScriptFull', headerName: 'PH', headerClassName: 'rowheader', flex: 1
    },
  ];
  // Adding unique IDs
  const rowsSummaryData = SummaryData?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

  return (

    <Box width={"100%"} sx={{
      '& .MuiDataGrid-cell': {
        borderLeft: '0.5px solid #662294',
        borderBottom: '0.5px solid #662294',
      },
      '& .MuiDataGrid-cell:last-child': {
        borderRight: '0.5px solid #662294',
      }
    }}>
      <DataGrid
        rows={rowsSummaryData}
        columns={columns}
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

export default NakshtraSummary
