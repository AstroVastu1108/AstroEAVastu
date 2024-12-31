'use client'
import { GetAllEvent } from '@/app/Server/API/EventAPI'
import Loader from '@/components/common/Loader/Loader'
import KundaliEvent from '@/views/apps/kundli/KundaliEvent/KundaliEvent'
import React, { useEffect, useState } from 'react'

function kundaliEvent({ id }) {
  const [AllEventData, setAllEventData] = useState([])
  const [loading, setLoading] = useState(false);
  const getAllEvent = async kid => {
    try {
      setLoading(true);
      const response = await GetAllEvent(kid);
      setLoading(false);
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = response.responseData
      setAllEventData(result.Result)
    } catch (error) {
      // return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  // Hooks
  useEffect(() => {
    getAllEvent(id)
  }, [])

  return (
    <>
    {loading && <Loader />}
    {AllEventData && AllEventData && <KundaliEvent EventsData={AllEventData} KID={id} getAllEvent={getAllEvent} />}</>
  )
}

export default kundaliEvent
