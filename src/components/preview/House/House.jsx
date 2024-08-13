import React from 'react'

function House({ houseArr, Symbols }) {
  return (
    <>
      <div className='house-main-Div'>
        {houseArr.map((e, index) =>
        (
          <>

            <div className='house-Div'>
              <div className="house-header">
                <div className='house-header-Div1'>
                  <div className='house-header-text'>House-{(index + 1)}</div>
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
                    <div>{e?.HouseAspectsZero?.map(houseaspect => (
                      <div className='house-div-sub'>
                        <div className='sub-div1'>{houseaspect?.Aspect} ↠ {houseaspect?.Planet}</div>
                        <div>{houseaspect?.PlanetRashiShort} {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                  {e?.HouseAspectsPositive?.length ?
                    <div>{e?.HouseAspectsPositive?.map(houseaspect => (
                      <div className='house-div-sub'>
                        <div className='sub-div2'>{houseaspect?.Aspect} ↠ {houseaspect?.Planet}</div>
                        <div>{houseaspect?.PlanetRashiShort} {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                  {e?.HouseAspectsNegative?.length ?
                    <div>{e?.HouseAspectsNegative?.map(houseaspect => (
                      <div className='house-div-sub'>
                        <div className='sub-div3'>{houseaspect?.Aspect} ↠ {houseaspect?.Planet}</div>
                        <div>{houseaspect?.PlanetRashiShort} {houseaspect?.ScriptFull}</div>
                      </div>
                    ))} </div> : ""
                  }
                </div>
                <div className='house-body-Div2'>
                  {e?.RashiDetails.map(rashi =>
                  (
                    <>
                      <div className='rahi-Div'>
                        <div className='rahi-Div1'>
                          <div className='rashi-Div1-sub1'>{rashi?.RashiRoman}. {rashi?.Rashi} {rashi?.Degree} &gt; {rashi?.RashiLord}</div>
                          <div className='rashi-Div1-sub2'>{rashi?.RashiDescAstro}</div>
                          <div className='rashi-Div1-sub3'>{rashi?.RashiDescVastu}</div>
                        </div>
                        {rashi?.Planets?.length &&
                          (<div className='rahi-Div2'>{rashi?.Planets.map(Planet =>
                          (
                            <div className='planet-Div'>
                              <div className='planet-Div1'>
                                <div>{Planet?.Planet} &gt; {Planet?.Degree} </div>
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
                                <div className="sub-div1"> {Planet?.Nakshatra} / {Planet?.NakshatraPada} 🡐 {Planet?.EnergyField}</div>
                                <div className="sub-div"> {Planet?.PlanetDescAstro} </div>
                                <div className="sub-div"> {Planet?.PlanetDescVastu} </div>
                              </div>
                            </div>
                          )
                          )}</div>)
                        }

                        <div className='rahi-Div3'>
                          {rashi?.Planets?.length ? <>
                            {rashi?.Planets.map(Planet => (<>
                              {Planet?.PlanetAspectsZero?.length ?
                                <div>{Planet?.PlanetAspectsZero?.map(Planetaspect => (
                                  <div className='rashi-div-sub'>
                                    <div className='sub-div1'>{Planetaspect?.Aspect} ↠ {Planetaspect?.Planet}</div>
                                    <div>{Planetaspect?.PlanetRashiShort} {Planetaspect?.ScriptFull}</div>
                                  </div>
                                ))} </div> : ""
                              }
                              {Planet?.PlanetAspectsPositive?.length ?
                                <div >{Planet?.PlanetAspectsPositive?.map(Planetaspect => (
                                  <div className='rashi-div-sub'>
                                    <div className='sub-div2'>{Planetaspect?.Aspect} ↠ {Planetaspect?.Planet}</div>
                                    <div>{Planetaspect?.PlanetRashiShort} {Planetaspect?.ScriptFull}</div>
                                  </div>
                                ))} </div> : ""
                              }
                              {Planet?.PlanetAspectsNegative?.length ?
                                <div>{Planet?.PlanetAspectsNegative?.map(Planetaspect => (
                                  <div className='rashi-div-sub'>
                                    <div className='sub-div3'>{Planetaspect?.Aspect} ↠ {Planetaspect?.Planet}</div>
                                    <div>{Planetaspect?.PlanetRashiShort} {Planetaspect?.ScriptFull}</div>
                                  </div>
                                ))} </div> : ""
                              }
                            </>)

                            )}
                          </> : <></>}
                        </div>
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
