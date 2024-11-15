// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import House from '@/components/preview/House/House'
import SummaryAspect from '@/components/preview/PlanetSummary/PlanetSummary'
import InfoTable from '@/components/preview/InfoTable/InfoTable'

// Style Imports
import "./preview.css"
import NakshtraSummary from '@/components/preview/NakshtraSummary/NakshtraSummary';
import RahuKetu from '@/components/preview/RahuKetu/RahuKetu';
import DashaDetails from '@/components/preview/DashaDetails/DashaDetails';
import LoardPlanet from '@/components/preview/LoardPlanet/LoardPlanet'
import { Button, Divider, FormControl, IconButton, InputLabel, Menu, MenuItem, Select } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Event from '@/components/preview/Event/Event'
import PrakritiPopUp from '@/components/preview/InfoTable/PrakritiPopUp'
import KundliOption from '@/components/preview/KundliOption/KundliOption'
import { DashaClickEvent, KundliOptionsData, TransitClickEvent } from '@/app/Server/API/kundliAPI'
import JaiminiCharKarakasPopUp from '@/components/preview/JaiminiCharKarakas/JaiminiCharKarakas'
import NavTaraChakra from '@/components/preview/NavTaraChakra/NavTaraChakra'

const PreviewCard = ({ kundliData, isPrintDiv, handleDownload, handleTimeTool, TransitData, setTransitData, getTransitData }) => {
  // var
  const BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  const AstroDetails = kundliData?.AstroVastuReport?.AstroDetails;
  const ChartSVG = kundliData?.AstroVastuReport?.ChartSVG;
  // const MahaDasha = kundliData?.AstroVastuReport?.DashaDetails?.MahaDasha;
  // const AntarDasha = kundliData?.AstroVastuReport?.DashaDetails?.AntarDasha;
  // const PratyantarDasha = kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha;
  // const LifeAntarDasha = kundliData?.AstroVastuReport?.DashaDetails?.LifeAntarDasha;
  const AstroVastuHouseScript = kundliData?.AstroVastuReport?.AstroVastuHouseScript;
  const Symbols = kundliData?.AstroVastuReport?.Symbols;
  const PlanetSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryPlanet;
  const HouseSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryHouse;
  const PlaneNSummaryData = kundliData?.AstroVastuReport?.PlanetScript;
  const HouseNSummaryData = kundliData?.AstroVastuReport?.HouseScript;
  const RahuData = kundliData?.AstroVastuReport?.RahuSpecial;
  const KetuData = kundliData?.AstroVastuReport?.KetuSpecial;
  const DashaDetailData = kundliData?.AstroVastuReport?.DashaDetails;
  const JaiminiCharKarakas = kundliData?.AstroVastuReport?.JaiminiCharKarakas;
  const NavTaraChakraData = kundliData?.AstroVastuReport?.NavTaraChakra;

  const [anchorEl, setAnchorEl] = useState(null);
  const [chartValue, setChartValue] = useState("D");
  const [eventValue, setEventValue] = useState(null);
  const [kundliOptValue, setKundliOptValue] = useState("V");
  const [isPrakritiVisible, setIsPrakritiVisible] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openKundli, setOpenKundli] = useState(false);
  const [openJCK, setJCK] = useState(false);
  const [openNTC, setNTC] = useState(false);
  const [allKundliOpt, setAllKundliOpt] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [DashaValue, setDashaValue] = useState("PratyantarDasha");
  const [DashaTitle, setDashaTitle] = useState(`${DashaDetailData?.CurrentMD} > ${DashaDetailData?.CurrentAD} > PratyantarDashas`);
  const [CurrentDasha, setCurrentDasha] = useState(`${DashaDetailData?.CurrentMD} > ${DashaDetailData?.CurrentAD} > ${DashaDetailData?.CurrentPD}`);
  const [DashaGridData, setDashaGridData] = useState(kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha);
  const [DashaDate, setDashaDate] = useState(DashaDetailData.MahaDasha.filter((e) => e.IsCurrent == true)[0].StartDt);
  // const [TransitData, setTransitData] = useState(ChartSVG?.HouseChart);
  const open = Boolean(anchorEl);
  const divRef = useRef(null);

  useEffect(() => {
    setTransitData(ChartSVG?.HouseChart);
  }, [])

  const handleIsPraOpen = () => {
    handleClose();
    setIsPrakritiVisible(true)
  }
  const handleIsPraClose = () => {
    setIsPrakritiVisible(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuDownload = () => {
    handleClose();
    handleDownload();
  }
  const handleMenuTimeTool = () => {
    handleClose();
    handleTimeTool();
  }

  const handleOpenClose = () => {
    setOpenEvent(false);
  }

  const handleOpen = () => {
    setOpenEvent(true);
  }

  const handleKundliOpt = () => {
    setOpenKundli(true);
  }

  const handleOpenKundliClose = () => {
    setOpenKundli(false);
  }
  const handleJCK = () => {
    handleClose();
    setJCK(!openJCK);
  }
  const handleNTC = () => {
    handleClose();
    setNTC(!openNTC);
  }

  const getKundliOpions = async () => {
    const response = await KundliOptionsData();
    if (response.hasError) {
      setLoading(false);
      return toastDisplayer("error", response.error);
    } else {
      const data = response?.responseData?.Result?.Options;
      setAllKundliOpt(data);
      setKundliOptValue(data?.filter(e => e.Option == "V")[0])
      setLoading(false);
    }
  }

  useEffect(() => {
    getKundliOpions();
  }, []);

  useEffect(() => {
    if (kundliOptValue.Option == "T") {
      getTransitData("", "");
    }
    else
      setTransitData(ChartSVG?.HouseChart)
  }, [kundliOptValue])

  const handleDashaChange = async () => {
    // const DashaDate = DashaDetailData.MahaDasha.filter((e) => e.IsCurrent == true)[0].StartDt;
    const titleArr = DashaTitle.split(" > ");
    if (DashaValue == "PranDasha") {
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}-${titleArr[2]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > ${titleArr[2]} > SookshmaDasha`);
        setDashaValue("SookshmaDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "SookshmaDasha") {
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > PratyantarDasha`);
        setDashaValue("PratyantarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "PratyantarDasha") {
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]} > AntarDashas`);
        setDashaValue("AntarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "AntarDasha") {
      setDashaTitle(`MahaDashas`);
      setDashaValue("MahaDasha");
      setDashaGridData(DashaDetailData?.MahaDasha)
    }
  }

  const handleDashaDoubleClick = async (row) => {
    // const DashaDate = DashaDetailData.MahaDasha.filter((e) => e.IsCurrent == true)[0].StartDt;
    const titleArr = DashaTitle.split(" > ");
    if (DashaValue == "MahaDasha") {
      setDashaDate(row?.StartDt)
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": row?.StartDt,
        "Planet": row?.Planet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${row?.Planet} > AntarDasha`);
        setDashaValue("AntarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "AntarDasha") {
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${row?.Planet}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${titleArr[0]} > ${row?.Planet} > PratyantarDasha`);
        setDashaValue("PratyantarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "PratyantarDasha") {
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}-${row?.Planet}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > ${row?.Planet} > SookshmaDasha`);
        setDashaValue("SookshmaDasha");
        setDashaGridData(response?.responseData)
      }
    } else if (DashaValue == "SookshmaDasha") {
      const payload = {
        "BirthDate": BirthDetails?.Date,
        "BirthTime": BirthDetails?.Time,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}-${titleArr[2]}-${row?.Planet}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > ${titleArr[2]} > ${row?.Planet} > PranDasha`);
        setDashaValue("PranDasha");
        setDashaGridData(response?.responseData)
      }
    }
  }

  return (
    <>
      <Grid className='previewCard' item xs={12} md={12}>
        <Grid item xs={12} className='pdf-Div'>
          <div className={`chart-name rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row ${!isPrintDiv ? 'sm:flex-row flex-col' : "items-center"}`}>
            {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundli'}
            <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row ${!isPrintDiv ? 'sm:flex-row sm:gap-1 flex-col' : "gap-5"} birthDateTime-Div`} >
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label'>Birth Date & Time: </span>
                <span className='value font-medium'>{BirthDetails?.Date} {BirthDetails?.Time.substring(0, 2)}:{BirthDetails?.Time.substring(2, 4)}:{(BirthDetails?.Time.substring(4, 6) ? BirthDetails?.Time.substring(4, 6) : '00')}
                </span>
              </div>
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label'>Place: </span>
                <span className='value font-medium'>{BirthDetails?.FormattedCity}</span>
              </div>
              <div className='flex justify-end'>
                <>
                  <IconButton onClick={handleClick}>
                    <i className={'tabler-dots-vertical bg-white'} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem className="flex gap-1"><i className={'tabler-browser-check me-2'} />Events</MenuItem>
                    <MenuItem onClick={handleJCK} className="flex gap-1"><i className={'tabler-aspect-ratio me-2'} />Jaimini Char Karakas</MenuItem>
                    <MenuItem onClick={handleNTC} className="flex gap-1"><i className={'tabler-aspect-ratio me-2'} />NavTara Chakra</MenuItem>
                    <MenuItem onClick={handleIsPraOpen} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Prakriti</MenuItem>
                    {/* <MenuItem className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Save</MenuItem> */}
                    <MenuItem onClick={handleMenuTimeTool} className="flex gap-1"><i className={'tabler-calendar-share me-2'} />TimeTool</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleMenuDownload} className="flex gap-1"><i className={'tabler-download me-2'} />Download</MenuItem>
                  </Menu>
                </>
              </div>
            </div>
          </div>
          <div className={`${!isPrintDiv ? 'xs:flex-col sm:flex-row' : ""} birth-info-table`}>
            <div className='flex flex-row block-detail'>

              <InfoTable InfoTableTextArr={[
                { "label": "Rashi / Alphabet ", "value": `${AstroDetails?.Rashi} / A` },
                { "label": "Nakshatra / Pada ", "value": `${AstroDetails?.Nakshatra?.Nakshatra} / ${AstroDetails?.Nakshatra.Pada} (${AstroDetails?.Nakshatra?.PlanetName})` },
                { "label": "Gana / TriGuna ", "value": `${AstroDetails?.Nakshatra?.Gana == 'R' ? 'Rakshasa' : 'Manushya'} / ${AstroDetails?.Nakshatra?.TriGuna}` },
                { "label": "Yoga / Karana ", "value": `${AstroDetails?.JanmaYoga} / ${AstroDetails?.JanmaKarana}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Vikram Samvant ", "value": AstroDetails?.VikramSamvat },
                { "label": "Birth Tithi (Sun Rise) ", "value": `${AstroDetails?.JanmaTithi} (${AstroDetails?.SunRiseTime})` },
                { "label": "Astro / Western Day ", "value": `${AstroDetails?.AstroWeekday} / ${AstroDetails?.WesternWeekday}` },
                { "label": "Location ", "value": `${BirthDetails?.FormattedCity}, ${BirthDetails?.Country}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Lat, Lng ", "value": `${BirthDetails?.Lat} , ${BirthDetails?.Lng}` },
                { "label": "Lucky / Destiny # ", "value": `${AstroDetails?.Numerology?.BirthNumber} / ${AstroDetails?.Numerology?.DestinyNumber} (${AstroDetails?.Numerology?.DestinyYearNumber})` },
                { "label": "Destiny Year ", "value": ` ${AstroDetails?.Numerology?.DestinyYear - 1} - ${AstroDetails?.Numerology?.DestinyYear}` },
                { "label": "Prakriti", "value": `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
          </div>
          {/* <div className={`flex flex-wrap lg:flex-nowrap gap-5 px-4 pt-4 ${!isPrintDiv ? 'sm:flex-row sm:justify-start flex-col md:justify-start sm:overflow-auto' : ""}`}>
            <div className='lg:w-1/4 md:w-1/4 sm:w-[calc(50%-10px)] md:flex-grow flex flex-col birth-chart pt-5 w-[100%]'>
              <div className='chart-title'>❋ Birth Chart / Lagna Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} alt="birthChart" />
            </div>
            <div className='lg:w-1/4 md:w-1/4 sm:w-[calc(50%-10px)] md:flex-grow flex flex-col birth-chart pt-5 w-[100%]'>
              <div className='chart-title'>❋ House Chart / Bhav Chalit Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
            </div>
            <div className='lg:w-1/4 md:w-1/4 sm:w-[calc(50%-10px)] md:flex-grow flex flex-col birth-chart pt-3 w-[100%]'>
              <div className='flex justify-center pb-1'>
                {DashaValue != "MahaDasha" && kundliOptValue && kundliOptValue.Option == "V" &&
                  <>
                    <IconButton className='' onClick={handleDashaChange}>
                      <i className='tabler-arrow-big-left text-primary'></i>
                    </IconButton>
                  </>}
                <Button variant='text' className='' onClick={handleKundliOpt}>
                  <span className='text-xl'>
                    ❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaTitle : kundliOptValue.OptionName} ❋
                  </span>
                </Button>
              </div>
              {kundliOptValue && kundliOptValue.Option == "V" ?
                <>
                  <DashaDetails title={DashaTitle} DashaData={DashaGridData} handleDashadbClick={handleDashaDoubleClick} />
                </>
                :
                <>
                {TransitData &&
                  <img src={`data:image/svg+xml;base64,${TransitData}`} alt="birthChart" />
                }
                </>
              }
              {openKundli &&
                <KundliOption KundliData={allKundliOpt} setKundliValue={setKundliOptValue} open={openKundli} handleClose={handleOpenKundliClose} />
              }
            </div>
          </div> */}

          {/* <div className={`flex px-4 pt-4 gap-5 overflow-auto md:flex-wrap lg:flex-nowrap`}>
            <div className='flex-col  justify-center pt-5 flex '>
              <div className='chart-title '>❋ Birth Chart / Lagna Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} alt="birthChart" style={{ height: "311px" }} />
              <div className='chart-title'>
                {CurrentDasha}
              </div>
            </div>

            <div className='flex-col  justify-center pt-5 flex'>
              <div className='chart-title'>❋ House Chart / Bhav Chalit Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" style={{ height: "311px" }} />
            </div>

            <div className='flex-col  justify-center pt-3 flex'>
              <div className='flex justify-center '>
                {DashaValue != "MahaDasha" && kundliOptValue && kundliOptValue.Option == "V" && (
                  <IconButton onClick={handleDashaChange}>
                    <i className='tabler-arrow-big-left text-primary'></i>
                  </IconButton>
                )}
                <Button variant='text' onClick={handleKundliOpt}>
                  <span className='text-xl'>
                    ❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaValue : kundliOptValue.OptionName} ❋
                  </span>
                </Button>
              </div>

              {kundliOptValue && kundliOptValue.Option == "V" ? (
                <div className=''>
                  <DashaDetails title={DashaTitle} DashaData={DashaGridData} handleDashadbClick={handleDashaDoubleClick} />
                </div>
              ) : (
                TransitData && <img src={`data:image/svg+xml;base64,${TransitData?.TransitChart}`} alt="transitChart" className='' style={{ height: "311px" }} />
              )}


            </div>
          </div> */}

          <div className={`flex px-1 pt-4 gap-5 overflow-auto md:flex-wrap lg:flex-nowrap`}>
            {openKundli && (
              <KundliOption
                KundliData={allKundliOpt}
                setKundliValue={setKundliOptValue}
                open={openKundli}
                handleClose={handleOpenKundliClose}
              />
            )}
            <table>
              <tr>
                <td>
                  <div className='chart-title '>❋ Birth Chart / Lagna Kundali ❋</div>
                </td>
                <td>
                  <div className='chart-title'>❋ House Chart / Bhav Chalit Kundali ❋</div>
                </td>
                <td>
                  <div className='chart-title flex justify-center'>
                    <div className='flex'>
                      {DashaValue != "MahaDasha" && kundliOptValue && kundliOptValue.Option == "V" && (
                        <IconButton onClick={handleDashaChange}>
                          <i className='tabler-arrow-big-left text-primary'></i>
                        </IconButton>
                      )}
                      <div className='cursor-pointer flex items-center' onClick={handleKundliOpt}>
                        ❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaValue : kundliOptValue.OptionName} ❋
                      </div>
                    </div>
                    {/* {DashaValue != "MahaDasha" && kundliOptValue && kundliOptValue.Option == "V" && (
                      <IconButton onClick={handleDashaChange}>
                        <i className='tabler-arrow-big-left text-primary'></i>
                      </IconButton>
                    )} */}
                    {/* <div className='chart-title cursor-pointer' onClick={handleKundliOpt}>❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaValue : kundliOptValue.OptionName} ❋</div> */}
                    {/* <Button variant='tex' onClick={handleKundliOpt}>
                      <span className='text-xl'>
                        ❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaValue : kundliOptValue.OptionName} ❋
                      </span>
                    </Button> */}
                  </div>
                </td>
              </tr>
              <tr className=''>
                <td className='w-1/3'>
                  <div className='flex justify-center items-center px-2' ref={divRef}>
                    <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} className='flex-auto' alt="birthChart" />
                  </div>
                </td>
                <td className='w-1/3 myDiv'>
                  <div className='flex justify-center items-center px-2'>
                    <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} className='flex-auto' alt="birthChart" />
                  </div>
                </td>
                <td className='w-1/3'>
                  {kundliOptValue && kundliOptValue.Option == "V" ? (
                    <div className='flex justify-center items-center px-2 flex-auto w-[calc(100vw - 80vw)] '>
                      <div className='lg:w-[calc(100vw-72vw)] md:w-[40vw] sm:w-[40vw] w-[75vw] '>
                        <DashaDetails title={DashaTitle} DashaData={DashaGridData} handleDashadbClick={handleDashaDoubleClick} divref={divRef} />
                      </div>
                    </div>
                  ) : (
                    TransitData &&
                    <div className='flex justify-center items-center px-2'>
                      <img src={`data:image/svg+xml;base64,${TransitData?.TransitChart}`} alt="transitChart" className='flex-auto' />
                    </div>
                  )}

                </td>
              </tr>
              <tr>
                <td>
                  <div className='chart-title'>
                    {CurrentDasha}
                  </div>
                </td>
                <td></td>
                <td>
                  {TransitData && TransitData?.MahaDasha &&
                    <div className='chart-title'>
                      {TransitData?.MahaDasha} &gt; {TransitData?.AntarDasha} &gt; {TransitData?.PratyantarDasha}
                    </div>
                  }
                </td>
              </tr>
            </table>
          </div>


          <div className='main-MahaDasha-Div pt-5'>
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-4'>
                <span>
                  ❋ Nakshatra Astrology ↠ Planet Script ❋
                </span>
              </div>
              <div className='mb-1 w-[30%] flex justify-end pt-4'>
                <Button variant='text' className='' onClick={handleOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {eventValue ? `${eventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
              {openEvent &&
                <Event setEventValue={setEventValue} open={openEvent} handleClose={handleOpenClose} />
              }
            </div>
            <div className='planet-table'>

              <NakshtraSummary SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} SelectedEventVal={eventValue} />

            </div>
            <div className='Nakshatra-Legend mt-2 px-2'>
              <p class="arrow-info flex flex-col lg:flex-row md:flex-row sm:flex-row">
                <div>Legend:</div>
                <div>🡑 Exalted</div>
                <div>🡓 Debilitated</div>
                <div>☀ Combust</div>
                <div>⮂ Exchange Sign or Nakshatra</div>
                <div>★ Untenanted</div>
                <div>✪ SelfStar</div>
                <div>⮌ Retro</div></p>
            </div>
          </div>
          <div className='main-MahaDasha-Div pt-4'>
            {/* <div className='chart-title'>❋ Nakshatra Astrology ↠ House Script ❋</div> */}
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-5'>
                <span>
                  ❋ Nakshatra Astrology ↠ House Script ❋
                </span>
              </div>
              <div className='mb-1 w-[30%] flex justify-end pt-4'>
                <Button variant='text' className='' onClick={handleOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {eventValue ? `${eventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} SelectedEventVal={eventValue} />
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-4'>
            {/* <div className='chart-title'>❋ Planet Script with Nakshatra Lord & Sub Lord ❋</div> */}
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[25%]'></div>
              <div className='chart-title w-[50%] pt-5'>
                <span>
                  ❋ Planet Script with Nakshatra Lord & Sub Lord ❋
                </span>
              </div>
              <div className='mb-1 w-[25%] flex justify-end pt-4'>
                <Button variant='text' className='' onClick={handleOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {eventValue ? `${eventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            <div
              className="Loard-Div sm:grid md:grid-rows-3 md:grid-cols-3 sm:grid-rows-5 sm:grid-cols-2 xs:flex xs:flex-col grid-flow-col gap-8 auto-rows-auto"
            >
              {PlaneNSummaryData.length
                ? PlaneNSummaryData.slice(0, 9).map((element, index) => ( // only display first 9 elements
                  <div key={index} className=''>
                    <LoardPlanet LoardData={element} SelectedEventVal={eventValue} />
                  </div>
                ))
                : null
              }
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-8'>
            <div className='chart-title'>❋ Rahu & Ketu Special Significators ❋</div>
            <div className='RahuKetu-Div flex gap-4 flex-col sm:flex-row'>
              <RahuKetu RahuData={RahuData} KetuData={KetuData} Significators={"R"} />
            </div>
          </div>

          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Planet ↠ Planet Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={PlanetSummaryData} Aspect={"P"} />
            </div>
          </div>
          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Planet ↠ House Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={HouseSummaryData} Aspect={"H"} />
            </div>
          </div>

          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Astro Vastu Insights ❋</div>
            <div className='AstroVastuScript-Div'>
              <House houseArr={AstroVastuHouseScript} Symbols={Symbols}></House>
            </div>
          </div>
        </Grid>
      </Grid>
      {isPrakritiVisible && <PrakritiPopUp open={isPrakritiVisible} handlePraClose={handleIsPraClose} />}
      {openJCK && <JaiminiCharKarakasPopUp open={openJCK} handleClose={handleJCK} JaiminiCharKarakasData={JaiminiCharKarakas} />}
      {openNTC && <NavTaraChakra open={openNTC} handleClose={handleNTC} NavTaraChakraData={NavTaraChakraData} />}
    </>
  )
}

export default PreviewCard
