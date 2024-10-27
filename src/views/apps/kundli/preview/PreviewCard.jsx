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
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const PreviewCard = ({ kundliData, isPrintDiv, handleDownload }) => {
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
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid className='previewCard' item xs={12} md={12}>
        <Grid item xs={12} className='pdf-Div'>
          <div className={`chart-name rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row ${!isPrintDiv ? 'sm:flex-row flex-col' : "items-center"}`}>
            {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundli'}
            <div className={`flex justify-between md-items-center lg:gap-4 lg:flex-row md:flex-row ${!isPrintDiv ? 'sm:flex-col flex-col sm:gap-1' : "gap-5"} birthDateTime-Div`} >
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label'>Birth Date & Time: </span>
                <span className='value font-medium'>{BirthDetails?.Date} {BirthDetails?.Time.substring(0, 2)}:{BirthDetails?.Time.substring(2, 4)}</span>
              </div>
              <div className='flex flex-row gap-1 chart-date items-center'>
                <span className='label'>Place: </span>
                <span className='value font-medium'>{BirthDetails?.FormattedCity}</span>
              </div>
              <div>
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
                    <MenuItem onClick={handleDownload} className="flex gap-1"><i className={'tabler-download bg-danger'} />Download</MenuItem>
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
          <div className={`flex lg:flex-row gap-5 pt-8 px-4 ${!isPrintDiv ? 'sm:flex-row sm:justify-start  flex-col md:justify-start sm:overflow-auto' : ""} `}>
            <div className='w-auto flex-1 flex flex-col birth-chart'>
              <div className='chart-title'>❋ Birth Chart / Lagna Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} alt="birthChart" />
            </div>
            <div className='w-[100%] flex-1 flex flex-col birth-chart'>
              <div className='chart-title'>❋ House Chart / Bhav Chalit Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
            </div>
            {!isPrintDiv &&
              <div className='w-auto flex-1 flex flex-col birth-chart'>
                {/* <div className='chart-title'>❋ House Chart / Bhav Chalit Kundali ❋</div> */}
                <div className='flex flex-col flex-1'  >
                  <DashaDetails title={"MahaDashas"} DashaData={MahaDasha} />
                </div>
              </div>
            }
          </div>
          <div className='main-MahaDasha-Div pt-8'>
            <div className='chart-title'>❋ Nakshatra Astrology ↠ Planet Script ❋</div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} />
            </div>
          </div>
          <div className='main-MahaDasha-Div pt-8'>
            <div className='chart-title'>❋ Nakshatra Astrology ↠ House Script ❋</div>
            <div className='planet-table'>
              <NakshtraSummary SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} />
            </div>
          </div>

          <div className='main-RahuKetu-Div pt-8'>
            <div className='chart-title'>❋ Planet Script with Nakshatra Lord & Sub Lord ❋</div>
            <div
              className={`Loard-Div grid md:grid-flow-col gap-5`}
              style={{ gridTemplateRows: 'repeat(3, auto)' }} // each column gets 3 items
            >
              {PlaneNSummaryData.length
                ? PlaneNSummaryData.slice(0, 9).map((element, index) => ( // only display first 9 elements
                  <div key={index}>
                    <LoardPlanet LoardData={element} />
                  </div>
                ))
                : null
              }
            </div>
          </div>




          <div className='main-RahuKetu-Div pt-8'>
            <div className='chart-title'>❋ Rahu & Ketu Special Significators ❋</div>
            <div className='RahuKetu-Div flex gap-4 w-100'>
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

          {/* <div className='main-MahaDasha-Div pt-8'>
            <div className='chart-title'>❋ Current Vimshottari Dasha / Current Planetary Periods ❋</div>
            <div className={`planet-table flex lg:flex-row ${!isPrintDiv ? 'sm:flex-row  flex-col sm:overflow-auto' : ""}`}>
              <div className='flex flex-col lg:w-1/3 flex-1'  >
                <DashaDetails title={"MahaDashas"} DashaData={MahaDasha} />
              </div>
              <div className='flex flex-col lg:w-1/3 flex-1'>
                <DashaDetails title={`Moon (${kundliData?.AstroVastuReport?.DashaDetails?.CurrentMDYears} Years) > AntarDashas`} DashaData={AntarDasha} />
              </div>
              <div className='flex flex-col lg:w-1/3 flex-1'>
                <DashaDetails title={"Mercury > PratyantarDashas"} DashaData={PratyantarDasha} />
              </div>
            </div>
          </div> */}

          {/* <div className='main-MahaDasha-Div pt-8'>
            <div className='chart-title'>❋ Vimshottari AntarDasha / Sub-Planetary Periods of Life ❋</div>
            <div className={`flex lg:flex-wrap ${!isPrintDiv ? 'sm:flex-wrap flex-wrap xs:flex xs:flex-col ' : "flex-wrap"}`}>
              {LifeAntarDasha.length ? (
                LifeAntarDasha.map((element, index) => (
                  <div className={`flex flex-col lg:basis-[calc(33.33%-12px)]  ${!isPrintDiv ? 'sm:basis-[calc(50%-12px)] basis-[calc(100%-0px)] xs:flex-1' : " basis-[calc(33.33%-12px)] "}`} key={index}>
                    <DashaDetails title={`${element.Planet} (${element.Years} Years)`} DashaData={element.AntarDasha} />
                  </div>
                ))
              ) : (
                ""
              )}
            </div>
          </div> */}



          <div className='main-AstroVastuScript-Div pt-8'>
            <div className='chart-title'>❋ Astro Vastu Insights ❋</div>
            <div className='AstroVastuScript-Div'>
              <House houseArr={AstroVastuHouseScript} Symbols={Symbols}></House>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* </CardContent>
    </Card> */}
    </>
  )
}

export default PreviewCard
