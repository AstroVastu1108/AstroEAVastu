'use client'
import { IconButton } from "@mui/material"
// import style
import "./InfoTable.css"
import { useState } from "react"
import PrakritiPopUp from "./PrakritiPopUp"
const InfoTable = ({ InfoTableTextArr, isPrintDiv}) => {


  return (
    <div className='flex flex-col pe-2 '>
      <table>
        <tbody>
          {InfoTableTextArr.map((details, index) => (
            <tr key={index}>
              <td className="text-label font-ea-sb">{details.label}</td>
              <td className="text-Value">{details.value}</td>
              {/* {details.label == "Prakriti" && !isPrintDiv ? <td className="text-Value">{details.value}
                <IconButton onClick={handleIsPraOpen}>
                  <i
                    className={'tabler-arrow-up-right bg-primary'}
                  />
                </IconButton>
              </td> : <td className="text-Value">{details.value}</td>} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable
