import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'

const Layout = ({children}) => {
    const location = useLocation()

    const hideHeaderRoutes = ['/signup', '/login', '/'];
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  return (
    <>
    {!shouldHideHeader && <Header/>}
    <div className={!shouldHideHeader ? 'pt-16' : ''}>
      {children}
    </div>
    </>
  )
}

export default Layout
