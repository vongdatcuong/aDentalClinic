const defaultPath = '/';

// Main Path
const dashboardPath = '/dashboard';
const patientPath = '/patients';
const reportPath = '/report';
const documentPath = '/document';
const settingsPath = '/settings';
const settingsWithSectionPath = '/settings/:section';
const loginPath = '/login';
const managementsPath='/managements';
const managementsWithManagementPath='/managements/:management';
const patientPathNoS = '/patient';

const providersPath='/providers';
const staffsPath='/staffs';
const practicesPath='/practices';
const referralPath='/referral';
const procedurePath='/procedure';
const chairsPath="/chairs";
const schedulePath="/schedule";
const authenticationPath="/authentication";
//insert
const insertPersonPath="/insertPerson";
//const document="/document";
const drugPath="/drug";
const portalPath="/portal";
const toothChartPath = '/patient/:patientID/toothChart';
const patientProfilePath = '/patient/:patientID/profile';
const patientRecallPath='/patient/:patientID/recall';
const patientPrescriptionPath = '/patient/:patientID/prescription';
const patientNotePath = '/patient/:patientID/note';
const patientXRayImagesPath = '/patient/:patientID/xRayImages';
const patientAddXRayImagesPath = "/patient/:patientID/xRayImages/add/:MouthID"; // TODO: param: xray layer
const patientViewXRayImagesPath = '/patient/:patientID/xRayImages/view/:MouthID'; // TODO: param: xray layer, image id
const patientImagesPath = '/patient/:patientID/images';
const toothOverviewInfoPath = '/patient/:patientID/toothChart/toothOverviewInfo';  // TODO: sửa thành đường dẫn với param là tooth ID (/patient?id=0/toothChart/toothOverviewInfo?toothID=0)
const patientInfoPath = '/patient/:patientID/info';
const profilePath = '/profile';
const addTreatmentPath = '/patient/:patientID/addTreatment';

const path = {
    defaultPath,
    dashboardPath,
    patientPath,
    patientPathNoS,
    reportPath, 
    documentPath,
    settingsPath,
    settingsWithSectionPath,
    loginPath,
    providersPath,
    staffsPath,
    practicesPath,
    referralPath,
    procedurePath,
    chairsPath,
    schedulePath,
    authenticationPath,
    //document,
    toothChartPath,
    patientProfilePath,
    patientRecallPath,
    patientPrescriptionPath,
    patientNotePath,
    patientXRayImagesPath,
    patientAddXRayImagesPath,
    patientViewXRayImagesPath,
    patientImagesPath,
    toothOverviewInfoPath,
    patientInfoPath,
    drugPath,
    portalPath,
    managementsPath,
    managementsWithManagementPath,
    profilePath,
    addTreatmentPath,
    //insert
    insertPersonPath,
    
}

export default path;