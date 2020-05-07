import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa.js'
import { useCookies } from 'react-cookie'

const CoordRoute = ({ component: Component, path, ...rest }) => {
  const { roles, setRoles, user, loading, isAuthenticated, loginWithRedirect, getTokenSilently } = useAuth0()
  const [setCookie] = useCookies()

  useEffect(() => {
    if (loading) {
      return
    }
    if (isAuthenticated) {
      setRoles(user['https://jeanne-geiger-api//roles'])
      getTokenSilently().then((token) => {
        setCookie('token', token, { path: '/' })
      })
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      })
    }
    fn()
  }, [getTokenSilently, setCookie, setRoles, user, loading, isAuthenticated, loginWithRedirect, path, roles])

  const render = props =>
    (loading ? null : !roles ? null : (isAuthenticated && roles.includes('Coordinator')
      ? <Component {...props} /> : <Redirect to='/'/>))
  return <Route path={path} render={render} {...rest} />
}

export default CoordRoute