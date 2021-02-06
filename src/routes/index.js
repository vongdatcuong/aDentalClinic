import React from 'react';
import { Switch, Route } from 'react-router-dom';
import path from './path';
import DashBoard from '../components/feature/DashBoard';

function Routes() {
  return (
    <Switch>
        <Route path={path.dashBoardPath}>
            <DashBoard/>
        </Route>
        <Route path={path.defaultPath} exact>
            <DashBoard/>
        </Route>
    </Switch>
  );
}

export default Routes;