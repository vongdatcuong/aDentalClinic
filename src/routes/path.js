const defaultPath = '/';

// Main Path
const dashboardPath = '/dashboard';
const patientPath = '/patients';
const reportPath = '/report';
const documentPath = '/document';
const managementPath = '/management';
const settingsPath = '/settings';
const settingsWithSectionPath = '/settings/:section';
const loginPath = '/login';
const providersPath='/providers';
const staffsPath='/staffs';
const practicesPath='/practices';
const referralPath='/referral';
const procedurePath='/procedure';
const chairsPath="/chairs";
const schedulePath="/schedule";
const authenticationPath="/authentication";
//const document="/document";
const drugPath="/drug";
const portalPath="/portal";
const toothChartPath = '/patient/toothChart';  // TODO: sửa thành đường dẫn động với param là patient ID (/patient?id=0/toothChart)
const patientProfilePath = '/patient/profile';
const patientNotePath = '/patient/note';
const patientXRayImagesPath = '/patient/xRayImages';
const patientImagesPath = '/patient/images';

const path = {
    defaultPath,
    dashboardPath,
    patientPath,
    reportPath, 
    documentPath,
    managementPath,
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
    patientImagesPath,
    drugPath,
    portalPath,
    
}

export default path;