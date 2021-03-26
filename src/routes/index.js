import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import path from "./path";
import PrivateRoute from './PrivateRoute';

// @material-ui/core Component

// Components
import PageContainer from "../layouts/PageContainer";
import LeftSidebar from "../layouts/LeftSidebar";
import RightSidebar from "../layouts/RightSidebar";
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
import MenuBar from "../layouts/MenuBar";
import Management from "../components/feature/Management";
import PatientNotePage from "../components/feature/PatientNotePage";
import PatientXRayImagesPage from "../components/feature/PatientXRayImagesPage";
import PatientImagesPage from "../components/feature/PatientImagesPage";
import ToothOverviewInfoPage from "../components/feature/ToothOverviewInfoPage";
import Report from '../components/feature/Report';
import Patients from '../components/feature/Patients';
import InsertPerson from "../components/feature/InsertPerson";
function Routes() {
  return (
    <Switch>
      {/*Login*/}
      <Route path={path.loginPath}>
        <PageContainer>
          <LoginPage />
        </PageContainer>
      </Route>
      {/*Dashboard*/}
      <PrivateRoute path={path.dashboardPath}>
        <PageContainer>
          <LeftSidebar />
          <Dashboard />
          <RightSidebar />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.providersPath}>
        <PageContainer>
          <LeftSidebar />
          <Providers />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.practicesPath}>
        <PageContainer>
          <LeftSidebar />
          <Practice />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.portalPath}>
        <PageContainer>
          <LeftSidebar />
          <Portal />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.schedulePath}>
        <PageContainer>
          <LeftSidebar />
          <Schedule />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.staffsPath}>
        <PageContainer>
          <LeftSidebar />
          <Staffs />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.procedurePath}>
        <PageContainer>
          <LeftSidebar />
          <Procedure />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.chairsPath}>
        <PageContainer>
          <LeftSidebar />
          <Chairs />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.referralPath}>
        <PageContainer>
          <LeftSidebar />
          <Referral />
        </PageContainer>
      </PrivateRoute>
      {/*Patients*/}
      <PrivateRoute path={path.patientPath}>
        <PageContainer>
          <LeftSidebar/>
          <Patients/>
        </PageContainer>
      </PrivateRoute>
      {/*Report*/}
      <PrivateRoute path={path.reportPath}>
        <PageContainer>
          <LeftSidebar/>
          <Report/>
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.authenticationPath}>
        <PageContainer>
          <LeftSidebar />
          <Authentication />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.drugPath}>
        <PageContainer>
          <LeftSidebar />
          <Drug />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.toothChartPath} exact>
        <PageContainer>
          <TreatmentMenu />
          <ToothChartPage />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientProfilePath}>
        <PageContainer>
          <TreatmentMenu />
          <PatientProfilePage />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientNotePath}>
        <PageContainer>
          <TreatmentMenu />
          <PatientNotePage />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientXRayImagesPath}>
        <PageContainer>
          <TreatmentMenu />
          <PatientXRayImagesPage />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientImagesPath}>
        <PageContainer>
          <TreatmentMenu />
          <PatientImagesPage />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.toothOverviewInfoPath}>
        <PageContainer>
          <TreatmentMenu />
          <ToothOverviewInfoPage />
        </PageContainer>
      </PrivateRoute>
        {/*Setting With Section*/}
        <PrivateRoute path={path.settingsWithSectionPath}>
          <PageContainer>
            <LeftSidebar/>
            <Settings/>
          </PageContainer>
        </PrivateRoute>
        {/*Setting*/}
        <PrivateRoute path={path.settingsPath} exact>
          <PageContainer>
            <LeftSidebar/>
            <Settings/>
          </PageContainer>
        </PrivateRoute>
        {/*Default*/}
        <PrivateRoute path={path.defaultPath} exact>
          <Redirect to={path.dashboardPath}/>
        </PrivateRoute>

        {/*Insert person*/}
        <PrivateRoute path={path.insertPersonPath} exact>
          <PageContainer>
            <LeftSidebar/>
            <InsertPerson/>
          </PageContainer>
        </PrivateRoute>
         {/*Managements With management*/}
         <PrivateRoute path={path.managementsWithManagementPath}>
          <PageContainer>
            <LeftSidebar/>
            <Management/>
          </PageContainer>
        </PrivateRoute>
        {/*Managements*/}
        <PrivateRoute path={path.managementsPath} exact>
          <PageContainer>
            <LeftSidebar/>
            <Management/>
          </PageContainer>
        </PrivateRoute>
    </Switch>
  );
}

export default Routes;
