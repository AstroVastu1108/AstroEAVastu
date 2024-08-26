'use client'

import { useEffect, useState } from 'react';
// import Preview from '@/views/apps/kundli/preview/preview';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetKundliIDDataAPI } from '@/app/Server/API/kundliAPI';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import Loader from '@/components/common/Loader/Loader';
import Preview from '@/views/apps/kundli/preview/preview';

const PreviewPage = () => {
  // var
  const searchParams = useSearchParams();
  const [kundliData, SetKundliData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  // Hooks
  useEffect(() => {
    const kidValue = searchParams.get('kid');
    // console.log("Kid : ",kidValue)
    getKundliData(kidValue);

  }, [searchParams]);

  // Func
  const getKundliData = async (kId) => {
    if (kId != "undefined" && kId != null) {
      setLoading(true);
      const res = await GetKundliIDDataAPI(kId);
      setLoading(false);
      if (res.hasError) {
        router.push('/kundlipage')
        return toastDisplayer("error", res.error);
      } else {
        SetKundliData(res?.responseData?.data?.Result)
      }
    } else {
      router.push('/kundlipage')
      return toastDisplayer("error", "Kundli Id not found.");
    }

  }

  return (
    <>
      {loading && <Loader />}

      {kundliData && (<Preview kundliData={kundliData} />)}
    </>);
}

export default PreviewPage;
