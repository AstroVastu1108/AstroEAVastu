// import Logo from '@/@core/svg/Logo'
import LogoSM from '@/@core/svg/LogoSm';
import { Divider } from '@mui/material'
import React from 'react'
import { renderToStaticMarkup } from "react-dom/server";

// import MySvg from './../../../../public/images/next.svg';


function RightPrintSection({ printRef1, vastuLayoutData }) {
    const formatDate = originalDate => {
        const date = new Date(originalDate)

        // Format the date and time
        const day = String(date.getDate()).padStart(2, '0') // 2-digit day
        const month = String(date.getMonth() + 1).padStart(2, '0') // 2-digit month
        const year = date.getFullYear() // Full year

        // Format hours and minutes
        let hours = date.getHours()
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12 // Convert 24-hour time to 12-hour format

        // Construct the final string
        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`

        return formattedDate
    }

    const svgString = encodeURIComponent(renderToStaticMarkup(<LogoSM />));
    const backgroundImage = `url("data:image/svg+xml,${svgString}")`;

    return (
        <div ref={printRef1} id='hiddenDiv' className='hidden-print !h-[790px] w-full'>

            <div className='card-content'>
                <div className='pdf-title bg-primary text-white px-1 py-1 ' style={{backgroundColor: '#590a73', color: 'white', padding:"4px 8px"}}>
                    <span className='text-[14px] uppercase font-semibold' style={{fontSize:"16px",fontWeight:"bolder",textTransform:"uppercase"}}>{vastuLayoutData?.ProjectName}</span>
                    <div className='text-[12px] flex justify-between items-center' style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
                        <div className='text-ea-sb uppercase font-semibold' style={{fontSize:"14px",fontWeight:"bolder",textTransform:"uppercase"}}>{vastuLayoutData?.ClientName} </div>
                        <div className='text-[10px] ' style={{fontSize:"10px"}}>#{vastuLayoutData?.VPID} </div>
                    </div>
                </div>
                <div className='p-2' style={{padding:"8px"}}>{vastuLayoutData?.Remark}</div>
                <Divider />
                <div className='flex justify-between' style={{display:"flex","justifyContent":"space-between"}}>
                    <div className='w-[33%] ps-2' style={{width:"33%","paddingLeft":"8px"}}>
                        <div className='font-ea-sb uppercase' style={{textTransform:"uppercase"}}>FULL AREA</div>
                        <div>
                            {vastuLayoutData?.TotalArea} {vastuLayoutData?.TotalAreaUnit}
                        </div>
                    </div>
                    <div className='border-l w-[33%] ps-2' style={{borderLeft:"1px solid #000","paddingLeft":"8px"}}>
                        <div className='font-ea-sb uppercase' style={{textTransform:"uppercase"}}>COVERED</div>
                        <div>
                            {vastuLayoutData?.CoveredArea} {vastuLayoutData?.CoveredAreaUnit}
                        </div>
                    </div>
                    <div className='border-l w-[33%] ps-2' style={{borderLeft:"1px solid #000","paddingLeft":"8px"}}>
                        <div className='font-ea-sb uppercase' style={{textTransform:"uppercase"}}>OPEN</div>
                        <div>
                            {vastuLayoutData?.OpenArea} {vastuLayoutData?.OpenAreaUnit}
                        </div>
                    </div>
                </div>
                <Divider />
                <div className=''>Audit Date # {formatDate(vastuLayoutData?.AuditDate)}</div>
                <div>
                    <div className='mt-2 font-ea-sb text-primary' style={{marginTop:"8px"}}>Astro Vastu Remedies / Suggestions:</div>
                    <div>
                        The positioning of the Toilet WC and Main Door entry is suggested based on Astro Vastu Analysis and
                        Energy Scan Audit.
                    </div>
                </div>
            </div>
            <div className="card-body h-[400px] flex flex-col relative" style={{height:"415px",display:"flex","flexDirection":"column","position":"relative"}}>
                {/* Text at the Top */}
                {/* <div>Hello</div> */}

                {/* Background Image Centered */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[205px]"
                    style={{
                        width: "220px",
                        height: "205px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundImage: backgroundImage,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        zIndex: 1,
                        opacity: 0.1,
                    }}
                    // style={{
                    //     backgroundImage: backgroundImage,
                    //     backgroundSize: "cover",
                    //     backgroundPosition: "center",
                    //     backgroundRepeat: "no-repeat",
                    //     opacity:0.1
                    // }}
                />
            </div>
            <div className='card-footer'>
                <div className='pdf-title flex flex-col bg-primary text-white py-1 items-center justify-center' style={{backgroundColor: '#590a73', color: 'white', padding:"4px 8px"}}>
                    <div className='text-[14px] text-center font-semibold' style={{fontSize:"14px",textAlign:"center",fontWeight:"bold"}}>Elephant AstroVastu Research Center</div>
                    <div className='text-[12px] flex justify-center items-center' style={{fontSize:"12px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div className='text-ea-sb uppercase font-semibold' style={{fontSize:"10px",textTransform:"uppercase",fontWeight:"bold"}}>www.AstroVastu.net | +91 9856 650 650</div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightPrintSection