// Next Imports
'use client'
import { useAuth } from '@/@core/contexts/authContext';
import Preview from '@/views/apps/kundli/preview/page'
// import { useRouter } from 'next/navigation'
import { useRouter } from 'next/router';



// Component Imports

// Data Imports
// import { getInvoiceData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
} */
const PreviewPage = async ({ params }) => {
  // Vars
  const { kundliData } = useAuth()

  return <Preview kundliData={kundliData} id={1} />
}

export default PreviewPage
