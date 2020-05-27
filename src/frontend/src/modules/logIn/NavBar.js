import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CoordRoute from './CoordRoute.js'
import AdminRoute from './AdminRoute.js'
import adminAddSite from '../admin/adminAddSite'
import adminHomepage from '../admin/adminHomepage'
import adminViewSite from '../admin/adminViewSite'
import adminManageSite from '../admin/adminManageSite'

import siteOverview from '../coords/siteOverview'
import detailView from '../coords/detailView'
import siteAddCase from '../coords/siteAddCase'
import notFound from './NotFound.js'

import Login from './index.js'

const NavBar = () => {
  return (
    <div className="auth0button">
      {(
        <span>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component = {Login} type = "login"/>
              <AdminRoute exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
              <AdminRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
              <AdminRoute exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
              <AdminRoute exact path="/admin/manage-site" component = {adminManageSite} type = "adminmanagesite"/>
              <CoordRoute exact path="/site" component = {siteOverview} type = "siteView"/>
              <CoordRoute exact path="/site/edit-case" component = {siteAddCase} type = "siteAddCase"/>
              <CoordRoute exact path="/site/site-summary" component = {adminViewSite} type = "adminviewsite"/>
              <CoordRoute exact path="/site/case-view" component = {detailView} type = "detailView"/>
              <CoordRoute exact path="/site/add-case" component = {siteAddCase} type = "siteAddCase"/>
              <Route path="*" component = {notFound} type = "404" />
            </Switch>
          </BrowserRouter>
        </span>
      )}
    </div>
  )
}

export default NavBar
