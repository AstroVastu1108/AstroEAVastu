import React from 'react'

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
      return `${parts[0]}°${parts[1]}''`;
    }
    return desc; // Return the original string if it doesn't match the expected format
  }


  return (
    <>
      <div className='house-main-Div'>
        {houseArr.map((e, index) =>
        (
          <>

            <div className='house-Div' key={index}>
              <div className="house-header">
                <div className='house-header-Div1'>
                  <div className='house-header-text'>House-{(index + 1)}</div>
                  <div>🡒</div>
                  <div>{e?.HouseDescAstro}, {e?.HouseDescVastu}</div>
                </div>
                <div className='house-header-Div2'>
                  <div className='house-header-Div2-sub1'>
                    {e?.Nakshatra} / {e?.NakshatraPada}
                  </div>
                  <div className='house-header-Div2-sub2'>
                    🡐 {e?.EnergyField}
                  </div>
                </div>
              </div>
              <div className="house-body">
                <div className='house-body-Div1'>
                  {e?.HouseAspectsZero?.length ?
                    <div>{e?.HouseAspectsZero?.map((houseaspect, key) => (
                      <div key={key} className='house-div-sub'>
                        {
                          houseaspect?.IsWithRaKe ?
                            (<div className='sub-div-rake'><div>
                              {houseaspect?.Aspect}°
                            </div>
                              <span>↠&nbsp;&nbsp;{houseaspect?.Planet}</span>
                              <span className='ps-1'>⦿</span></div>) :
                            <div className='sub-div1'>
                              <div>{houseaspect?.Aspect}°</div>
                              <span>↠&nbsp;&nbsp;{houseaspect?.Planet}</span>
                            </div>
                        }
                        <div>{houseaspect?.PlanetRashiShort}. {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                  {e?.HouseAspectsPositive?.length ?
                    <div>{e?.HouseAspectsPositive?.map((houseaspect, key) => (
                      <div key={key} className='house-div-sub'>
                        {
                          houseaspect?.IsWithRaKe ?
                            (<div className='sub-div-rake'>
                              <div>
                                {houseaspect?.Aspect}°
                              </div>
                              <span>↠&nbsp;&nbsp;{houseaspect?.Planet}</span>
                              <span className='ps-1'>⦿</span>
                            </div>) : (<div className='sub-div2'>
                              <div>{houseaspect?.Aspect}°</div>
                              <span>↠&nbsp;&nbsp;{houseaspect?.Planet}</span>
                            </div>)
                        }


                        <div>{houseaspect?.PlanetRashiShort}. {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                  {e?.HouseAspectsNegative?.length ?
                    <div>{e?.HouseAspectsNegative?.map((houseaspect, key) => (
                      <div key={key} className='house-div-sub'>
                        {
                          houseaspect?.IsWithRaKe ?
                            (<div className='sub-div-rake'>
                              <div>
                                {houseaspect?.Aspect}°
                              </div>
                              <span>↠&nbsp;&nbsp;{houseaspect?.Planet}</span>
                              <span className='ps-1'>⦿</span>
                            </div>) :
                            <div className='sub-div3'>
                              <div>{houseaspect?.Aspect}°</div>
                              <span>↠&nbsp;&nbsp;{houseaspect?.Planet}</span>
                            </div>
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
                        <div className='rahi-Div1'>
                          <div className='rashi-Div1-sub1'>{rashi?.RashiRoman}. {rashi?.Rashi}<span className='rashiColor'> {rashiSymbols[rashi?.Rashi]} </span>{rashi?.Degree && formatRashiDescAstro(rashi.Degree)} &gt; {rashi?.RashiLord}</div>
                          <div className='rashi-Div1-sub2'>{rashi?.RashiDescAstro}</div>
                          <div className='rashi-Div1-sub3'>{rashi?.RashiDescVastu}</div>
                        </div>
                        {rashi?.Planets?.length &&
                          (<div className='rahi-Div2'>{rashi?.Planets.map((Planet, key) =>
                          (
                            <>
                              <div className='planet-Div' key={key}>
                                <div className='planet-Div-sub'>
                                  <div className={`planet-Div1 item-title-planet-bg-${Planet?.Planet.toLowerCase()}`}>
                                    <div>{Planet?.Planet} &gt; {Planet?.Degree && formatRashiDescAstro(Planet.Degree)} </div>
                                    <div className='planet-Div1-sub'>
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
                                      <span>{Planet?.PL?.Planet}</span>
                                      <span>{Planet?.PL?.ScriptFull}</span>
                                    </div>
                                    <div className="sub-div">
                                      <span>{Planet?.NL?.Planet}</span>
                                      <span>{Planet?.NL?.ScriptFull}</span>
                                    </div>
                                    <div className="sub-div">
                                      <span>{Planet?.SL?.Planet}</span>
                                      <span>{Planet?.SL?.ScriptFull}</span>
                                    </div>
                                  </div>
                                  <div className='planet-Div3'>
                                    <div className="sub-div1"> ✻ {Planet?.Nakshatra} / {Planet?.NakshatraPada} 🡐 {Planet?.EnergyField}</div>
                                    <div className="sub-div"> {Planet?.PlanetDescAstro} </div>
                                    <div className="sub-div"> {Planet?.PlanetDescVastu} </div>
                                  </div>
                                </div>
                                <div className='rahi-Div3'>
                                  {Planet?.PlanetAspectsZero?.length ?
                                    <div>{Planet?.PlanetAspectsZero?.map((Planetaspect, key) => (
                                      <div className='rashi-div-sub' key={key}>
                                        {
                                          Planetaspect?.IsWithRaKe ?
                                            // ()

                                            (
                                              <div className='sub-div-rake'><div>
                                                {Planetaspect?.Aspect}°
                                              </div>
                                                <span>↠&nbsp;&nbsp;{Planetaspect?.Planet}</span>
                                                <span className='ps-1'>⦿</span></div>) :
                                            <div className='sub-div1'>
                                              <div>{Planetaspect?.Aspect}°</div>
                                              <span>↠&nbsp;&nbsp;{Planetaspect?.Planet}</span>
                                            </div>
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
                                            (<div className='sub-div-rake'><div>
                                              {Planetaspect?.Aspect}°
                                            </div>
                                              <span>↠&nbsp;&nbsp;{Planetaspect?.Planet}</span>
                                              <span className='ps-1'>⦿</span></div>) :
                                            <div className='sub-div2'>
                                              <div>{Planetaspect?.Aspect}°</div>
                                              <span>↠&nbsp;&nbsp;{Planetaspect?.Planet}</span>
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
                                            (<div className='sub-div-rake'>
                                              <div>{Planetaspect?.Aspect}°</div>
                                              <span>↠&nbsp;&nbsp;{Planetaspect?.Planet}</span>
                                              <span className='ps-1'>⦿</span></div>) :
                                            <div className='sub-div3'>
                                              <div>{Planetaspect?.Aspect}°</div>
                                              <span>↠&nbsp;&nbsp;{Planetaspect?.Planet}</span>
                                            </div>
                                        }
                                        <div>{Planetaspect?.PlanetRashiShort}. {Planetaspect?.ScriptFull}</div>
                                      </div>
                                    ))} </div> : ""
                                  }
                                </div>
                              </div>
                            </>
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

    </>
  )
}

export default House
