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
import { Button, Chip, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Event from '@/components/preview/Event/Event'
import PrakritiPopUp from '@/components/preview/InfoTable/PrakritiPopUp'
import KundliOption from '@/components/preview/KundliOption/KundliOption'
import { DashaClickEvent, KundliOptionsData, RotateChartEvent, UpdateKundli } from '@/app/Server/API/kundliAPI'
import JaiminiCharKarakasPopUp from '@/components/preview/JaiminiCharKarakas/JaiminiCharKarakas'
import NavTaraChakra from '@/components/preview/NavTaraChakra/NavTaraChakra'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import Rotation from '@/components/preview/Rotation/Rotation'
import EALoader from '@/components/common/EA-Loader/EALoader'
import LifeEvent from '@/components/preview/LifeEvent/LifeEvent'
import Loader from '@/components/common/Loader/Loader'
import ConfirmationPopup from '@/components/common/ConfirmationPopup/ConfirmationPopup'
import { toast } from 'react-toastify'

const PreviewCard = ({ kundliData, isPrintDiv, handleDownload, handleTimeTool, TransitData, setTransitData, getTransitData, getDivisionalChartData, DivisionalData, setDivisionalData, birthDate, setKundliData, SetKundliConstData }) => {
  // var
  const BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  const AstroDetails = kundliData?.AstroVastuReport?.AstroDetails;
  const ChartSVG = kundliData?.AstroVastuReport?.ChartSVG;
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
  const [LifeEventValue, setLifeEventValue] = useState(null);
  const [EventValue, setEventValue] = useState(null);
  const [kundliOptValue, setKundliOptValue] = useState("V");
  const [isPrakritiVisible, setIsPrakritiVisible] = useState(false);
  const [openLifeEvent, setOpenLifeEvent] = useState(false);
  const [openKundli, setOpenKundli] = useState(false);
  const [openJCK, setJCK] = useState(false);
  const [openNTC, setNTC] = useState(false);
  const [openRotation, setRotation] = useState(false);
  const [rotationType, setRotationType] = useState(null);
  const [allKundliOpt, setAllKundliOpt] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [DashaValue, setDashaValue] = useState("Vimshottari Dasha");
  const [DashaTitle, setDashaTitle] = useState(`${DashaDetailData?.CurrentMD}`);
  const [DashaGridData, setDashaGridData] = useState(kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha);
  const [DashaDate, setDashaDate] = useState(DashaDetailData?.MahaDasha.filter((e) => e.IsCurrent == true)[0].StartDt);
  const [rotationTital, setRotationTitle] = useState("");
  const [SaveKundali, setSaveKundali] = useState(false);

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

  const handleLifeEventClose = () => {
    setOpenLifeEvent(false);
  }

  const handleLifeEventOpen = () => {
    handleClose();
    setOpenLifeEvent(true);
  }

  const handleEventOpen = () => {
    handleClose();
    window.open(`../kevent/${BirthDetails.KundaliID}`, '_blank');

    // setOpenEvent(true);
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
      // return toastDisplayer("error", response.error);
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
      getDivisionalChartData(kundliOptValue.Option)
  }, [kundliOptValue])

  const handleDashaChange = async () => {
    const titleArr = DashaTitle.split("-");
    if (DashaValue == "PranDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}-${titleArr[2]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]}-${titleArr[1]}`);
        setDashaValue("SookshmaDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "SookshmaDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": `${titleArr[0]}-${titleArr[1]}`
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]} > ${titleArr[1]} > PratyantarDasha`);
        setDashaValue("Vimshottari Dasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Vimshottari Dasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": DashaDetailData?.CurrentMD
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        setDashaTitle(`${titleArr[0]}`);
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
    if (DashaValue == "MahaDasha") {
      setDashaDate(row?.StartDt)
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": row?.StartDt,
        "Planet": row?.DashaPlanet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        setDashaTitle(`${row?.Planet} > AntarDasha`);
        setDashaValue("AntarDasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "AntarDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": row?.DashaPlanet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        // setDashaTitle(`${titleArr[0]} > ${row?.Planet} > PratyantarDasha`);
        setDashaTitle(`${row?.Planet}`);
        setDashaValue("Vimshottari Dasha");
        setDashaGridData(response?.responseData)
      }
    }
    else if (DashaValue == "Vimshottari Dasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": row?.DashaPlanet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${row?.Planet}`);
        setDashaValue("SookshmaDasha");
        setDashaGridData(response?.responseData)
      }
    } else if (DashaValue == "SookshmaDasha") {
      const payload = {
        "BirthDate": BirthDetails?.BirthDate,
        "BirthTime": BirthDetails?.BirthTime,
        "DashaStartDate": DashaDate,
        "Planet": row?.Planet
      }
      const response = await DashaClickEvent(payload);
      if (!response.hasError) {
        const data = response?.responseData;
        const ADDasha = data.filter((e) => e.IsCurrent == true)[0]
        setDashaTitle(`${row?.Planet}`);
        setDashaValue("PranDasha");
        setDashaGridData(response?.responseData)
      }
    }
  }

  const handleSaveKundaliBtn = () => {
    handleSaveKundaliOpen();
  }

  const saveKundaliDateTime = async () => {
    try {
      let formattedData = {
        // KundaliID: BirthDetails.KundaliID,
        FirstName: BirthDetails.FirstName,
        LastName: BirthDetails.LastName,
        MiddleName: BirthDetails.MiddleName,
        Gender: BirthDetails.Gender,
        Country: BirthDetails.Country,
        CityID: BirthDetails.CityID,
        Prakriti: BirthDetails.prakriti || '',
        City: BirthDetails.City,
        BirthDate: BirthDetails.BirthDate,
        BirthTime: BirthDetails.BirthTime,
        TransitTime: "",
        TransitDate: "",
        ClientID: "",
        DChart: "",
      }
      if (TransitData?.TransitDateTime) {
        formattedData.TransitDate = TransitData?.TransitDateTime.split(" ")[0];
        formattedData.TransitTime = TransitData?.TransitDateTime.split(" ")[1].replace(/:/g, "");
      }
      const response = await UpdateKundli(formattedData);
      if (response.hasError) {
        if (response.errorMessage) {
          Object.keys(response.errorMessage).forEach((key) => {
            response.errorMessage[key].forEach((message) => {
              toast.error(`${key}: ${message}`);
            });
          });
        }
        return toast.error(response.errorMessage);
        // return toastDisplayer("error", response.error)
      }
      SetKundliConstData(kundliData);
      setKundliData(kundliData);
      toast.success('Kundali updated successfully.');
      handleClose();
    } catch (error) {
      // setIsDisable(false)
    }
  }

  const handleRoatationOpen = (value) => {
    setRotation(true);
    setRotationType(value);
  }

  const handleRoatationClose = () => {
    setRotation(false);
  }

  const hanldeRotationChange = async (payload) => {
    setLoading(true);
    handleRoatationClose();
    const formattedData = {
      KundaliID: BirthDetails.KundaliID,
      FirstName: BirthDetails.FirstName,
      LastName: BirthDetails.LastName,
      MiddleName: BirthDetails.MiddleName,
      Gender: BirthDetails.Gender,
      Country: BirthDetails.Country,
      CityID: BirthDetails.CityID,
      Prakriti: BirthDetails.prakriti || '',
      City: BirthDetails.City,
      TransitTime: "",
      TransitDate: "",
      ClientID: "",
      DChart: "",
      BirthDate: BirthDetails.BirthDate,
      BirthTime: BirthDetails.BirthTime,
      IsRotate: payload.IsRotate,
      RotateType: payload.RotateType,
      RotateFrom: payload.RotateFrom
    }
    try {
      const resp = await RotateChartEvent(formattedData);
      setLoading(false);
      if (resp?.responseData?.Result) {
        setKundliData(resp?.responseData?.Result);
        if (rotationType == "B") {
          setRotationTitle(`The chart is rotated to Birth Chart > ${payload.formattedStr}`)
        } else if (rotationType == "H") {
          setRotationTitle(`The chart is rotated to House Chart > ${payload.formattedStr}`)
        }
      }
    } catch (error) {
      setLoading(false);

    }
  }

  const handleSaveKundaliOpen = () => {
    setSaveKundali(true);
    handleClose();
  }
  const handleSaveKundaliClose = () => {
    setSaveKundali(false);
  }

  return (
    <>
      {/* {Loading && <Loader />} */}
      <Grid className='previewCard' item xs={12} md={12}>
        <Grid item xs={12} className='pdf-Div'>
          <div className={`chart-name sticky top-0 z-50 font-ea-sb rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row ${!isPrintDiv ? 'sm:flex-row flex-col' : "items-center"}`}>
            {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundali'}
            <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row ${!isPrintDiv ? 'sm:flex-row sm:gap-1 flex-col' : "gap-5"} birthDateTime-Div`} >
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label font-ea-n'>Birth Date & Time: </span>
                <span className='value font-ea-sb'>{BirthDetails?.BirthDate} {BirthDetails?.BirthTime.substring(0, 2)}:{BirthDetails?.BirthTime.substring(2, 4)}:{(BirthDetails?.BirthTime.substring(4, 6) ? BirthDetails?.BirthTime.substring(4, 6) : '00')}
                </span>
              </div>
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label font-ea-n'>Place: </span>
                <span className='value font-ea-sb'>{BirthDetails?.City}, {BirthDetails?.Country}</span>
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
                    <MenuItem onClick={handleEventOpen} className="flex gap-1"><i className={'tabler-browser-check me-2'} />Event Analysis</MenuItem>
                    <MenuItem onClick={handleJCK} className="flex gap-1"><i className={'tabler-aspect-ratio me-2'} />Jaimini Char Karakas</MenuItem>
                    <MenuItem onClick={handleNTC} className="flex gap-1"><i className={'tabler-jewish-star me-2'} />NavTara Chakra</MenuItem>
                    <MenuItem onClick={handleIsPraOpen} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Prakriti</MenuItem>
                    {/* <MenuItem className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Save</MenuItem> */}
                    <MenuItem onClick={handleMenuTimeTool} className="flex gap-1"><i className={'tabler-calendar-share me-2'} />TimeTool</MenuItem>
                    <MenuItem className="flex gap-1"><i className={'tabler-calendar-share me-2'} />Transit Analysis</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSaveKundaliBtn} className="flex gap-1"><i className={'tabler-copy-plus me-2'} />Save Kundali</MenuItem>
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
                { "label": "Birth Tithi / Sun Rise ", "value": `${AstroDetails?.JanmaTithi} / ${AstroDetails?.SunRiseTime}` },
                { "label": "Astro / Western Day ", "value": `${AstroDetails?.AstroWeekday} / ${AstroDetails?.WesternWeekday}` },
                // { "label": "Location ", "value": `${BirthDetails?.City}, ${BirthDetails?.Country}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Lucky / Destiny # ", "value": `${AstroDetails?.Numerology?.BirthNumber} / ${AstroDetails?.Numerology?.DestinyNumber} (${AstroDetails?.Numerology?.DestinyYearNumber})` },
                { "label": "Destiny Year ", "value": ` ${AstroDetails?.Numerology?.DestinyYear - 1} - ${AstroDetails?.Numerology?.DestinyYear}` },
                { "label": "Lat, Lng ", "value": `${BirthDetails?.Latitude}, ${BirthDetails?.Longitude}` },
                { "label": "Timezone ", "value": ` ${BirthDetails?.Timezone}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Reference", "value": `${BirthDetails?.Reference || ""}` },
                { "label": "Remark", "value": `${BirthDetails?.Remark || ""}` },
                { "label": "Group ", "value": ` ${BirthDetails?.Group || ""}` },
                { "label": "Prakriti", "value": `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}` },
              ]} isPrintDiv={isPrintDiv} />
            </div>
          </div>

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
                  <div className='chart-title '>
                    <Button onClick={() => handleRoatationOpen("B")}>
                      <span className='font-ea-sb text-xl'>
                        ❋ Birth Chart / Lagna Kundali ❋
                      </span>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className='chart-title'>
                    <Button onClick={() => handleRoatationOpen("H")}>
                      <span className='font-ea-sb text-xl'>
                        ❋ House Chart / Bhav Chalit Kundali ❋
                      </span>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className='chart-title flex'>
                    <div className='flex px-2 w-full'>
                      <div className='flex items-center w-1/12'>
                        {DashaValue != "MahaDasha" && kundliOptValue && kundliOptValue.Option == "V" && (
                          <IconButton onClick={handleDashaChange} className='h-[38px] text-primary'>
                            🠜
                            {/* <i className='tabler-arrow-big-left text-primary'></i> */}
                          </IconButton>
                        )}
                      </div>
                      <div className='flex items-center w-10/12 justify-center'>
                        <Button className='cursor-pointer flex items-center' onClick={handleKundliOpt}>
                          <span className='font-ea-sb text-xl'>
                            ❋ {kundliOptValue && kundliOptValue.Option == "V" ? DashaValue : kundliOptValue.OptionName} ❋
                          </span>
                        </Button>
                      </div>
                      <div className='flex items-center w-1/12'>
                      </div>
                    </div>
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
                      <div className='lg:w-[calc(100vw-71vw)] md:w-[40vw] sm:w-[40vw] w-[75vw] '>
                        <DashaDetails title={DashaTitle} DashaData={DashaGridData} handleDashadbClick={handleDashaDoubleClick} divref={divRef} />
                      </div>
                    </div>
                  ) : (
                    TransitData &&
                    <>
                      {kundliOptValue.Option == "T" ? <>
                        <div className='flex justify-center items-center px-2'>
                          {TransitData?.TransitChart ?
                            <img src={`data:image/svg+xml;base64,${TransitData?.TransitChart}`} alt="transitChart" className='flex-auto' />
                            :
                            // <Skeleton variant="rectangular" width={210} height={60} />
                            <EALoader />

                          }
                        </div>
                      </> :
                        <>
                          <div className='flex justify-center items-center px-2'>
                            {DivisionalData?.DChart ?
                              <img src={`data:image/svg+xml;base64,${DivisionalData?.DChart}`} alt="transitChart" className='flex-auto' />
                              :
                              // <Skeleton variant="rectangular" width={210} height={60} />
                              <EALoader />
                            }
                          </div>
                        </>}
                    </>
                  )}

                </td>
              </tr>
              <tr>
                <td className='mx-2 px-2'>
                  <div className='pt-2'>
                    {rotationTital && <Chip label={rotationTital} className='text-sm' color='primary' variant='tonal' />}
                  </div>
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
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
              {openLifeEvent &&
                <LifeEvent setLifeEventValue={setLifeEventValue} open={openLifeEvent} handleClose={handleLifeEventClose} />
              }
            </div>
            <div className='planet-table'>

              <NakshtraSummary SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} SelectedEventVal={LifeEventValue} />

            </div>
            <div className='Nakshatra-Legend mt-2 px-2'>
              <p class="arrow-info flex flex-col lg:flex-row md:flex-row sm:flex-row">
                <div>Legend:</div>
                <div>🡑 Exalted</div>
                <div>🡓 Debilitated</div>
                <div>☀ Combust</div>
                <div>⮂ Exchange Sign</div>
                <div>⮁ Exchange Nakshatra</div>
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
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} SelectedEventVal={LifeEventValue} />
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
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            <div
              className="Loard-Div sm:grid md:grid-rows-3 md:grid-cols-3 sm:grid-rows-5 sm:grid-cols-2 xs:flex xs:flex-col grid-flow-col gap-4 auto-rows-auto"
            >
              {PlaneNSummaryData.length
                ? PlaneNSummaryData.slice(0, 9).map((element, index) => ( // only display first 9 elements
                  <div key={index} className=''>
                    <LoardPlanet LoardData={element} SelectedEventVal={LifeEventValue} symbols={Symbols} />
                  </div>
                ))
                : null
              }
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-8'>
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-5'>
                <span>
                  ❋ Rahu & Ketu Special Significators ❋
                </span>
              </div>
              <div className='mb-1 w-[30%] flex justify-end pt-4'>
                <Button variant='text' className='' onClick={handleLifeEventOpen}>
                  <span className='text-[var(--green-color)]'>Life Event</span>
                  <span className='arrow text-black'>🡒</span>
                  <span>
                    {LifeEventValue ? `${LifeEventValue.EventName}` : "NA"}
                  </span>
                </Button>
              </div>
            </div>
            {/* <div className='chart-title'>❋ Rahu & Ketu Special Significators ❋</div> */}
            <div className='RahuKetu-Div flex gap-4 flex-col sm:flex-row'>
              <RahuKetu RahuData={RahuData} KetuData={KetuData} Significators={"R"} SelectedEventVal={LifeEventValue} />
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
      {openRotation && <Rotation open={openRotation} handleClose={handleRoatationClose} rotationType={rotationType} hanldeRotationChange={hanldeRotationChange} />}
      {SaveKundali && (
        <ConfirmationPopup open={SaveKundali} isDelete={true} handleClose={handleSaveKundaliClose} userData={kundliData?.AstroVastuReport?.BirthDetails} handleClick={saveKundaliDateTime} subTitle={"Are you sure want to update this kundali?"} title={"Update Kundali"} />
      )}
    </>
  )
}

export default PreviewCard
