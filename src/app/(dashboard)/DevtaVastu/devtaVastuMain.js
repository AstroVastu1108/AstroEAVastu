// Next Imports
'use client'
import { useEffect, useState } from 'react';



// Component Imports
// import Breadcrumb from '@/components/common/BreadCrumb's
import KundliMain from '@/views/apps/kundli/page'

// API Imports
import { GetKundliDataAPI } from '@/app/Server/API/kundliAPI';
import Loader from '@/components/common/Loader/Loader';
import DevtaVastuMain from '@/views/apps/devtaVastu/devtaVastuMain/page';
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';


export default function VastuListingPage() {
  // vars
  const [loading, setLoading] = useState(false);


  return (<>
    {loading && <Loader />}
    <DevtaVastuMain />
  </>)

}
