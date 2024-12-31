import { Button, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import "./KundaliEvent.css";

function KundaliEventCard({ EventElement, index, handleEditEvent }) {

  const originalData = EventElement?.Astro;

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

  const highlightText = (data) => {
    const dataArr = data.split(", ");

    return dataArr.map((value, index) => {
      const abbreviation = value.trim().slice(0, 2);
      const fullName = shorthandMap[abbreviation];
      const isLast = index === dataArr.length - 1;

      return (
        <span
          className={`pl-${fullName} row-title font-ea-sb`}
          key={abbreviation}
        >
          {value}
          {!isLast && ", "}
        </span>
      );
    });
  };


  const handleEdit = (eid) => {
    handleEditEvent(eid)
  }

  // const headerRow = ['Influence', 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

  const rows = [
    // { id: 'row1', key: 'Influence', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.Planet])) },
    { id: 'row2', key: 'Sign', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.RashiDegree])) },
    { id: 'row3', key: 'Nakshatra', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.Nakshatra])) },
    { id: 'row4', key: 'NL🡒SL', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item])) },
    { id: 'row5', key: 'Planet', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.AspectPlanet])) },
    { id: 'row6', key: 'House', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.AspectHouse])) },
    { id: 'row7', key: 'Cumulative', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.AspectCumulativeHouse])) },
  ];
  const columnHeaders = [...originalData.map(item => item.Planet)];

  const columns = [
    { field: 'key', headerName: "Influence", width: 100, headerClassName: 'rowheader' }, // First column header
    ...columnHeaders.map((header, index) => ({
      field: `col${index + 1}`,
      headerName: header, // Use the provided header names
      // minWidth: 105,
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: (params) => {
        const row = params.row?.id;
        if (row == "row2") {
          // const data = params?.value?.split(" ");
          // return <>
          //   <span className='font-ea-sb'>{data[0]} </span>
          //   {data[1]}{data[2]}
          // </>
        } else if (row == "row5") {
          const data = params?.value?.split(", ");
          return <>
            <span className='break-words whitespace-normal overflow-visible !leading-relaxed'>
              {highlightText(params?.value)}
            </span>
          </>
        }
        else if (row == "row4") {
          const NL = params?.formattedValue?.NL;
          const SL = params?.formattedValue?.SL;
          return <>
            <span className='break-words whitespace-normal overflow-visible !leading-relaxed'>{NL} 🡒 {SL}</span>
          </>
        }
      }
    })),
  ];

  const getRowHeight = (params) => {
    if (params.id == "row5" || params.id == "row7" || params.id == "row4") {
      return "auto";
    } else {
      return 30;
    }
  };

  const getRowClassName = (params) => {
    if (params.id === "row5" || params.id == "row4") {
      return 'row5-style';
    }else if( params.id == "row7"){
      return 'row7-style';
    }
    return '';
  };


  return (
    <>
      <div className='flex flex-col mb-6 border-t border-[var(--border-color)]'>
        <div className={`text-black font-ea-n px-2 md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col bg-[#f5f5f5]`}>
          <div>
          <div className='flex items-center text-xl'>
            <span className='text-primary font-ea-sb'>{index + 1}. {EventElement.Event}</span>

            <div>
              <Button className='p-1 min-w-6 w-6 ml-2' onClick={() => handleEdit(EventElement.EventID)}><i className='tabler-edit text-black text-[20px]'></i></Button>
            </div>
          </div>
          <div className={`flex items-center`} >
            <div className='flex flex-col gap-1 chart-date'>
              {/* <span className='label font-ea-n'>Event Date & Time: </span> */}
              <span className='value font-ea-sb text-black'>
                {EventElement?.EventDate}
                <span className='font-ea-n'> {EventElement?.EventTime.substring(0, 2)}:{EventElement?.EventTime.substring(2, 4)}:{(EventElement?.EventTime.substring(4, 6) ? EventElement?.EventTime.substring(4, 6) : '00')},
                </span>
              </span>
            </div>
            <div className='flex flex-col'>
              {/* <span className='label font-ea-n'>Place: </span> */}
              <span className='value font-ea-n'>{EventElement?.City}, {EventElement?.Country}</span>
            </div>
          </div>
          </div>
        </div>
        <div className='p-0 pt-0'>
          <DataGrid
            showCellVerticalBorder
            rows={rows}
            columns={columns}
            // pageSize={5}
            hideFooter={true}
            disableColumnSorting
            disableColumnMenu
            // rowHeight={40}
            columnHeaderHeight={38}
            disableColumnResize
            hideFooterPagination={true}
            showColumnVerticalBorder
            getCellClassName={(params) => (params.field === 'key' ? 'font-ea-sb text-primary' : 'text-black')}
            getRowHeight={getRowHeight}
            // className='RahuKetuGrid'
            getRowClassName={getRowClassName}
            className='eventGrid'
          />
        </div>
      </div>
      {/* <Divider  /> */}
    </>
  )
}

export default KundaliEventCard
