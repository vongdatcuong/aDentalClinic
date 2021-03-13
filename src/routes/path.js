const defaultPath = '/';

// Main Path
const dashboardPath = '/dashboard';
const patientPath = '/patientPath';
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
const authentication="/authentication";
const document="/document";
const drugPath="/drug";
const portalPath="/portal";
const toothChartPath = '/patient/toothChart';  // TODO: sửa thành đường dẫn động với param là patient ID (/patient?id=0/toothChart)
const patientProfilePath = '/patient/profile';
const patientReportPath = '/patient/report';

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
    authentication,
    document,
    toothChartPath,
    patientProfilePath,
    patientReportPath,
    drugPath,
    portalPath,
    
}

export default path;