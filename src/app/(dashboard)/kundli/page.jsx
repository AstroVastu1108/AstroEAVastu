import Breadcrumb from '@/components/common/BreadCrumb'
import CustomerForm from '@/views/customerForm'

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
