import EventModel from '@/components/EventModel/eventModel';
import React, { useState } from 'react'

function House({ houseArr, Symbols }) {
  const rashiSymbols = {
    Aries: "♈︎",
    Taurus: "♉︎",
    Gemini: "♊︎",
    Cancer: "♋︎",
    Leo: "♌︎",
    Virgo: "♍︎",
    Libra: "♎︎",
    Scorpio: "♏︎",
    Sagittarius: "♐︎",
    Capricorn: "♑︎",
    Aquarius: "♒︎",
    Pisces: "♓︎"
  };

  function formatRashiDescAstro(desc) {
    const parts = desc.split(':'); // Split the string by colons
    if (parts.length >= 2) {
      return `${parts[0]}° ${parts[1]}'`;
    }
    return desc; // Return the original string if it doesn't match the expected format
  }

  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState([])
  const [selectedTitle, setSelectedTitle] = useState("")
  const handleAddClose = () => {
    setOpen(false)
  }

  const handleEvent = (type, house, title, data) => {
    setSelectedTitle(house + " 🡒 " + title);
    setOpen(true)
    setSelectedEvent(data);
  }

  return (
    <>
      <div className='house-main-Div'>
        {houseArr.map((e, index) =>
        (
          <>
            <div className='house-Div' key={index}>

              <div className="house-header cursor-pointer" onClick={() => { handleEvent('house', `House-${(index + 1)}`, "", `${e?.HouseDescAstro} ${e?.HouseDescVastu}`) }}>
                <div className='house-title'>
                  <div className='house-title-number font-ea-sb'>House-{(index + 1)}</div>
                  <div className='arrow'>🡒</div>
                  <div className='house-title-desc'>{e?.HouseDescAstro}, {e?.HouseDescVastu}</div>

                </div>
                <div className='house-title-nakshatra'>
                  <div className='house-header-Div2-sub1'>
                    ✻ {e?.Nakshatra} / {e?.NakshatraPada}
                  </div>
                  <div className='house-title-energyfield'>
                    🡐 <span className='font-ea-sb'>{e?.EnergyField}</span>
                  </div>
                </div>
              </div>
              <div className="house-body">
                <div className='house-body-Div1' >
                  {e?.HouseAspectsZero?.length ?

                    <div>{e?.HouseAspectsZero?.map((houseaspect, key) => (
                      <div key={key} className='house-div-sub cursor-pointer' onClick={() => { handleEvent('houseAspect', `House-${(index + 1)}`, "", `${houseaspect?.Aspect}° `) }}>
                        {
                          houseaspect?.IsWithRaKe ?
                            (<div className='sub-div-rake font-ea-sb'>
                              <div className='font-ea-sb'>
                                {houseaspect?.Aspect}°
                              </div>
                              <span className='item-aspect-arrow'>↠</span>
                              <span>{houseaspect?.Planet}</span>
                              <span className='ps-1'>⦿</span>
                            </div>) : (<div className='sub-div1 font-ea-sb'>
                              <div className='font-ea-sb'>{houseaspect?.Aspect}°</div>
                              <span className='item-aspect-arrow'>↠</span>
                              <span>{houseaspect?.Planet}</span>
                            </div>)
                        }


                        <div>{houseaspect?.PlanetRashiShort}. {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                  {e?.HouseAspectsPositive?.length ?
                    <div>{e?.HouseAspectsPositive?.map((houseaspect, key) => (
                      <div key={key} className='house-div-sub cursor-pointer' onClick={() => { handleEvent('houseAspect', `House-${(index + 1)}`, "", `${houseaspect?.Aspect}° `) }}>
                        {
                          houseaspect?.IsWithRaKe ?
                            (<div className='sub-div-rake font-ea-sb'>
                              <div>
                                {houseaspect?.Aspect}°
                              </div>
                              <span className='item-aspect-arrow'>↠</span>
                              <span>{houseaspect?.Planet}</span>
                              <span className='ps-1'>⦿</span>
                            </div>) : (<div className='sub-div2 font-ea-sb'>
                              <div>{houseaspect?.Aspect}°</div>
                              <span className='item-aspect-arrow'>↠</span>
                              <span>{houseaspect?.Planet}</span>
                            </div>)
                        }


                        <div>{houseaspect?.PlanetRashiShort}. {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                  {e?.HouseAspectsNegative?.length ?

                    <div>{e?.HouseAspectsNegative?.map((houseaspect, key) => (
                      <div key={key} className='house-div-sub cursor-pointer' onClick={() => { handleEvent('houseAspect', `House-${(index + 1)}`, "", `${houseaspect?.Aspect}° `) }}>

                        {
                          houseaspect?.IsWithRaKe ?
                            (<div className='sub-div-rake font-ea-sb'>
                              <div>
                                {houseaspect?.Aspect}°
                              </div>
                              <span className='item-aspect-arrow'>↠</span>
                              <span>{houseaspect?.Planet}</span>
                              <span className='ps-1'>⦿</span>
                            </div>) : (
                              <div className='sub-div3 font-ea-sb'>
                                <div>{houseaspect?.Aspect}°</div>
                                <span className='item-aspect-arrow'>↠</span>
                                <span>{houseaspect?.Planet}</span>
                              </div>)
                        }


                        <div>{houseaspect?.PlanetRashiShort}. {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                </div>
                <div className='house-body-Div2'>
                  {e?.RashiDetails.map((rashi, key) =>
                  (
                    <>
                      <div className='rahi-Div' key={key}>
                        <div className='item-title'>
                          <div className='rashi-Div1-sub1 cursor-pointer font-ea-sb' onClick={() => { handleEvent('house', `House-${(index + 1)}`, `${rashi?.Rashi} ${rashiSymbols[rashi?.Rashi]}`, `${rashi?.RashiDescAstro}`) }}>{rashi?.RashiRoman}. {rashi?.Rashi}<span className='rashiColor'> {rashiSymbols[rashi?.Rashi]} </span>{rashi?.Degree && formatRashiDescAstro(rashi.Degree)} &gt; {rashi?.RashiLord}</div>
                          <div className='rashi-Div1-sub2'>✦ {rashi?.RashiDescAstro}</div>
                          <div className='rashi-Div1-sub3'>❖ {rashi?.RashiDescVastu}</div>

                        </div>
                        {rashi?.Planets?.length &&
                          (<div className='rahi-Div2'>{rashi?.Planets.map((Planet, key) =>
                          (
                            <div className='planet-Div ' key={key}>
                              <div className='planet-Div-sub'>
                                <div className={`planet-Div1 item-title-planet-bg-${Planet?.Planet.toLowerCase()}`}>
                                  <div className='font-ea-sb'>{Planet?.Planet} &gt; {Planet?.Degree && formatRashiDescAstro(Planet.Degree)} </div>
                                  <div className='planet-Div1-sub whitespace-nowrap'>
                                    <div>{Planet?.IsRetro && Symbols?.IsRetro}</div>
                                    <div>{Planet?.IsExalted && Symbols?.IsExalted}</div>
                                    <div>{Planet?.IsDebilitated && Symbols?.IsDebilitated}</div>
                                    <div>{Planet?.IsCombust && Symbols?.IsCombust}</div>
                                    <div>{Planet?.IsUntenanted && Symbols?.IsUntenanted}</div>
                                    <div>{Planet?.IsSelfStar && Symbols?.IsSelfStar}</div>
                                    <div>{Planet?.IsExchange && Symbols?.IsExchange}</div>
                                  </div>

                                </div>
                                <div className='planet-Div2'>
                                  <div className="sub-div">
                                    <span className='font-ea-sb'>{Planet?.PL?.Planet}</span>
                                    <span className='font-normal'>{Planet?.PL?.ScriptFull}</span>
                                  </div>
                                  <div className="sub-div">
                                    <span className='font-ea-sb'>{Planet?.NL?.Planet}</span>
                                    <span className='font-normal'>{Planet?.NL?.ScriptFull}</span>
                                  </div>
                                  <div className="sub-div">
                                    <span className='font-ea-sb'>{Planet?.SL?.Planet}</span>
                                    <span className='font-normal'>{Planet?.SL?.ScriptFull}</span>
                                  </div>
                                </div>
                                <div className='planet-Div3 pb-2'>
                                  <div className="sub-div1 font-ea-sb"> ✻ {Planet?.Nakshatra} / {Planet?.NakshatraPada} 🡐 {Planet?.EnergyField}</div>
                                  <div className="sub-div">✦ {Planet?.PlanetDescAstro} </div>
                                  <div className="sub-div">❖ {Planet?.PlanetDescVastu} </div>
                                </div>
                              </div>
                              <div className={`rahi-Div3 border-t-[5px] p-2 item-title-planet-border-${Planet?.Planet.toLowerCase()}`} >
                                {Planet?.PlanetAspectsZero?.length ?
                                  <div>{Planet?.PlanetAspectsZero?.map((Planetaspect, key) => (
                                    <div>
                                      <div className='rashi-div-sub' key={key}>
                                        {
                                          Planetaspect?.IsWithRaKe ?
                                            (
                                              <div className='sub-div-rake cursor-pointer font-ea-sb' onClick={() => { handleEvent('planetAspect', `House-${(index + 1)}`, "", `${Planetaspect?.Aspect}° `) }}><div>
                                                {Planetaspect?.Aspect}°
                                              </div>
                                                <span className='item-aspect-arrow'>↠</span>
                                                <span>{Planetaspect?.Planet}</span>
                                                <span className='ps-1'>⦿</span>
                                              </div>) :
                                            <div className='sub-div1 cursor-pointer font-ea-sb' onClick={() => { handleEvent('planetAspect', `House-${(index + 1)}`, "", `${Planetaspect?.Aspect}° `) }}>
                                              <div>{Planetaspect?.Aspect}°</div>
                                              <span className='item-aspect-arrow'>↠</span>
                                              <span> {Planetaspect?.Planet}</span>
                                            </div>
                                        }
                                        <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                      </div>
                                    </div>
                                  ))} </div> : ""
                                }
                                {Planet?.PlanetAspectsPositive?.length ?
                                  <div>{Planet?.PlanetAspectsPositive?.map((Planetaspect, key) => (
                                    <div className='rashi-div-sub' key={key}>
                                      {
                                        Planetaspect?.IsWithRaKe ?
                                          (<div className='sub-div-rake cursor-pointer font-ea-sb' onClick={() => { handleEvent('planetAspect', `House-${(index + 1)}`, "", `${Planetaspect?.Aspect}° `) }}>
                                            <div>
                                              {Planetaspect?.Aspect}°
                                            </div>
                                            <span className='item-aspect-arrow'>↠</span>
                                            <span>{Planetaspect?.Planet}</span>
                                            <span className='ps-1'>⦿</span></div>) :
                                          <div className='sub-div2 cursor-pointer font-ea-sb' onClick={() => { handleEvent('planetAspect', `House-${(index + 1)}`, "", `${Planetaspect?.Aspect}° `) }}>
                                            <div>{Planetaspect?.Aspect}°</div>
                                            <span className='item-aspect-arrow'>↠</span>
                                            <span>{Planetaspect?.Planet}</span>
                                          </div>
                                      }
                                      <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                    </div>
                                  ))} </div> : ""
                                }
                                {Planet?.PlanetAspectsNegative?.length ?
                                  <div>{Planet?.PlanetAspectsNegative?.map((Planetaspect, key) => (
                                    <div className='rashi-div-sub' key={key}>
                                      {
                                        Planetaspect?.IsWithRaKe ?
                                          (<div className='sub-div-rake cursor-pointer font-ea-sb' onClick={() => { handleEvent('planetAspect', `House-${(index + 1)}`, "", `${Planetaspect?.Aspect}° `) }}>
                                            <div>{Planetaspect?.Aspect}°</div>
                                            <span className='item-aspect-arrow'>↠</span>
                                            <span>{Planetaspect?.Planet}</span>
                                            <span className='ps-1'>⦿</span></div>) :
                                          <div className='sub-div3 cursor-pointer font-ea-sb' onClick={() => { handleEvent('planetAspect', `House-${(index + 1)}`, "", `${Planetaspect?.Aspect}° `) }}>
                                            <div>{Planetaspect?.Aspect}°</div>
                                            <span className='item-aspect-arrow'>↠</span>
                                            <span>{Planetaspect?.Planet}</span>
                                          </div>
                                      }
                                      <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                    </div>
                                  ))} </div> : ""
                                }
                              </div>
                            </div>
                          )
                          )}</div>)
                        }

                        {/* <div className='rahi-Div3'>
                          {rashi?.Planets?.length ? <>
                            {rashi?.Planets.map(Planet => (<>
                              {Planet?.PlanetAspectsZero?.length ?
                                <div>{Planet?.PlanetAspectsZero?.map((Planetaspect, key) => (
                                  <div className='rashi-div-sub' key={key}>
                                    {
                                      Planetaspect?.IsWithRaKe ?
                                        (<div className='sub-div-rake'><span>{Planetaspect?.Aspect}° ↠ {Planetaspect?.Planet}</span><span>⦿</span></div>) :
                                        <div className='sub-div1'>{Planetaspect?.Aspect}° ↠ {Planetaspect?.Planet}</div>
                                    }
                                    <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                  </div>
                                ))} </div> : ""
                              }
                              {Planet?.PlanetAspectsPositive?.length ?
                                <div >{Planet?.PlanetAspectsPositive?.map((Planetaspect, key) => (
                                  <div className='rashi-div-sub' key={key}>
                                    {
                                      Planetaspect?.IsWithRaKe ?
                                        (<div className='sub-div-rake'><span>{Planetaspect?.Aspect}° ↠ {Planetaspect?.Planet}</span><span>⦿</span></div>) :
                                        <div className='sub-div2'>{Planetaspect?.Aspect}° ↠ {Planetaspect?.Planet}</div>
                                    }
                                    <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                  </div>
                                ))} </div> : ""
                              }
                              {Planet?.PlanetAspectsNegative?.length ?
                                <div>{Planet?.PlanetAspectsNegative?.map((Planetaspect, key) => (
                                  <div className='rashi-div-sub' key={key}>
                                    {
                                      Planetaspect?.IsWithRaKe ?
                                        (<div className='sub-div-rake'><span>{Planetaspect?.Aspect}° ↠ {Planetaspect?.Planet}</span><span>⦿</span></div>) :
                                        <div className='sub-div3'>{Planetaspect?.Aspect}° ↠ {Planetaspect?.Planet}</div>
                                    }
                                    <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                  </div>
                                ))} </div> : ""
                              }
                            </>)

                            )}
                          </> : <></>}
                        </div> */}
                      </div>

                    </>
                  )
                  )}
                </div>
              </div>
            </div>
          </>

        )
        )}
      </div>
      {open && (
        <EventModel open={open} handleAddClose={handleAddClose} headerTitle={selectedTitle} displayData={selectedEvent} />
      )}
    </>
  )
}

export default House
