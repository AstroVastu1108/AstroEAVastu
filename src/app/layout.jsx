// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { AuthProvider, useAuth } from '@/@core/contexts/authContext';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux-store/ReduxProvider';
import AppReactToastify from '@/components/AppReactToastify/AppReactToastify';
export const metadata = {
  title: 'AstroVastu',
  description:
    'AstroVastu'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col font-ea-n'>
        <AuthProvider>
          {/* <ToastContainer direction={direction} hideProgressBar /> */}
          <AppReactToastify direction={direction} hideProgressBar />
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
