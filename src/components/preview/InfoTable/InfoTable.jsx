'use client'
import { IconButton } from "@mui/material"
// import style
import "./InfoTable.css"
import { useState } from "react"
import PrakritiPopUp from "./PrakritiPopUp"
const InfoTable = ({ InfoTableTextArr, isPrintDiv}) => {


  return (
    <div className='flex flex-col'>
      <table>
        <tbody>
          {InfoTableTextArr.map((details, index) => (
            <tr key={index}>
              <td className="text-label text-nowrap font-ea-sb">{details.label}</td>
              <td className="text-Value text-nowrap">{details.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable
