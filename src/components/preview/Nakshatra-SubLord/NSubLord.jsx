import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import LoardPlanet from '../LoardPlanet/LoardPlanet'

function NSubLordPopUp({ open, handleNSLordClose, PlaneNSummaryData, LifeEventValue, Symbols }) {
    console.warn("plaet summarydata: ", PlaneNSummaryData)
    return (
        <Dialog open={open} onClose={handleNSLordClose} maxWidth="md" fullWidth>
            <DialogTitle className="PopupHeader text-white p-3">
                <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className='text-primary text-2xl font-ea-sb !pl-3'>
                        Planet Script with Nakshatra Lord & Sub Lord
                    </span>
                    <IconButton
                        aria-label="close"
                        onClick={handleNSLordClose} // Replace with your close handler function
                        sx={{
                            color: 'white',
                        }}
                    >
                        <i className='tabler-x text-primary'></i>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className='p-0'>
                <Box>
                    <div className='main-RahuKetu-Div pt-0'>

                        <div
                            className="Loard-Div sm:grid md:grid-rows-3 md:grid-cols-3 sm:grid-rows-5 sm:grid-cols-2 xs:flex xs:flex-col grid-flow-col gap-4 auto-rows-auto"
                        >
                            {PlaneNSummaryData.length
                                ? PlaneNSummaryData.slice(0, 9).map((element, index) => ( // only display first 9 elements
                                    <div key={index} className=''>
                                        <LoardPlanet LoardData={element} SelectedEventVal={LifeEventValue} symbols={Symbols} />
                                    </div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NSubLordPopUp