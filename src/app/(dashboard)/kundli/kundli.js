// Next Imports
'use client'
import { useEffect, useState } from 'react';



// Component Imports
// import Breadcrumb from '@/components/common/BreadCrumb's
import KundliMain from '@/views/apps/kundli/page'

// API Imports
import { GetKundliDataAPI } from '@/app/Server/API/kundliAPI';
import Loader from '@/components/common/Loader/Loader';
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';


export default function KundliPage() {
  // vars
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState([]);

  // func
  const getAllKundli = async () => {
    setLoading(true);
    const res = await GetKundliDataAPI(1000, 1,"");
    setLoading(false);
    if (res.hasError) {
      // return toastDisplayer("error", res.error);
    } else {
      setKundliData(res?.responseData?.data?.Result?.KundaliList);
    }
  }


  // Hooks
  useEffect(() => {
    getAllKundli();
  }, [])

  return (<>
    {loading && <Loader />}
    <KundliMain kundliData={kundliData} />
  </>)

}
