import { Navigate, Outlet } from 'react-router-dom'
import { appRoutes } from '../../../routes/appRoutes'
import { isTokenExpired } from '../../../utils/isJwtExpired'
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  const token = Cookies.get('token-dmif')

  if (!token || isTokenExpired(token)) {
    Cookies.remove('token-dmif') // remove token from cookie
    return <Navigate to={appRoutes.auth.signIn} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
