const defaultPath = '/';

// Main Path
const dashboardPath = '/dashboard';
const patientPath = '/patientPath';
const reportPath = '/report';
const documentPath = '/document';
const settingPath = '/setting';
const loginPath = '/login';
const toothChartPath = '/patient/toothChart';  // TODO: sửa thành đường dẫn động với param là patient ID (/patient?id=0/toothChart)
const patientDashboardPath = '/patient/dashboard';
const patientReportPath = '/patient/report';

const path = {
    defaultPath,
    dashboardPath,
    patientPath,
    reportPath, 
    documentPath,
    settingPath,
    loginPath,
    toothChartPath,
    patientDashboardPath,
    patientReportPath,
}

export default path;