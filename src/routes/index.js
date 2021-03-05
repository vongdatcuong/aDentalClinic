import React from 'react';
import { Switch, Route } from 'react-router-dom';
import path from './path';

// @material-ui/core Component
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import PageContainer from '../layouts/PageContainer';
import LeftSidebar from '../layouts/LeftSidebar';
import RightSidebar from '../layouts/RightSidebar';
import TreatmentMenu from '../layouts/TreatmentMenu';
import DashBoard from '../components/feature/DashBoard';
import LoginPage from '../components/feature/LoginPage';
import ToothChartPage from '../components/feature/ToothChartPage';
import PatientDashboardPage from '../components/feature/PatientDashboardPage';
import PatientReportPage from '../components/feature/PatientReportPage';

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

        <Route path={path.loginPath}>
          <PageContainer>
            <LoginPage/>
          </PageContainer>
        </Route>
        <Route path={path.toothChartPath}>
          <PageContainer>
            <TreatmentMenu/>
            <ToothChartPage/>
          </PageContainer>
        </Route>
        <Route path={path.patientDashboardPath}>
          <PageContainer>
            <TreatmentMenu/>
            <PatientDashboardPage/>
          </PageContainer>
        </Route>
        <Route path={path.patientReportPath}>
          <PageContainer>
            <TreatmentMenu/>
            <PatientReportPage/>
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