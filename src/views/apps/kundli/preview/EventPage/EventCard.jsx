import { Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function EventCard({ BirthDetails, JaiminiCharKarakas }) {
  const columns = [
    ...JaiminiCharKarakas.map(item => ({
      field: item.Karak,
      headerName: `${item.Karak} Karaka`,
      flex: 1,
      sortable: false,
      headerClassName: 'rowheader',
    })),
  ];

  // Creating rows for 'Planet' and 'Degree'
  const rows = [
    {
      id: 1,
      rowLabel: 'Planet',
      ...JaiminiCharKarakas.reduce((acc, item) => {
        acc[item.Karak] = item.Planet;
        return acc;
      }, {}),
    },
    {
      id: 2,
      rowLabel: 'Degree',
      ...JaiminiCharKarakas.reduce((acc, item) => {
        acc[item.Karak] = item.Degree;
        return acc;
      }, {}),
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className={`text-black font-ea-n px-2 md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col`}>
          <div className='flex items-center text-xl'>
            <span className='text-primary font-ea-sb'>Good</span>
          </div>
          <div className={`flex items-center`} >
            <div className='flex flex-col gap-1 chart-date'>
              {/* <span className='label font-ea-n'>Event Date & Time: </span> */}
              <span className='value font-ea-sb text-black'>{BirthDetails?.BirthDate}
                <span className='font-ea-n'> {BirthDetails?.BirthTime.substring(0, 2)}:{BirthDetails?.BirthTime.substring(2, 4)}:{(BirthDetails?.BirthTime.substring(4, 6) ? BirthDetails?.BirthTime.substring(4, 6) : '00')},
                </span>
              </span>
            </div>
            <div className='flex flex-col'>
              {/* <span className='label font-ea-n'>Place: </span> */}
              <span className='value font-ea-n'>{BirthDetails?.City}, {BirthDetails?.Country}</span>
            </div>
          </div>
        </div>
        <div className='p-2 pt-0'>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            hideFooter={true}
            disableColumnSorting
            disableColumnMenu
            rowHeight={40}
            columnHeaderHeight={38}
            disableColumnResize
            hideFooterPagination={true}
            showColumnVerticalBorder
          />
        </div>
      </div>
      <Divider />
      {/* <hr></hr> */}
    </>
  )
}

export default EventCard
