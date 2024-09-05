// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid';

// Component Imports
import House from '@/components/preview/House/House'
import SummaryAspect from '@/components/preview/PlanetSummary/PlanetSummary'
import InfoTable from '@/components/preview/InfoTable/InfoTable'

// Style Imports
import "./preview.css"
import NakshtraSummary from '@/components/preview/NakshtraSummary/NakshtraSummary';

const PreviewCard = ({ kundliData, id }) => {
  // var
  const BirthDetails = kundliData?.AstroVastuReport?.BirthDetails;
  const AstroDetails = kundliData?.AstroVastuReport?.AstroDetails;
  const ChartSVG = kundliData?.AstroVastuReport?.ChartSVG;
  const MahaDasha = kundliData?.AstroVastuReport?.DashaDetails?.MahaDasha;
  const AntarDasha = kundliData?.AstroVastuReport?.DashaDetails?.AntarDasha;
  const PratyantarDasha = kundliData?.AstroVastuReport?.DashaDetails?.PratyantarDasha;
  const AstroVastuHouseScript = kundliData?.AstroVastuReport?.AstroVastuHouseScript;
  const Symbols = kundliData?.AstroVastuReport?.Symbols;
  const PlanetSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryPlanet;
  const HouseSummaryData = kundliData?.AstroVastuReport?.AsperctSummaryHouse;
  const PlaneNSummaryData = kundliData?.AstroVastuReport?.PlanetScript;
  const HouseNSummaryData = kundliData?.AstroVastuReport?.HouseScript;
  const columns = [
    {
      field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader', flex: 1,
      // headerAlign: 'center', textAlign:'center'
    },
    {
      field: 'StartDt', headerName: 'Beginning', headerClassName: 'rowheader', flex: 1,
      // headerAlign: 'center'
    },
    {
      field: 'EndDt', headerName: 'Ending', headerClassName: 'rowheader', flex: 1,
      // headerAlign: 'center'
    },
  ];
  // Adding unique IDs
  const rowsMahaDasha = MahaDasha?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));
  const rowsAntarDasha = AntarDasha?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));
  const rowsPratyantarDasha = PratyantarDasha.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

  return (
    <>
      {/* <Card className='previewCard'>
       <CardContent className='p-3'> */}
      <Grid className='previewCard' item xs={12} md={12}>
        <Grid item xs={12} className='pdf-Div'>
          <div className='p-3 Birthdetail-div'>
            <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
              <div className='flex flex-col gap-6'>
                <span className="Name-title">
                  {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundli'}
                </span>

                {/* <span className="Name-title">{BirthDetails?.FirstName} {BirthDetails?.MiddleName} {BirthDetails?.LastName}</span> */}
              </div>
              <div className='flex flex-row gap-5 birthDateTime-Div'>
                <div>
                  <span className='label'>Birth Date & Time: </span>
                  <span className='value'>{BirthDetails?.Date} {BirthDetails?.Time.substring(0, 2)}:{BirthDetails?.Time.substring(2, 4)}</span>
                </div>
                <div>
                  <span className='label'>Place: </span>
                  <span className='value'>{BirthDetails?.FormattedCity}</span>
                </div>
                {/* <InfoTable InfoTableTextArr={[{ "label": "Birth Date & Time: ", "value": `${BirthDetails?.Date} ${BirthDetails?.Time.substring(0, 2)}:${BirthDetails?.Time.substring(2, 4)}` }]} />
                  <InfoTable InfoTableTextArr={[{"label":"Place: ","value":BirthDetails?.FormattedCity}]} /> */}
              </div>
            </div>
          </div>
          <div className='sm:flex-row AstroDetails-Div'>
            <div className='flex flex-row block-detail'>

              <InfoTable InfoTableTextArr={[
                { "label": "Rashi (Moon Sign) ", "value": AstroDetails?.Rashi },
                { "label": "Nakshatra / Pada ", "value": `${AstroDetails?.Nakshatra?.Nakshatra} / ${AstroDetails?.Nakshatra.Pada} (${AstroDetails?.Nakshatra?.PlanetName})` },
                { "label": "Gana / TriGuna ", "value": `${AstroDetails?.Nakshatra?.Gana == 'R' ? 'Rakshasa' : 'Manushya'} / ${AstroDetails?.Nakshatra?.TriGuna}` },
                { "label": "First Alphabet ", "value": 'A' },
              ]} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Vikram Samvant ", "value": AstroDetails?.VikramSamvat },
                { "label": "Birth Tithi (Sun Rise) ", "value": `${AstroDetails?.JanmaTithi} (${AstroDetails?.SunRiseTime})` },
                { "label": "Yoga / Karana ", "value": `${AstroDetails?.JanmaYoga} / ${AstroDetails?.JanmaKarana}` },
                { "label": "Astro / Western Day ", "value": `${AstroDetails?.AstroWeekday} / ${AstroDetails?.WesternWeekday}` },
              ]} />
            </div>
            <div className='flex flex-row block-detail'>
              <InfoTable InfoTableTextArr={[
                { "label": "Location ", "value": BirthDetails?.FormattedCity },
                { "label": "Country ", "value": BirthDetails?.Country },
                { "label": "Lat, Lng ", "value": `${BirthDetails?.Lat} , ${BirthDetails?.Lng}` },
                { "label": "Prakriti ", "value": `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}` },
              ]} />
            </div>
          </div>
          <div className='sm:flex-row justify-center ChartSVG-Div'>
            <div className='ChartSVG-Div-sub'>
              <div className='heading-div'>❋ Birth Chart / Lagna Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} alt="birthChart" />
            </div>
            <div className='ChartSVG-Div-sub'>
              <div className='heading-div'>❋ House Chart / Bhav Chalit Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
            </div>
            <div className='ChartSVG-Div-sub'>
              <div className='heading-div'>❋ House Chart / Bhav Chalit Kundali ❋</div>
              <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
            </div>
          </div>
          <div className='main-MahaDasha-Div'>
            <div className='heading-div'>❋ Nakshatra Astrology ↠ Planet Script ❋</div>
            <div className='MahaDasha-Div'>
              <NakshtraSummary SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} />
            </div>
          </div>
          <div className='main-MahaDasha-Div'>
            <div className='heading-div'>❋ Nakshatra Astrology ↠ House Script ❋</div>
            <div className='MahaDasha-Div'>
              <NakshtraSummary SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} />
            </div>
          </div>


          <div className='main-AstroVastuScript-Div'>
            <div className='heading-div'>❋ Planet ↠ Planet Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={PlanetSummaryData} Aspect={"P"} />
            </div>
          </div>
          <div className='main-AstroVastuScript-Div'>
            <div className='heading-div'>❋ Planet ↠ House Aspects Summary ❋</div>
            <div className='Summary-Div'>
              <SummaryAspect SummaryData={HouseSummaryData} Aspect={"H"} />
            </div>
          </div>

          <div className='main-MahaDasha-Div'>
            <div className='heading-div'>❋ Vimshottari Dasha / Planetary Periods of Life ❋</div>
            <div className='MahaDasha-Div'>
              <div style={{ width: '33%' }}>
                <DataGrid
                  rows={rowsMahaDasha}
                  columns={columns}
                  getRowClassName={(params) =>
                    params.row.IsCurrent ? 'highlight-row' : ''
                  }
                  disableColumnSorting
                  disableColumnMenu
                  rowHeight={30}
                  columnHeaderHeight={38}
                  disableColumnResize
                  disableRowSelectionOnClick
                  hideFooterPagination={true}
                  hideFooter={true}
                />
              </div>
              <div style={{ width: '33%' }}>
                <DataGrid
                  rows={rowsAntarDasha}
                  columns={columns}
                  pageSize={rowsAntarDasha.length} // Show all rows
                  getRowClassName={(params) =>
                    params.row.IsCurrent ? 'highlight-row' : ''
                  }
                  disableColumnSorting
                  disableColumnMenu
                  rowHeight={30}
                  columnHeaderHeight={38}
                  disableColumnResize
                  disableRowSelectionOnClick
                  hideFooterPagination={true}
                  hideFooter={true}
                />
              </div>
              <div style={{ width: '33%' }}>
                <DataGrid
                  rows={rowsPratyantarDasha}
                  columns={columns}
                  getRowClassName={(params) =>
                    params.row.IsCurrent ? 'highlight-row' : ''
                  }
                  disableColumnSorting
                  disableColumnMenu
                  rowHeight={30}
                  columnHeaderHeight={38}
                  disableColumnResize
                  disableRowSelectionOnClick
                  hideFooterPagination={true}
                  hideFooter={true}
                />
              </div>
            </div>
          </div>

          <div className='main-AstroVastuScript-Div'>
            <div className='heading-div'>❋ Astro Vastu Script ❋</div>
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
