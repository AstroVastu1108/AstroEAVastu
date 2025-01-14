// Next Imports
'use client'
import { useEffect, useState } from 'react';



// Component Imports
// import Breadcrumb from '@/components/common/BreadCrumb's

// API Imports
import { GetKundliDataAPI } from '@/app/Server/API/kundliAPI';
import Loader from '@/components/common/Loader/Loader';
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import ClientMain from '@/views/apps/clients';


export default function ClientPage() {
  // vars
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState([]);

  // func
  // const getAllKundli = async () => {
  //   setLoading(true);
  //   const res = await GetKundliDataAPI(1000, 1);
  //   setLoading(false);
  //   if (res.hasError) {
  //     return toastDisplayer("error", res.error);
  //   } else {
  //     setKundliData(res?.responseData?.data?.Result?.KundaliList);
  //   }
  // }


  // Hooks
  // useEffect(() => {
  //   getAllKundli();
  // }, [])

  return (<>
    {loading && <Loader />}
    <ClientMain />
  </>)
}
