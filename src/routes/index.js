import React from "react";
import { Switch, Route, Redirect , useParams} from "react-router-dom";
import path from "./path";
import PrivateRoute from './PrivateRoute';
import keysConfig from "../configs/keys"
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
import Dashboard from '../components/feature/Dashboard';
import LoginPage from '../components/feature/LoginPage';
import Settings from '../components/feature/Settings';
import ToothChartPage from '../components/feature/ToothChartPage';
import PatientProfilePage from '../components/feature/PatientProfilePage';
import MenuBar from "../layouts/MenuBar";
import Management from "../components/feature/Management";
import PatientNotePage from "../components/feature/PatientNotePage";
import PatientXRayImagesPage from "../components/feature/PatientXRayImagesPage";
import PatientAddXRayImagesPage from "../components/feature/PatientAddXRayImagesPage";
import PatientViewXRayImagesPage from "../components/feature/PatientViewXRayImagesPage";
import PatientImagesPage from "../components/feature/PatientImagesPage";
import ToothOverviewInfoPage from "../components/feature/ToothOverviewInfoPage";
import Report from '../components/feature/Report';
import Patients from '../components/feature/Patients';
import InsertPerson from "../components/feature/InsertPerson";
import { keys } from "@material-ui/core/styles/createBreakpoints";

function PatientProfile() {
    let { patientID } = useParams();
    return <PatientProfilePage patientID={patientID}/>;
}
function PatientNote() {
    let { patientID } = useParams();
    return <PatientNotePage patientID={patientID}/>;
}

function PatientXRayImages() {
    let { patientID } = useParams();
    return <PatientXRayImagesPage patientID={patientID}/>;
}

function PatientAddXRayImages() {
    let { patientID, MouthID } = useParams();
    return (
      <PatientViewXRayImagesPage
        patientID={patientID}
        MouthID={MouthID}
        mode={keysConfig.MODE.MODE_ADD}
      />
    );
}

function PatientViewXRayImages() {
    let { patientID, MouthID } = useParams();
    return (
      <PatientViewXRayImagesPage
        patientID={patientID}
        MouthID={MouthID}
        mode={keysConfig.MODE.MODE_VIEW}
      />
    );
}

function PatientImages() {
    let { patientID } = useParams();
    return <PatientImagesPage patientID={patientID}/>;
}

function ToothOverviewInfo() {
    let { patientID } = useParams();
    return <ToothOverviewInfoPage patientID={patientID}/>;
}

function ToothChart() {
    let { patientID } = useParams();
    return <ToothChartPage patientID={patientID}/>;
}


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
          <ToothChart />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientProfilePath}>
        <PageContainer>
          <PatientProfile />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientNotePath}>
        <PageContainer>
          <PatientNote />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientXRayImagesPath} exact>
        <PageContainer>
          <PatientXRayImages />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientAddXRayImagesPath}>
        <PageContainer>
          <PatientAddXRayImages />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientViewXRayImagesPath}>
        <PageContainer>
          <PatientViewXRayImages />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientImagesPath}>
        <PageContainer>
          <PatientImages />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.toothOverviewInfoPath}>
        <PageContainer>
          <ToothOverviewInfo />
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
