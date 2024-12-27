'use client'
import { GetKundliIDDataAPI } from '@/app/Server/API/kundliAPI';
import KundaliEVent from '@/views/apps/kundli/preview/EventPage/EventPage';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function EventPage({id}) {
   // var
   const searchParams = useSearchParams();
   const [kundliData, SetKundliData] = useState(null);
   const [loading, setLoading] = useState(false);
   const router = useRouter()

   // Hooks
   useEffect(() => {
     getKundliData(id);
   }, [searchParams]);

   // Func
   const getKundliData = async (kId) => {
     if (kId != "undefined" && kId != null) {
       setLoading(true);
       const res = await GetKundliIDDataAPI(kId);
       setLoading(false);
       if (res.hasError) {
        //  router.push('/kundali-list')
         return toastDisplayer("error", res.error);
       } else {
         SetKundliData(res?.responseData?.data?.Result)
       }
     } else {
      //  router.push('/kundali-list')
       return toastDisplayer("error", "Kundli Id not found.");
     }

   }

   return (
     <>
       {/* {loading && <Loader />} */}

       {kundliData && (<KundaliEVent kundliData={kundliData} setKundliData={SetKundliData} />)}
     </>);
}

export default EventPage
