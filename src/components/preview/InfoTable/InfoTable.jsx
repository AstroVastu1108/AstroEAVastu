'use client'
// import style
import "./InfoTable.css"
const InfoTable = ({ InfoTableTextArr }) => {

  return (
    <div className='flex flex-col pe-2 '>
      <table>
        <tbody>
          {InfoTableTextArr.map((details, index) => (
            <tr key={index}>
              <td className="text-label">{details.label}</td>
              <td className="text-Value">{details.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable
