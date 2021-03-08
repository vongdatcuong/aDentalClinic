const defaultPath = '/';

// Main Path
const dashboardPath = '/dashboard';
const patientPath = '/patientPath';
const reportPath = '/report';
const documentPath = '/document';
const settingPath = '/setting';
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
const toothChartPath = '/patient/toothChart';  // TODO: sửa thành đường dẫn động với param là patient ID (/patient?id=0/toothChart)
const patientProfilePath = '/patient/profile';
const patientReportPath = '/patient/report';

const path = {
    defaultPath,
    dashboardPath,
    patientPath,
    reportPath, 
    documentPath,
    settingPath,
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
}

export default path;