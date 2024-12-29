'use client'
import { GetAllEvent } from '@/app/Server/API/EventAPI'
import KundaliEvent from '@/views/apps/kundli/KundaliEvent/KundaliEvent'
import React, { useEffect, useState } from 'react'

function kundaliEvent({ id }) {
  const [AllEventData, setAllEventData] = useState([])
  const getAllEvent = async (kid) => {
    try {
      const response = await GetAllEvent(kid)
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = response.responseData
      console.log(result.Result?.EventList)
      // EventData.EventList = result.Result?.EventList
      setAllEventData(result.Result)
    } catch (error) {
      // return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  // Hooks
  useEffect(() => {
    getAllEvent(id)
  }, [])
  // return <KundaliEvent EventsData={EventData} KID={id} />;
  return <>{AllEventData && AllEventData && <KundaliEvent EventsData={AllEventData} KID={id} getAllEvent={getAllEvent} />}</>
}

export default kundaliEvent
