'use client'

import { useEffect, useState } from 'react';
import Preview from '@/views/apps/kundli/preview/page';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetKundliIDDataAPI } from '@/app/Server/API/kundliAPI';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';

const PreviewPage = () => {
  // var
  const searchParams = useSearchParams();
  const [kundliData, SetKundliData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  // Hooks
  useEffect(() => {
    const kidValue = searchParams.get('kid');
    getKundliData(kidValue);

  }, [searchParams]);

  // Func
  const getKundliData = async (kId) => {
    if (kId != "undefined" && kId != null) {
      setLoading(true);
      const res = await GetKundliIDDataAPI(kId);
      setLoading(false);
      if (res.hasError) {
        router.push('/kundli')
        return toastDisplayer("error", res.error);
      } else {
        SetKundliData(res?.responseData?.data?.Result)
      }
    } else {
      router.push('/kundli')
      return toastDisplayer("error", "Kundli Id not found.");
    }

  }

  return <>{kundliData && (<Preview kundliData={kundliData} />)}</>;
}

export default PreviewPage;
