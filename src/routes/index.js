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

function Routes() {
  return (
    <Switch>
        <Route path={path.dashboardPath}>
          <PageContainer>
            <LeftSidebar/>
            <Dashboard/>
            <RightSidebar/>
          </PageContainer>
        </Route>
        <Route path={path.defaultPath} exact>
          <Redirect to={path.dashboardPath}/>
        </Route>
    </Switch>
  );
}

export default Routes;