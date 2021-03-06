import React from 'react';
import { Switch, Route } from 'react-router-dom';
import path from './path';

// @material-ui/core Component
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import PageContainer from '../layouts/PageContainer';
import LeftSidebar from '../layouts/LeftSidebar';
import RightSidebar from '../layouts/RightSidebar';
import DashBoard from '../components/feature/DashBoard';
import LoginPage from '../components/feature/LoginPage';
import Providers from "../components/feature/Providers";
import Staffs from "../components/feature/Staffs";
import Procedure from "../components/feature/Procedure";
import Referral from "../components/feature/Referral";
function Routes() {
  return (
    <Switch>
        <Route path={path.dashboardPath}>
          <PageContainer>
            <LeftSidebar/>
            <DashBoard/>
            <RightSidebar/>
          </PageContainer>
        </Route>

        
        <Route path={path.providersPath}>
          <PageContainer>
            <LeftSidebar/>
            <Providers />
          </PageContainer>
            
            
        </Route>
        {/* <Route path={path.practicesPath}>
            <div>
              Practices
            </div>
            
            
        </Route> */}
        <Route path={path.staffsPath}>
          <PageContainer>
            <LeftSidebar/>
            <Staffs/>
          </PageContainer>

            
        </Route>
        <Route path={path.procedurePath}>
          <PageContainer>
            <LeftSidebar/>
            <Procedure/>
          </PageContainer>
            
        </Route>
        <Route path={path.referralPath}>
          <PageContainer>
            <LeftSidebar/>
            <Referral/>
          </PageContainer>
            
        </Route>
        {/* <Route path={path.chairPath}>
            <div>
              Chair
            </div>
            
            
        </Route> */}
        {/* <Route path={path.schedulePath}>
            <div>
              Schedule
            </div>
            
            
        </Route> */}
        {/* <Route path={path.authenticationPath}>
            <div>
              Authentication
            </div>
            
            
        </Route> */}
        {/* <Route path={path.documentPath}>
            <div>
              Document
            </div>
            
            
        </Route> */}
        
        

        <Route path={path.loginPath}>
          <PageContainer>
            <LoginPage/>
          </PageContainer>
        </Route>
        <Route path={path.defaultPath} exact>
          <PageContainer>
            <LeftSidebar/>
            <DashBoard/>
            <RightSidebar/>
          </PageContainer>
        </Route>
    </Switch>
  );
}

export default Routes;