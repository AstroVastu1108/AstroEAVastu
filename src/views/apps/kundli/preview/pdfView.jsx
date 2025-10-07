import House from '@/components/preview/House/House'
import React from 'react'
// import "./pdfView.css"
import InfoTable from '@/components/preview/InfoTable/InfoTable'
import NakshtraSummarySimpleTB from '@/components/preview/NakshtraSummary/NakshtraSummarySimpleTB'
import LoardPlanet from '@/components/preview/LoardPlanet/LoardPlanet'
import RahuKetu from '@/components/preview/RahuKetu/RahuKetu'
import RahuKetuSimpleTB from '@/components/preview/RahuKetu/RahuKetuSimpleTB'
import SummaryAspect from '@/components/preview/PlanetSummary/PlanetSummary'
import PlanetSummarySimpleTB from '@/components/preview/PlanetSummary/PlanetSummarySimpleTB'

function PDFView({ BirthDetails, Symbols, AstroVastuHouseScript, pageRef, AstroDetails, ChartSVG, PlaneNSummaryData, HouseNSummaryData, RahuData, KetuData, PlanetSummaryData, HouseSummaryData }) {
    return (
        <div className='hidden'>
            <div className='previewCard print-optimized pdfView' ref={pageRef}>

                {/* title */}
                <div className={`chart-name text-lg font-bold flex justify-between gap-y-2 lg:flex-row items-center`}>
                    {BirthDetails?.FirstName ? `${BirthDetails.FirstName} ${BirthDetails.MiddleName} ${BirthDetails.LastName}` : 'Prashna Kundali'}
                    <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row gap-5 birthDateTime-Div`} >
                        <div className='flex flex-row gap-1 chart-date items-center'>
                            <span className='label font-ea-n'>Birth Date & Time: </span>
                            <span className='value font-ea-sb' style={{ whiteSpace: 'nowrap' }}>{BirthDetails?.BirthDate} {BirthDetails?.BirthTime.substring(0, 2)}:{BirthDetails?.BirthTime.substring(2, 4)}:{(BirthDetails?.BirthTime.substring(4, 6) ? BirthDetails?.BirthTime.substring(4, 6) : '00')}
                            </span>
                        </div>
                        <div className='flex flex-row gap-1 chart-date items-center'>
                            <span className='label font-ea-n'>Place: </span>
                            <span className='value font-ea-sb'>{BirthDetails?.City}, {BirthDetails?.Country}</span>
                        </div>
                    </div>
                </div>

                {/* Birth Details */}
                <div className={`birth-info-table`}>
                    <div className='flex flex-row block-detail'>

                        <InfoTable InfoTableTextArr={[
                            { "label": "Rashi / Alphabet ", "value": `${AstroDetails?.Rashi} / A` },
                            { "label": "Nakshatra / Pada ", "value": `${AstroDetails?.Nakshatra?.Nakshatra} / ${AstroDetails?.Nakshatra.Pada} (${AstroDetails?.Nakshatra?.PlanetName})` },
                            { "label": "Gana / TriGuna ", "value": `${AstroDetails?.Nakshatra?.Gana == 'R' ? 'Rakshasa' : 'Manushya'} / ${AstroDetails?.Nakshatra?.TriGuna}` },
                            { "label": "Yoga / Karana ", "value": `${AstroDetails?.JanmaYoga} / ${AstroDetails?.JanmaKarana}` },
                        ]} isPrintDiv={false} />
                    </div>
                    <div className='flex flex-row block-detail'>
                        <InfoTable InfoTableTextArr={[
                            { "label": "Vikram Samvant ", "value": AstroDetails?.VikramSamvat },
                            { "label": "Birth Tithi / Sun Rise ", "value": `${AstroDetails?.JanmaTithi} / ${AstroDetails?.SunRiseTime}` },
                            { "label": "Astro / Western Day ", "value": `${AstroDetails?.AstroWeekday} / ${AstroDetails?.WesternWeekday}` },
                            // { "label": "Location ", "value": `${BirthDetails?.City}, ${BirthDetails?.Country}` },
                        ]} isPrintDiv={false} />
                    </div>
                    <div className='flex flex-row block-detail'>
                        <InfoTable InfoTableTextArr={[
                            { "label": "Lucky / Destiny # ", "value": `${AstroDetails?.Numerology?.BirthNumber} / ${AstroDetails?.Numerology?.DestinyNumber} (${AstroDetails?.Numerology?.DestinyYearNumber})` },
                            { "label": "Destiny Year ", "value": ` ${AstroDetails?.Numerology?.DestinyYear - 1} - ${AstroDetails?.Numerology?.DestinyYear}` },
                            { "label": "Lat, Lng ", "value": `${BirthDetails?.Latitude}, ${BirthDetails?.Longitude}` },
                            { "label": "Timezone ", "value": ` ${BirthDetails?.Timezone}` },
                        ]} isPrintDiv={false} />
                    </div>
                </div>

                {/* birth chart and houses */}
                <table className='mt-4'>
                    <tr>
                        <td>
                            <div className='chart-title print-title'>❋ Birth Chart / Lagna Kundali ❋</div>
                        </td>
                        <td>
                            <div className='chart-title print-title'>❋ House Chart / Bhav Chalit Kundali ❋</div>

                        </td>
                    </tr>
                    <tr className=''>
                        <td className='w-1/2'>
                            <div className='flex justify-center items-center px-6'>
                                <img src={`data:image/svg+xml;base64,${ChartSVG?.BirthChart}`} className='flex-auto' alt="birthChart" />
                            </div>
                        </td>
                        <td className='w-1/2'>
                            <div className='flex justify-center items-center px-6'>
                                <img src={`data:image/svg+xml;base64,${ChartSVG?.HouseChart}`} className='flex-auto' alt="birthChart" />
                            </div>
                        </td>
                    </tr>
                </table>

                {/*  Nakshatra Astrology ↠ Planet Script  */}
                <div className='main-MahaDasha-Div pt-5'>
                    <div className='chart-title print-title'>❋ Nakshatra Astrology ↠ Planet Script ❋</div>
                    <div className='planet-table'>
                        <NakshtraSummarySimpleTB SummaryData={PlaneNSummaryData} Aspect={"P"} symbols={Symbols} SelectedEventVal={null} />
                    </div>
                    <div className="Nakshatra-Legend mt-2 px-2 whitespace-nowrap overflow-x-auto">
                        <div className="arrow-info flex flex-row gap-3 items-center">
                            <span>Legend:</span>
                            <span>🡑 Exalted</span>
                            <span>🡓 Debilitated</span>
                            <span>☀ Combust</span>
                            <span>⮂ Exchange Sign</span>
                            <span>⮁ Exchange Nakshatra</span>
                            <span>★ Untenanted</span>
                            <span>✪ SelfStar</span>
                            <span>⮌ Retro</span>
                        </div>
                    </div>
                </div>

                {/*  Nakshatra Astrology ↠ House Script  */}
                <div className='main-MahaDasha-Div pt-5'>
                    <div className='chart-title print-title'>❋ Nakshatra Astrology ↠ House Script ❋</div>
                    <div className='planet-table'>
                        <NakshtraSummarySimpleTB SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} SelectedEventVal={null} />
                    </div>
                </div>

                <div class='page-break'></div>


                {/* Rahu & Ketu Special Significators */}
                <div className='main-RahuKetu-Div pt-8'>
                    <div className='chart-title print-title'>❋ Rahu & Ketu Special Significators ❋</div>
                    <div className='RahuKetu-Div flex gap-4 flex-col sm:flex-row'>
                        <RahuKetuSimpleTB RahuData={RahuData} KetuData={KetuData} Significators={"R"} SelectedEventVal={null} />
                    </div>
                </div>

                <div className='pt-8'>
                    <div className='chart-title'>❋ Planet ↠ Planet Aspects Summary ❋</div>
                    <div className=''>
                        <PlanetSummarySimpleTB SummaryData={PlanetSummaryData} Aspect={"P"} />
                    </div>
                </div>
                <div className='pt-8'>
                    <div className='chart-title'>❋ Planet ↠ House Aspects Summary ❋</div>
                    <div className=''>
                        <PlanetSummarySimpleTB SummaryData={HouseSummaryData} Aspect={"H"} />
                    </div>
                </div>


                {/* Astro Vastu Insights */}
                <div className='main-AstroVastuScript-Div pt-8 print-content'>
                    <div className='chart-title print-title'>❋ Astro Vastu Insights ❋</div>
                    <div className='AstroVastuScript-Div print-house-container'>
                        <House houseArr={AstroVastuHouseScript} Symbols={Symbols}></House>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PDFView