import House from '@/components/preview/House/House'
import React, { useEffect, useState } from 'react'
// import "./pdfView.css"
import InfoTable from '@/components/preview/InfoTable/InfoTable'
import NakshtraSummarySimpleTB from '@/components/preview/NakshtraSummary/NakshtraSummarySimpleTB'
import RahuKetuSimpleTB from '@/components/preview/RahuKetu/RahuKetuSimpleTB'
import PlanetSummarySimpleTB from '@/components/preview/PlanetSummary/PlanetSummarySimpleTB'

function PDFView({ BirthDetails, Symbols, AstroVastuHouseScript, pageRef, AstroDetails, ChartSVG, PlaneNSummaryData, HouseNSummaryData, RahuData, KetuData, PlanetSummaryData, HouseSummaryData, DashaGridData, visibleSections }) {

    const [currentDasha, setCurrentDasha] = useState(DashaGridData.filter(dasha => dasha.IsCurrent)[0] || null);

    useEffect(() => {
        setCurrentDasha(DashaGridData.filter(dasha => dasha.IsCurrent)[0] || null);
    }, [DashaGridData]);


    // helper: if visibleSections not passed, default to visible
    const isVisible = (key) => (visibleSections ? !!visibleSections[key] : true);

    return (
        <div className='hidden'>
            <div className='previewCard print-optimized pdfView' ref={pageRef}>

                {/* title */}
                <div className={`chart-name rounded-t text-lg font-bold flex justify-between gap-y-2 lg:flex-row items-center`}>
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
                <table className='mt-3'>
                    <tr>
                        <td>
                            <div className='chart-title font-ea-sb print-title'>&#10059; Birth Chart / Lagna Kundali &#10059;</div>
                        </td>
                        <td>
                            <div className='chart-title font-ea-sb print-title'>{'❋'} House Chart / Bhav Chalit Kundali {'❋'}</div>

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

                {/* Dasha Details */}
                <div className='main-MahaDasha-Div pt-3'>
                    {/* <div className='chart-title font-ea-sb print-title'>❋ Dasha Details ❋</div> */}
                    <div className='planet-table flex flex-row px-5'>
                        <div>Vimshottari Dasha: </div>
                        <div>{currentDasha?.DashaPlanet}</div>
                        <div>{currentDasha?.StartDt}</div>
                        <div>{currentDasha?.EndDt}</div>
                    </div>
                </div>

                {/*  Nakshatra Astrology ↠ Planet Script  */}
                { isVisible("Nakshatra Kundali: Planet & House Script") && (
                <div className='main-MahaDasha-Div pt-3'>
                    <div className='chart-title font-ea-sb print-title'>❋ Nakshatra Astrology ↠ Planet Script ❋</div>
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
                )}

                {/* Rahu & Ketu Special Significators */}
                { isVisible("Nakshatra Kundali: Planet & House Script") && (
                <div className='main-RahuKetu-Div pt-3'>
                    <div className='chart-title font-ea-sb print-title'>❋ Rahu & Ketu Special Significators ❋</div>
                    <div className='RahuKetu-Div flex gap-4 flex-col sm:flex-row'>
                        <RahuKetuSimpleTB RahuData={RahuData} KetuData={KetuData} Significators={"R"} SelectedEventVal={null} />
                    </div>
                </div>
                )}

                {/*  Nakshatra Astrology ↠ House Script  */}
                { isVisible("Nakshatra Kundali: Planet & House Script") && (
                <div className='main-MahaDasha-Div main-MahaDasha-Div-break  pt-3'>
                    <div className='chart-title font-ea-sb print-title'>❋ Nakshatra Astrology ↠ House Script ❋</div>
                    <div className='planet-table'>
                        <NakshtraSummarySimpleTB SummaryData={HouseNSummaryData} Aspect={"H"} symbols={Symbols} SelectedEventVal={null} />
                    </div>
                </div>
                )}

                {/* Planet -> Planet Aspects Summary */}
                { (isVisible("Planet Script: Nakshatra & Sub Lord") || isVisible("Nakshatra Kundali: Planet & House Script")) && (
                <div className='pt-3 main-planet-summary-Div'>
                    <div className='chart-title font-ea-sb '>❋ Planet ↠ Planet Aspects Summary ❋</div>
                    <div className=''>
                        <PlanetSummarySimpleTB SummaryData={PlanetSummaryData} Aspect={"P"} />
                    </div>
                </div>
                )}

                {/* Planet -> House Aspects Summary */}
                { (isVisible("Planet Script: Nakshatra & Sub Lord") || isVisible("Nakshatra Kundali: Planet & House Script")) && (
                <div className='pt-3'>
                    <div className='chart-title font-ea-sb '>❋ Planet ↠ House Aspects Summary ❋</div>
                    <div className=''>
                        <PlanetSummarySimpleTB SummaryData={HouseSummaryData} Aspect={"H"} />
                    </div>
                </div>
                )}

                {/* Astro Vastu Insights */}
                { isVisible("Astro Vastu Insights") && (
                <div className='main-AstroVastuScript-Div pt-3 print-content'>
                    <div className='chart-title font-ea-sb print-title'>❋ Astro Vastu Insights ❋</div>
                    <div className='AstroVastuScript-Div print-house-container'>
                        <House houseArr={AstroVastuHouseScript} Symbols={Symbols} isPrintDiv={true}></House>
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}

export default PDFView