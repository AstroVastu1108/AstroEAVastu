import React from 'react'

function House({ houseArr }) {
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
                <div className='house-body-Div1'>hello</div>
                <div className='house-body-Div2'>
                  {e?.RashiDetails.map(rashi =>
                  (
                    <>
                      <div className='rahi-Div'>
                        <div className='rahi-Div1'>
                          <div>{rashi?.RashiRoman}. {rashi?.Rashi} {rashi?.Degree} &gt; {rashi?.RashiLord}</div>
                          <div>{rashi?.RashiDescAstro}</div>
                          <div>{rashi?.RashiDescVastu}</div>
                        </div>
                        {rashi?.Planets?.length &&
                          (<div className='rahi-Div2'>{rashi?.Planets.map(Planet =>
                          (
                            <div className='planet-Div'>
                              <div className='planet-Div1'>{Planet?.Planet} &gt; {Planet?.Degree}</div>
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

                        {/* {(rashi?.Planets?.PlanetAspectsZero?.length) &&
                          <div className='rahi-Div3'>
                            <div>
                              <div>hello</div>
                            </div>
                          </div>
                        } */}
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
