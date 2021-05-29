import React from "react";
import { Switch, Route, Redirect , useParams} from "react-router-dom";
import lists from '../configs/lists';
import path from "./path";
import PrivateRoute from './PrivateRoute';
import keysConfig from "../configs/keys"
import AuthorizedRoute from './AuthorizedRoute';

// @material-ui/core Component

// Components
import PageContainer from "../layouts/PageContainer";
import LeftSidebar from "../layouts/LeftSidebar";
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
import StaffDashboard from '../components/feature/Dashboard';
import ProviderDashboard from '../components/feature//Dashboard/ProviderDashBoard';
import LoginPage from '../components/feature/LoginPage';
import Settings from '../components/feature/Settings';
import ToothChartPage from '../components/feature/ToothChartPage';
import PatientProfilePage from '../components/feature/PatientProfilePage';
import Management from "../components/feature/Management";
import PatientNotePage from "../components/feature/PatientNotePage";
import PatientXRayImagesPage from "../components/feature/PatientXRayImagesPage";
import PatientViewXRayImagesPage from "../components/feature/PatientViewXRayImagesPage";
import PatientImagesPage from "../components/feature/PatientImagesPage";
import PatientPrescriptionPage from "../components/feature/PatientPrescriptionPage";
import PatientRecallPage from '../components/feature/PatientRecallPage';
import ToothOverviewInfoPage from "../components/feature/ToothOverviewInfoPage";
import PatientInfoPage from '../components/feature/PatientInfoPage';
import Report from '../components/feature/Report';
import Patients from '../components/feature/Patients';
import InsertPerson from "../components/feature/InsertPerson";
import AddTreatmentPage from '../components/feature/AddTreatmentPage';
import UpdateTreatmentPage from '../components/feature/UpdateTreatmentPage';

function PatientProfile() {
    let { patientID } = useParams();
    return <PatientProfilePage patientID={patientID}/>;
}
function PatientRecall() {
  let { patientID } = useParams();
  return <PatientRecallPage patientID={patientID}/>;
}
function PatientInfo() {
    let { patientID } = useParams();
    return <PatientInfoPage patientID={patientID}/>;
}
function PatientNote() {
    let { patientID } = useParams();
    return <PatientNotePage patientID={patientID}/>;
}
function PatientPrescription() {
  let { patientID } = useParams();
  return <PatientPrescriptionPage patientID={patientID}/>;
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

function AddTreatment() {
    let { patientID } = useParams();
    return <AddTreatmentPage patientID={patientID}/>;
}
function UpdateTreatment() {
    let { patientID, treatmentID } = useParams();
    return <UpdateTreatmentPage patientID={patientID} treatmentID={treatmentID}/>;
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
          <AuthorizedRoute
            components={{
              [lists.staff.staffType.staff]: <StaffDashboard/>,
              [lists.staff.staffType.provider]: <ProviderDashboard/>,
              [lists.staff.staffType.admin]: <StaffDashboard/>
            }}
          />
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
      <PrivateRoute path={path.addTreatmentPath}>
        <PageContainer>
          <AddTreatment />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.updateTreatmentPath}>
        <PageContainer>
          <UpdateTreatment />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientRecallPath}>
        <PageContainer>
          <PatientRecall />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientInfoPath}>
        <PageContainer>
          <PatientInfo />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientNotePath}>
        <PageContainer>
          <PatientNote />
        </PageContainer>
      </PrivateRoute>
      <PrivateRoute path={path.patientPrescriptionPath}>
        <PageContainer>
          <PatientPrescription />
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
