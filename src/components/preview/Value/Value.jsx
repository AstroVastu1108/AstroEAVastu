'use client'
// import style
import "./Value.css"
const Value = ({ ValueTextArr }) => {

  return (
    <div className='flex flex-col pe-2 '>
      {ValueTextArr.map((e) =>
        (<span key={e} className='text-Value'>{e}</span>)
      )}
    </div>
  )
}

export default Value
