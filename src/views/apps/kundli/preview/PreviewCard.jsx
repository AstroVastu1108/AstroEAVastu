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
import { Divider, FormControl, IconButton, InputLabel, Menu, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import Event from '@/components/preview/Event/Event'
import PrakritiPopUp from '@/components/preview/InfoTable/PrakritiPopUp'

const PreviewCard = ({ kundliData, isPrintDiv, handleDownload, handleTimeTool }) => {
  // var
  const BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  const AstroDetails = kundliData?.AstroVastuReport?.AstroDetails;
  const ChartSVG = kundliData?.AstroVastuReport?.ChartSVG;
  const MahaDasha = kundliData?.AstroVastuReport?.DashaDetails?.MahaDasha;
  const AntarDasha = kundliData?.AstroVastuReport?.DashaDetails?.AntarDasha;
  const PratyantarDasha = kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha;
  const LifeAntarDasha = kundliData?.AstroVastuReport?.DashaDetails?.LifeAntarDasha;
  const AstroVastuHouseScript = kundliData?.AstroVastuReport?.AstroVastuHouseScript;
  const Symbols = kundliData?.AstroVastuReport?.Symbols;
  const PlanetSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryPlanet;
  const HouseSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryHouse;
  const PlaneNSummaryData = kundliData?.AstroVastuReport?.PlanetScript;
  const HouseNSummaryData = kundliData?.AstroVastuReport?.HouseScript;
  const RahuData = kundliData?.AstroVastuReport?.RahuSpecial;
  const KetuData = kundliData?.AstroVastuReport?.KetuSpecial;

  const [anchorEl, setAnchorEl] = useState(null);
  const [chartValue, setChartValue] = useState("D");
  const [eventValue, setEventValue] = useState("E1");
  const [isPrakritiVisible, setIsPrakritiVisible]=useState(false);
  const open = Boolean(anchorEl);

  const handleIsPraOpen=()=>{
    handleClose();
    setIsPrakritiVisible(true)
  }
  const handleIsPraClose=()=>{
    setIsPrakritiVisible(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuDownload=()=>{
    handleClose();
    handleDownload();
  }
  const handleMenuTimeTool=()=>{
    handleClose();
    handleTimeTool();
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
                    <MenuItem onClick={handleIsPraOpen} className="flex gap-1"><i className={'tabler-arrow-up-right me-2'} />Prakriti</MenuItem>
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
          <div className={`flex flex-wrap lg:flex-nowrap gap-5 px-4 pt-4 ${!isPrintDiv ? 'sm:flex-row sm:justify-start flex-col md:justify-start sm:overflow-auto' : ""}`}>
            <div className='lg:w-1/4 md:w-1/4 sm:w-[calc(50%-10px)] md:flex-grow flex flex-col birth-chart pt-5 w-[100%]'>
              <div className='chart-title'>❋ Birth Chart / Lagna Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} alt="birthChart" />
            </div>
            <div className='lg:w-1/4 md:w-1/4 sm:w-[calc(50%-10px)] md:flex-grow flex flex-col birth-chart pt-5 w-[100%]'>
              <div className='chart-title'>❋ House Chart / Bhav Chalit Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
            </div>
            {/* {!isPrintDiv && */}
            <div className='lg:w-1/4 md:w-1/4 sm:w-[calc(50%-10px)] md:flex-grow flex flex-col birth-chart w-[100%] gap-2'>
              <div className='mt-1'>
                <FormControl fullWidth>
                  <InputLabel id="test">Select option</InputLabel>
                  <Select
                    labelId="test"
                    id="test"
                    label="Select option"
                    // value={"D"}
                    onChange={(e) => { setChartValue(e.target.value) }}
                    defaultValue={chartValue}
                    sx={{ height: '2.9rem !important', minHeight: '1rem !important' }}
                  >
                    <MenuItem value="T">Transient</MenuItem>
                    <MenuItem value="D">Dasha</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {chartValue && chartValue == "D" ?
                <DashaDetails title={"MahaDashas"} DashaData={MahaDasha} />
                :
                <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
              }
            </div>
            {/* } */}
          </div>


          <div className='main-MahaDasha-Div pt-4'>
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[30%]'></div>
              <div className='chart-title w-[40%] pt-5'>
                <span>
                  ❋ Nakshatra Astrology ↠ Planet Script ❋
                </span>
              </div>
              <Event eventValue={eventValue} setEventValue={setEventValue} />
            </div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} />
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
              <Event eventValue={eventValue} setEventValue={setEventValue} />

            </div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} />
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-4'>
            {/* <div className='chart-title'>❋ Planet Script with Nakshatra Lord & Sub Lord ❋</div> */}
            <div className='flex px-4 w-[100%] justify-between'>
              <div className=' w-[20%]'></div>
              <div className='chart-title w-[50%] pt-5'>
                <span>
                  ❋ Planet Script with Nakshatra Lord & Sub Lord ❋
                </span>
              </div>
              <Event eventValue={eventValue} setEventValue={setEventValue} />

            </div>
            <div
              className="Loard-Div sm:grid md:grid-rows-3 md:grid-cols-3 sm:grid-rows-5 sm:grid-cols-2 xs:flex xs:flex-col grid-flow-col gap-3 auto-rows-auto"
            >
              {PlaneNSummaryData.length
                ? PlaneNSummaryData.slice(0, 9).map((element, index) => ( // only display first 9 elements
                  <div key={index} className=''>
                    <LoardPlanet LoardData={element} />
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
    </>
  )
}

export default PreviewCard
