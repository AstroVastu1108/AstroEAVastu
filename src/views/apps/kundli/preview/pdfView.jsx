import House from '@/components/preview/House/House'
import React from 'react'
// import "./pdfView.css"
import InfoTable from '@/components/preview/InfoTable/InfoTable'

function PDFView({ BirthDetails, Symbols, AstroVastuHouseScript, pageRef, AstroDetails }) {
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