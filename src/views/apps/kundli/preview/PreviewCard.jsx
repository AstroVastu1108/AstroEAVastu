// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Component Imports
import Label from '@/components/preview/Label/Label'
import Value from '@/components/preview/Value/Value'
import House from '@/components/preview/House/House'

// Style Imports
// import tableStyles from '@core/styles/table.module.css'
import "./preview.css"

import { DataGrid } from '@mui/x-data-grid';
import SummaryAspect from '@/components/preview/PlanetSummary/PlanetSummary'
import textAlign from 'tailwindcss-logical/plugins/textAlign'



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
  const columns = [
    {
      field: 'Planet', headerName: 'Planet', headerClassName: 'rowheader',flex:1,
      // headerAlign: 'center', textAlign:'center'
    },
    {
      field: 'StartDt', headerName: 'Beginning', headerClassName: 'rowheader',flex:1,
      // headerAlign: 'center'
    },
    {
      field: 'EndDt', headerName: 'Ending', headerClassName: 'rowheader',flex:1,
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
    <Card className='previewCard'>
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          <Grid item xs={12} className='pdf-Div'>
            <div className='p-6 Birthdetail-div'>
              <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  <span className="Name-title">{BirthDetails?.FirstName} {BirthDetails?.MiddleName} {BirthDetails?.LastName}</span>
                </div>
                <div className='flex flex-row'>
                  <Label LabelTextArr={['Birth Date & Time', 'Place']} />
                  <Value ValueTextArr={[`${BirthDetails?.Date} ${BirthDetails?.Time.substring(0, 2)}:${BirthDetails?.Time.substring(2, 4)}`, BirthDetails?.FormattedCity]} />
                </div>
              </div>
            </div>
            <div className='sm:flex-row AstroDetails-Div'>
              <div className='flex flex-row block-detail'>
                <Label LabelTextArr={['Rashi (Moon Sign)', 'Nakshatra / Pada', 'Gana / TriGuna', 'First Alphabet']} />
                <Value ValueTextArr={[AstroDetails?.Rashi, `${AstroDetails?.Nakshatra?.Nakshatra} / ${AstroDetails?.Nakshatra.Pada} (${AstroDetails?.Nakshatra?.PlanetName})`, `${AstroDetails?.Nakshatra?.Gana == 'R' ? 'Rakshasa' : 'Manushya'} / ${AstroDetails?.Nakshatra?.TriGuna}`, 'A']} />
              </div>
              <div className='flex flex-row block-detail'>
                <Label LabelTextArr={['Vikram Samvant', 'Birth Tithi (Sun Rise)', 'Yoga / Karana', 'Astro / Western Day']} />
                <Value ValueTextArr={[AstroDetails?.VikramSamvat, `${AstroDetails?.JanmaTithi} (${AstroDetails?.SunRiseTime})`, `${AstroDetails?.JanmaYoga} / ${AstroDetails?.JanmaKarana}`, `${AstroDetails?.AstroWeekday} / ${AstroDetails?.WesternWeekday}`]} />
              </div>
              <div className='flex flex-row block-detail'>
                <Label LabelTextArr={['Location', 'Country', 'Lat, Lng', 'Prakriti']} />
                <Value ValueTextArr={[BirthDetails?.FormattedCity, BirthDetails?.Country, `${BirthDetails?.Lat} , ${BirthDetails?.Lng}`, `${BirthDetails?.Gender} / ${BirthDetails?.Prakriti}`]} />
              </div>
            </div>
            <div className='sm:flex-row ChartSVG-Div'>
              <div className='ChartSVG-Div-sub'>
                <div className='heading-div'>❋ Birth Chart / Lagna Kundali ❋</div>
                <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} alt="birthChart" />
              </div>
              <div className='ChartSVG-Div-sub'>
                <div className='heading-div'>❋ House Chart / Bhav Chalit Kundali ❋</div>
                <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} alt="birthChart" />
              </div>
            </div>
            <div className='main-MahaDasha-Div'>
              <div className='heading-div'>❋ Vimshottari Dasha / Planetary Periods of Life❋</div>
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
