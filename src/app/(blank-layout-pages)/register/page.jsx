import { getServerMode } from '@/@core/utils/serverHelpers'
import RegisterPage from '@/views/Register'

const Register = () => {
  const mode = getServerMode()
  return  <RegisterPage mode={mode} />
}

export default Register
