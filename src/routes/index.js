import React from 'react';
import { Switch, Route } from 'react-router-dom';
import path from './path';
// Components
import LeftSidebar from '../layouts/LeftSidebar';
import DashBoard from '../components/feature/DashBoard';

function Routes() {
  return (
    <Switch>
        <Route path={path.dashboardPath}>
          <LeftSidebar/>
          <DashBoard/>
        </Route>
        <Route path={path.defaultPath} exact>
          <LeftSidebar/>
          <DashBoard/>
        </Route>
    </Switch>
  );
}

export default Routes;