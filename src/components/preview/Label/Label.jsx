'use client'
// import style
import "./Label.css"
const Label = ({ LabelTextArr }) => {

  return (
    <div className='flex flex-col pe-2 '>
      {LabelTextArr.map((e) =>
        (<span key={e} className='text-label'>{e}</span>)
      )}
    </div>

  )
}

export default Label
