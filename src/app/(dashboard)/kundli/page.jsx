import Breadcrumb from '@/components/common/BreadCrumb'
import CustomerForm from '@/views/apps/customerForm'

export default function Page() {
  return (
    <div>
      <Breadcrumb pageName='Kundli page' />
      <div className='flex justify-end'>
        <CustomerForm />
      </div>
    </div>
  )
}
