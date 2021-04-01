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
const toothChartPath = '/patient/toothChart';  // TODO: sửa thành đường dẫn động với param là patient ID (/patient?patientID=0/toothChart)
const patientProfilePath = '/patient/profile';
const patientNotePath = '/patient/note';
const patientXRayImagesPath = '/patient/xRayImages';
const patientAddXRayImagesPath = '/patient/xRayImages/add'; // param: xray layer
const patientViewXRayImagesPath = '/patient/xRayImages/view'; // param: xray layer, image id
const patientImagesPath = '/patient/images';
const toothOverviewInfoPath = '/patient/toothChart/toothOverviewInfo';  // TODO: sửa thành đường dẫn với param là tooth ID (/patient?id=0/toothChart/toothOverviewInfo?toothID=0)

const path = {
    defaultPath,
    dashboardPath,
    patientPath,
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
    patientNotePath,
    patientXRayImagesPath,
    patientAddXRayImagesPath,
    patientViewXRayImagesPath,
    patientImagesPath,
    toothOverviewInfoPath,
    drugPath,
    portalPath,
    managementsPath,
    managementsWithManagementPath,
    //insert
    insertPersonPath,
    
}

export default path;