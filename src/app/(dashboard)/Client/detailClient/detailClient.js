'use client'
import DetailClientData from '@/views/apps/clients/detailClient/detailClient'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function DetailClient({id}) {  
  // const searchParams = useSearchParams();
  // const cid = searchParams.get('cid');
  return (
    <DetailClientData cid={id}/>
  )
}

export default DetailClient