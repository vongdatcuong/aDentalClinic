import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import path from './path';

// @material-ui/core Component

// Components
import PageContainer from '../layouts/PageContainer';
import LeftSidebar from '../layouts/LeftSidebar';
import RightSidebar from '../layouts/RightSidebar';
import Providers from "../components/feature/Providers";
import Staffs from "../components/feature/Staffs";
import Procedure from "../components/feature/Procedure";
import Referral from "../components/feature/Referral";
import Authentication from "../components/feature/Authentication";
import Chairs from "../components/feature/Chair";
import Schedule from "../components/feature/Schedule";
import Portal from "../components/feature/Portal";
import Drug from "../components/feature/Drug";
import Practice from "../components/feature/Practice";
import TreatmentMenu from '../layouts/TreatmentMenu';
import Dashboard from '../components/feature/Dashboard';
import LoginPage from '../components/feature/LoginPage';
import Settings from '../components/feature/Settings';
import ToothChartPage from '../components/feature/ToothChartPage';
import PatientProfilePage from '../components/feature/PatientProfilePage';
import PatientReportPage from '../components/feature/PatientReportPage';

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
        <Route path={path.providersPath}>
          <PageContainer>
            <LeftSidebar/>
            <Providers />
          </PageContainer>
        </Route>
        <Route path={path.practicesPath}>
          <PageContainer>
            <LeftSidebar/>
            <Practice />

          </PageContainer>
            
        </Route>
        <Route path={path.portalPath}>
          <PageContainer>
              <LeftSidebar/>
              <Portal/>
          </PageContainer>
            
            
        </Route>
        <Route path={path.schedulePath}>
          <PageContainer>
              <LeftSidebar/>
              <Schedule/>
          </PageContainer>
            
            
            
        </Route>
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
        <Route path={path.chairsPath}>
          <PageContainer>
              <LeftSidebar/>
              <Chairs/>
          </PageContainer>
            
            
        </Route>
        <Route path={path.referralPath}>
          <PageContainer>
            <LeftSidebar/>
            <Referral/>
          </PageContainer>
            
        </Route>
        
        <Route path={path.authenticationPath}>
          <PageContainer>
            <LeftSidebar/>
            <Authentication/>
          </PageContainer>
           
            
            
        </Route>
        <Route path={path.drugPath}>
          <PageContainer>
            <LeftSidebar/>
            <Drug/>
          </PageContainer>
           
            
            
        </Route>
        
        
        
       
        
        <Route path={path.toothChartPath}>
          <PageContainer>
            <TreatmentMenu/>
            <ToothChartPage/>
          </PageContainer>
        </Route>
        <Route path={path.patientProfilePath}>
          <PageContainer>
            <TreatmentMenu/>
            <PatientProfilePage/>
          </PageContainer>
        </Route>
        <Route path={path.patientReportPath}>
          <PageContainer>
            <TreatmentMenu/>
            <PatientReportPage/>
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