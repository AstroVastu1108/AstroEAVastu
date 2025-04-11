import { Button, Chip, Collapse, Divider, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import './KundaliEvent.css'

function KundaliEventCard({ EventElement, index, handleEditEvent, SelectedEventVal }) {
  const originalData = EventElement?.Astro
  const Summary = EventElement?.Summary
  const CurrentMDScript = EventElement?.CurrentMDScript
  const CurrentPDScript = EventElement?.CurrentPDScript
  const CurrentADScript = EventElement?.CurrentADScript

  const planetClass = {
    ketu: 'ketu',
    venus: 'venus',
    sun: 'sun',
    moon: 'moon',
    mars: 'mars',
    rahu: 'rahu',
    jupiter: 'jupiter',
    saturn: 'saturn',
    mercury: 'mercury',
    uranus: 'uranus',
    neptune: 'neptune',
    pluto: 'pluto'
  }

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
  }

  const highlightText = (data, isHeader = false) => {
    const dataArr = data.split(', ')

    return dataArr.map((value, index) => {
      const abbreviation = value.trim().slice(0, 2)
      const fullName = shorthandMap[abbreviation] || 'black'
      const isLast = index === dataArr.length - 1
      const planet = value

      return (
        <span className={`pl-${fullName} row-title ${isHeader ? `font-ea-n` : `font-ea-sb`} `} key={abbreviation}>
          {planet.slice(0, 3)}
          <span className='text-black'>{!isLast && ', '}</span>
        </span>
      )
    })
  }

  const applyOccupancyColor = Occupancy => {
    if (SelectedEventVal) {
      const positive = SelectedEventVal.Positive?.split(', ').map(Number) || []
      const negative = SelectedEventVal.Negative?.split(', ').map(Number) || []
      const occupancyNumbers = Occupancy?.split(', ').map(Number) || []

      return (
        <>
          {occupancyNumbers
            .map((num, index) => {
              if (positive.includes(num)) {
                return (
                  <span
                    key={index}
                    className='bg-[var(--green-bg-color)] text-[var(--green-text-color)] font-ea-sb px-[2px] py-0 break-words whitespace-normal overflow-visible !leading-relaxed'
                  >
                    {num}
                  </span>
                )
              } else if (negative.includes(num)) {
                return (
                  <span
                    key={index}
                    className='bg-[var(--red-bg-color)] text-[var(--red-text-color)] font-ea-sb px-[2px] py-0 break-words whitespace-normal overflow-visible !leading-relaxed'
                  >
                    {num}
                  </span>
                )
              } else {
                if (num != 0) {
                  return (
                    <span
                      key={index}
                      className='px-[2px] text-black py-0 break-words whitespace-normal overflow-visible !leading-relaxed'
                    >
                      {num}
                    </span>
                  )
                } else {
                  return
                }
              }
            })
            .reduce((prev, curr, idx) => (
              <>
                {prev}
                {idx > 0 && ', '}
                {curr}
              </>
            ))}
        </>
      )
    }
    return Occupancy
  }

  // const applyPlanetAndOccupancyColor = (data) => {
  //   if (!SelectedEventVal) return data;

  //   const items = data.split(", "); // Split the data by commas and spaces
  //   const positive = SelectedEventVal.Positive?.split(", ").map(Number) || [];
  //   const negative = SelectedEventVal.Negative?.split(", ").map(Number) || [];

  //   return (
  //     <div>
  //       {items.map((item, index) => {
  //         const isNumber = !isNaN(Number(item.trim()));
  //         const isLast = index === items.length - 1;

  //         if (isNumber) {
  //           const num = Number(item.trim());
  //           if (positive.includes(num)) {
  //             return (
  //               <span
  //                 key={`num-${index}`}
  //                 className="bg-[var(--green-bg-color)] text-[var(--green-text-color)] font-ea-sb px-[2px]"
  //               >
  //                 {num}
  //                 {!isLast && ", "}
  //               </span>
  //             );
  //           } else if (negative.includes(num)) {
  //             return (
  //               <span
  //                 key={`num-${index}`}
  //                 className="bg-[var(--red-bg-color)] text-[var(--red-text-color)] font-ea-sb px-[2px]"
  //               >
  //                 {num}
  //                 {!isLast && ", "}
  //               </span>
  //             );
  //           } else {
  //             return (
  //               <span key={`num-${index}`} className="px-[2px]">
  //                 {num}
  //                 {!isLast && ", "}
  //               </span>
  //             );
  //           }
  //         } else {
  //           const abbreviation = item.trim().slice(0, 2);
  //           const fullName = shorthandMap[abbreviation] || "black";
  //           return (
  //             <span
  //               key={`text-${index}`}
  //               className={`pl-${fullName} row-title font-ea-sb`}
  //             >
  //               {item.trim()}
  //               <span className="text-black">
  //                 {!isLast && ", "}
  //               </span>
  //             </span>
  //           );
  //         }
  //       })}
  //     </div>
  //   );
  // };

  const applyPlanetAndOccupancyColor = data => {
    const items = data.split(', ') // Split the data by commas and spaces

    // Handle the case where SelectedEventVal is null
    const positive = SelectedEventVal?.Positive?.split(', ').map(Number) || []
    const negative = SelectedEventVal?.Negative?.split(', ').map(Number) || []

    return (
      <div>
        {items.map((item, index) => {
          const isNumber = !isNaN(Number(item.trim()))
          const isLast = index === items.length - 1

          if (isNumber) {
            if (SelectedEventVal) {
              const num = Number(item.trim())
              let className = 'px-[2px] break-words whitespace-normal overflow-visible !leading-relaxed'
              if (positive.includes(num)) {
                className = 'bg-[var(--green-bg-color)] text-[var(--green-text-color)] font-ea-sb px-[2px]'
              } else if (negative.includes(num)) {
                className = 'bg-[var(--red-bg-color)] text-[var(--red-text-color)] font-ea-sb px-[2px]'
              } else if (num == 0) {
                return
              }
              return (
                <React.Fragment key={`num-${index}`}>
                  <span className={className}>{num}</span>
                  {!isLast && <span>, </span>}
                </React.Fragment>
              )
            } else {
              return (
                <React.Fragment key={`num-${index}`}>
                  <span className='px-[2px]'>{item.trim()}</span>
                  {!isLast && <span>, </span>}
                </React.Fragment>
              )
            }
          } else {
            // Highlight only planet names
            const abbreviation = item.trim().slice(0, 2)
            const fullName = shorthandMap[abbreviation] || 'black'
            return (
              <React.Fragment key={`text-${index}`}>
                <span className={`pl-${fullName} row-title font-ea-n`}>{item.trim().slice(0, 3)}</span>
                {!isLast && <span>, </span>}
              </React.Fragment>
            )
          }
        })}
      </div>
    )
  }

  const handleEdit = eid => {
    console.warn("EventElement",EventElement)

    handleEditEvent(eid)
  }

  const rows = [
    // { id: 'row1', key: 'Influence', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.Planet])) },
    { id: 'row2', key: 'Sign', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item])) },
    {
      id: 'row3',
      key: 'Nakshatra',
      ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.Nakshatra]))
    },
    { id: 'row4', key: 'NL 🡒 SL', ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item])) },
    {
      id: 'row5',
      key: 'Planet',
      ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.AspectPlanet]))
    },
    {
      id: 'row6',
      key: 'House',
      ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.AspectHouse]))
    },
    {
      id: 'row7',
      key: 'Cumulative',
      ...Object.fromEntries(originalData.map((item, index) => [`col${index + 1}`, item.AspectCumulativeHouse]))
    }
  ]

  const columnHeaders = originalData.map(item => {
    const symbol = ' ⮌' // Define your symbol
    if (item.Planet.includes(' R')) {
      return (
        <span>
          {item.Planet.replace(/ R\b/, '')}
          <span className='text-white'>{symbol}</span>
        </span>
      )
    }
    return item.Planet
  })

  const columns = [
    { field: 'key', headerName: 'Influence', width: 100, headerClassName: 'rowheader' }, // First column header
    ...columnHeaders.map((header, index) => ({
      field: `col${index + 1}`,
      headerName: header, // Use the provided header names
      // minWidth: 105,
      flex: 1,
      headerClassName: 'rowheader',
      renderCell: params => {
        const row = params.row?.id
        if (row == 'row2') {
          const Rashi = params?.formattedValue?.Rashi?.slice(0, 3) || ''
          // const Rashi = params?.formattedValue?.Rashi || "";
          const Degree = params?.formattedValue?.Degree?.split(':')[0] || ''
          const Min = params?.formattedValue?.Degree?.split(':')[1] || ''
          // console.log(data)
          return (
            <>
              <div className='flex'>
                <div className='text-primary pe-3'>{Rashi}.</div>
                <div>
                  {Degree}° {Min}'
                </div>
              </div>
            </>
          )
        } else if (row == 'row5') {
          const data = params?.value?.split(', ')
          return (
            <>
              <span className='break-words whitespace-normal overflow-visible !leading-relaxed'>
                {highlightText(params?.value)}
              </span>
            </>
          )
        } else if (row == 'row4') {
          const NL = params?.formattedValue?.NL?.slice(0, 3)
          const SL = params?.formattedValue?.SL?.slice(0, 3)
          return (
            <>
              <span className='break-words whitespace-normal overflow-visible !leading-relaxed'>
                {highlightText(NL)} 🡒 {highlightText(SL)}
              </span>
            </>
          )
        } else if (row == 'row6') {
          const arr1 = params.value.split('/')[0]
          const arr2 = params.value.split('/')[1]
          return (
            <>
              {/* <div className=''> */}
              {applyOccupancyColor(arr1)} {arr2?.length ? <span className=''>/ {applyOccupancyColor(arr2)}</span> : ''}
              {/* </div> */}
            </>
          )
        } else if (row == 'row7') {
          // console.log("here : ",params.value)
          return <>{applyOccupancyColor(params.value)}</>
        }
      }
    }))
  ]

  const getRowHeight = params => {
    if (params.id == 'row5' || params.id == 'row7' || params.id == 'row6') {
      return 'auto'
    } else {
      return 30
    }
  }

  const getRowClassName = params => {
    if (params.id === 'row5') {
      return 'row5-style'
    } else if (params.id == 'row7') {
      return 'row7-style'
    } else if (params.id == 'row6') {
      return 'row7-style'
    }
    return ''
  }

  // const getNumber = (items) => {
  //   const items = input.split(", ").map(item => item.trim());
  //   const numbers = items.filter(item => !isNaN(Number(item)));
  //   const numericValues = numbers.map(Number);
  //   return applyOccupancyColor(numericValues);
  // }

  const GetDashaDetail = params => {
    const arr1 = params.split('/')[0]
    const arr2 = params.split('/')[1]
    return (
      <>
        <div className='flex'>
          {applyOccupancyColor(arr1)}{' '}
          {arr2?.length ? (
            <>
              {' '}
              <span className='px-1'> / </span> {applyOccupancyColor(arr2)}
            </>
          ) : (
            ''
          )}
        </div>
      </>
    )
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleGrid = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <>
      <div className='flex flex-col border-t border-[var(--border-color)]'>
        <div className={`text-black font-ea-n md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col `}>
          <div className='flex justify-between text-[14px]'>
            <div className=' pb-2 w-[20%]'>
              <table>
                <tr className='bg-[var(--primary-soft-color)] text-[18px] '>
                  <td className='px-2 w-1 py-[5px] '>{index + 1 < 10 ? `0${index + 1}` : index + 1}.</td>
                  <td>
                    <div className='flex items-center'>
                      <span className='text-primary font-ea-sb'> {EventElement.Event}</span>
                    </div>
                  </td>
                  <td>
                    <IconButton
                      aria-label='close'
                      onClick={()=>handleEdit(EventElement.EventID)} // Replace with your close handler function
                      sx={{
                        color: 'white'
                      }}
                    >
                    <i className={'tabler-edit text-primary'} />
                    </IconButton>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div className={`flex items-center`}>
                      <div className='flex flex-col gap-1 chart-date'>
                        {/* <span className='label font-ea-n'>Event Date & Time: </span> */}
                        <span className='value font-ea-sb text-black'>
                          {EventElement?.EventDate}
                          <span className='font-ea-n'>
                            {' '}
                            {EventElement?.EventTime.substring(0, 2)}:{EventElement?.EventTime.substring(2, 4)}:
                            {EventElement?.EventTime.substring(4, 6) ? EventElement?.EventTime.substring(4, 6) : '00'}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      {/* <span className='label font-ea-n'>Place: </span> */}
                      <span className='value font-ea-n'>
                        {EventElement?.City}, {EventElement?.Country}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div>
                      {EventElement?.Remark && <>({EventElement?.Remark})</>}
                      {/* <sapn className="pe-2">{highlightText(EventElement?.CurrentMD)} - {highlightText(EventElement?.CurrentPD)} - {highlightText(EventElement?.CurrentAD)}
                      </sapn> */}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className='w-[40%]  pb-2 border-l border-[var(--border-color)]'>
              <table>
                <tr className='bg-[var(--primary-soft-color)]'>
                  <td colSpan={2} className='text-primary font-ea-sb px-2 py-2'>
                    Combined Planetary Influence
                  </td>
                </tr>
                <tr className='px-2'>
                  <td className='ps-2 text-primary font-ea-sb w-[27%]'>Sat + Jup </td>
                  <td className='flex'>
                    {' '}
                    <div className='pe-2'>🡒</div> {applyPlanetAndOccupancyColor(Summary?.SatJup, true)}
                  </td>
                </tr>
                <tr className='px-2'>
                  <td className='ps-2 text-primary font-ea-sb'>Sat + Jup + Sun</td>
                  <td className='flex'>
                    {' '}
                    <div className='pe-2'>🡒</div> {applyPlanetAndOccupancyColor(Summary?.SatJupSun, true)}
                  </td>
                </tr>
                <tr className='px-2'>
                  <td className='ps-2 text-primary font-ea-sb'>Sat + Jup + Rahu</td>
                  <td className='flex'>
                    {' '}
                    <div className='pe-2'>🡒</div> {applyPlanetAndOccupancyColor(Summary?.SatJupRah, true)}
                  </td>
                </tr>
                <tr className='px-2'>
                  <td className='ps-2 text-primary font-ea-sb'>Sat + Jup + Ketu</td>
                  <td className='flex'>
                    {' '}
                    <div className='pe-2'>🡒</div> {applyPlanetAndOccupancyColor(Summary?.SatJupKet, true)}
                  </td>
                </tr>
              </table>
            </div>
            <div className='flex w-[40%] justify-between'>
              <div className='w-auto grow pb-2 border-l border-[var(--border-color)]'>
                <table>
                  <tr className='bg-[var(--primary-soft-color)]'>
                    {/* <td><div className='px-2 py-1'>Dasha 🡒</div></td> */}
                    <td className='px-2 py-2 font-ea-sb text-primary' colSpan={4}>
                      MahaDasha
                    </td>
                  </tr>
                  <tr>
                    <td className='ps-2 font-ea-sb text-primary'>PL</td>
                    <td className='ps-1'>🡒</td>
                    <td className='px-1 text-black font-ea-sb'>{highlightText(CurrentMDScript?.PL?.Planet)} </td>
                    <td className='pe-2'>{GetDashaDetail(CurrentMDScript?.PL?.ScriptFull)}</td>
                  </tr>
                  <tr>
                    <td className='ps-2 font-ea-sb text-primary'>NL</td>
                    <td className='ps-1'>🡒</td>
                    <td className='px-1 text-black font-ea-sb'>{highlightText(CurrentMDScript?.NL?.Planet)}</td>
                    <td className='pe-2'>{GetDashaDetail(CurrentMDScript?.NL?.ScriptFull)}</td>
                  </tr>
                  <tr>
                    <td className='ps-2 font-ea-sb text-primary'>SL</td>
                    <td className='ps-1'>🡒</td>
                    <td className='px-1 text-black font-ea-sb'>{highlightText(CurrentMDScript?.SL?.Planet)} </td>
                    <td className='pe-2'>{GetDashaDetail(CurrentMDScript?.SL?.ScriptFull)}</td>
                  </tr>
                </table>
              </div>
              <div className='w-auto grow pb-2 border-l border-[var(--border-color)]'>
                <table>
                  <tr className='bg-[var(--primary-soft-color)]'>
                    <td className='px-2 py-2 font-ea-sb  text-primary' colSpan={4}>
                      AntarDasha
                    </td>
                  </tr>
                  <tr>
                    <td className='ps-2 pe-1 text-black font-ea-sb'>{highlightText(CurrentADScript?.PL?.Planet)} </td>
                    <td className='pe-2'>{GetDashaDetail(CurrentADScript?.PL?.ScriptFull)}</td>
                  </tr>
                  <tr>
                    <td className='ps-2 pe-1 text-black font-ea-sb'>{highlightText(CurrentADScript?.NL?.Planet)} </td>
                    <td className='pe-2'>{GetDashaDetail(CurrentADScript?.NL?.ScriptFull)}</td>
                  </tr>
                  <tr>
                    <td className='ps-2 pe-1 text-black font-ea-sb'>{highlightText(CurrentADScript?.SL?.Planet)} </td>
                    <td className='pe-2'>{GetDashaDetail(CurrentADScript?.SL?.ScriptFull)}</td>
                  </tr>
                </table>
              </div>
              <div className='w-auto grow pb-2 border-l border-[var(--border-color)]'>
                <table>
                  <tr className='bg-[var(--primary-soft-color)]'>
                    <td className='px-2 py-2 font-ea-sb  text-primary' colSpan={3}>
                      PratyantarDasha
                    </td>
                    <td>
                      <div className='flex-grow flex justify-end items-center'>
                        <Button
                          variant='outlined'
                          size='small'
                          onClick={toggleGrid}
                          sx={{
                            borderColor: 'var(--border-color)',
                            color: 'var(--primary-color)',
                            ':hover': {
                              backgroundColor: 'var(--primary-soft-color)',
                              borderColor: 'var(--primary-color)'
                            }
                          }}
                        >
                          {isExpanded ? (
                            <i className='tabler-circle-arrow-up'></i>
                          ) : (
                            <i className='tabler-circle-arrow-down'></i>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='ps-2 pe-1 text-black font-ea-sb'>{highlightText(CurrentPDScript?.PL?.Planet)}</td>
                    <td className='pe-2'> {GetDashaDetail(CurrentPDScript?.PL?.ScriptFull)}</td>
                  </tr>
                  <tr>
                    <td className='ps-2 pe-1 text-black font-ea-sb'>{highlightText(CurrentPDScript?.NL?.Planet)} </td>
                    <td className='pe-2'> {GetDashaDetail(CurrentPDScript?.NL?.ScriptFull)}</td>
                  </tr>
                  <tr>
                    <td className='ps-2 pe-1 text-black font-ea-sb'>{highlightText(CurrentPDScript?.SL?.Planet)} </td>
                    <td className='pe-2'> {GetDashaDetail(CurrentPDScript?.SL?.ScriptFull)}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Collapse in={isExpanded} timeout='auto' unmountOnExit>
          <div className='p-0 pt-0 mb-0'>
            <DataGrid
              showCellVerticalBorder
              rows={rows}
              columns={columns}
              hideFooter={true}
              disableColumnSorting
              disableColumnMenu
              columnHeaderHeight={32}
              disableColumnResize
              hideFooterPagination={true}
              showColumnVerticalBorder
              getCellClassName={params => (params.field === 'key' ? 'font-ea-sb text-primary' : 'text-black')}
              getRowHeight={getRowHeight}
              getRowClassName={getRowClassName}
              className='eventGrid'
            />
          </div>
        </Collapse>
        {/* {isExpanded && (<>
          <div className='p-0 pt-0 mb-2'>
            <DataGrid
              showCellVerticalBorder
              rows={rows}
              columns={columns}
              hideFooter={true}
              disableColumnSorting
              disableColumnMenu
              columnHeaderHeight={32}
              disableColumnResize
              hideFooterPagination={true}
              showColumnVerticalBorder
              getCellClassName={(params) => (params.field === 'key' ? 'font-ea-sb text-primary' : 'text-black')}
              getRowHeight={getRowHeight}
              getRowClassName={getRowClassName}
              className='eventGrid'
            />
          </div>
        </>)} */}
      </div>
    </>
  )
}

export default KundaliEventCard
