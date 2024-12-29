'use client'
import { GetAllEvent } from '@/app/Server/API/EventAPI'
import { GetKundliIDDataAPI } from '@/app/Server/API/kundliAPI'
import KundaliEVent from '@/views/apps/kundli/preview/EventPage/EventPage'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function EventPage({ id }) {
  // var
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [AllEventData, setAllEventData] = useState()
  const EventData = {
    BirthDetails: {
      KundaliID: '32460E173DDF40A8872274E46EC1657B',
      FirstName: 'KOLKATA',
      MiddleName: '',
      LastName: 'KUNDALI',
      Gender: 'Male',
      BirthDate: '18-12-2024',
      BirthTime: '182414',
      CountryCode: 'IN',
      Country: 'India',
      City: 'Kolkata, West Bengal',
      CityID: 1275004,
      Latitude: 22.56263,
      Longitude: 88.36304,
      Timezone: 'Asia/Kolkata',
      Prakriti: '_________'
    },
    EventList: [
      {
        ClientID: 'A24KAG-DHRURA',
        KundaliID: '32460E173DDF40A8872274E46EC1657B',
        EventID: 'E24ML-BIJC0-EIT92-MCTGB',
        Event: 'Money',
        EventDate: '29-12-2024',
        EventTime: '102854',
        CountryCode: 'IN',
        Country: 'India',
        City: 'Surat, Gujarat',
        CityID: 1255364,
        Latitude: 21.19594,
        Longitude: 72.83023,
        Timezone: 'Asia/Kolkata',
        Remark: '',
        zCDT: '2024-12-29T10:30:59.5478514+05:30'
      },
      {
        ClientID: 'A24KAG-DHRURA',
        KundaliID: '32460E173DDF40A8872274E46EC1657B',
        EventID: 'E24ML-BIJC0-EIT92-MCTGB',
        Event: 'Money',
        EventDate: '29-12-2024',
        EventTime: '102854',
        CountryCode: 'IN',
        Country: 'India',
        City: 'Surat, Gujarat',
        CityID: 1255364,
        Latitude: 21.19594,
        Longitude: 72.83023,
        Timezone: 'Asia/Kolkata',
        Remark: '',
        zCDT: '2024-12-29T10:30:59.5478514+05:30'
      },
      {
        ClientID: 'A24KAG-DHRURA',
        KundaliID: '32460E173DDF40A8872274E46EC1657B',
        EventID: 'E24ML-BIJC0-EIT92-MCTGB',
        Event: 'Money',
        EventDate: '29-12-2024',
        EventTime: '102854',
        CountryCode: 'IN',
        Country: 'India',
        City: 'Surat, Gujarat',
        CityID: 1255364,
        Latitude: 21.19594,
        Longitude: 72.83023,
        Timezone: 'Asia/Kolkata',
        Remark: '',
        zCDT: '2024-12-29T10:30:59.5478514+05:30'
      }
    ]
  }

  // Func
  const getAllEvent = async () => {
    try {
      const response = await GetAllEvent(id)
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = response.responseData
      setAllEventData(result.Result?.EventList)
    } catch (error) {
      // return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  // Hooks
  useEffect(() => {
    getAllEvent()
  }, [])

  return (
    <>
      {/* {loading && <Loader />} */}
      {AllEventData && (
        <>
          <KundaliEVent EventsData={EventData} KID={id} />
        </>
      )}
    </>
  )
}

export default EventPage
