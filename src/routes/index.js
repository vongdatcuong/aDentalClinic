import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import path from './path';

// @material-ui/core Component
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import PageContainer from '../layouts/PageContainer';
import LeftSidebar from '../layouts/LeftSidebar';
import RightSidebar from '../layouts/RightSidebar';
import Dashboard from '../components/feature/Dashboard';
import LoginPage from '../components/feature/LoginPage';
import Settings from '../components/feature/Settings';

function Routes() {
  return (
    <Switch>
        {/*Login*/}
        <Route path={path.loginPath}>
          <PageContainer>
            <LoginPage/>
          </PageContainer>
        </Route>
        {/*Dashboard*/}
        <Route path={path.dashboardPath}>
          <PageContainer>
            <LeftSidebar/>
            <Dashboard/>
            <RightSidebar/>
          </PageContainer>
        </Route>
        {/*Setting With Section*/}
        <Route path={path.settingsWithSectionPath}>
          <PageContainer>
            <LeftSidebar/>
            <Settings/>
          </PageContainer>
        </Route>
        {/*Setting*/}
        <Route path={path.settingsPath} exact>
          <PageContainer>
            <LeftSidebar/>
            <Settings/>
          </PageContainer>
        </Route>
        {/*Default*/}
        <Route path={path.defaultPath} exact>
          <Redirect to={path.dashboardPath}/>
        </Route>
    </Switch>
  );
}

export default Routes;