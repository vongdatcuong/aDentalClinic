// Appointment
const defaultCellDuration = 30;
const defaultStartDayHour = "07:00";
const defaultEndDayHour = "18:00";
const maxAppointmentDuration = 240;
const loadAppointReqIntervalTime = 1000 * 60 * 1;

// Toast
const toastTimeout = 5000;
const toastLimit = 10;

// Statistics
const statisDayRangeDefault = 7;

// Table
const defaultRowsPerPage = 10;
const rowsPerPageOption = [5, 10, 25];

// Tooth
const patientMaxTooth = 32;

// API Status code
const apiStatus = {
    success: 200,
    invalid: 400,
    unauthorized: 401,
    notFound: 404,
    exception: 500,
    refreshToken: 402
}

// Autocomplete
const autocomplete = {
    limit: 10,
    infiniteLimit: 100000
}

//Image Mouth
const MOUTH = {
    MAX_WIDTH: 1200,
    MAX_HEIGHT: 600,
}

export default {
    // Appointment
    defaultCellDuration,
    defaultStartDayHour,
    defaultEndDayHour,
    maxAppointmentDuration,
    loadAppointReqIntervalTime,
    // Toast
    toastTimeout,
    toastLimit,
    // Statistics
    statisDayRangeDefault,
    // Table
    defaultRowsPerPage,
    rowsPerPageOption,
    // Tooth
    patientMaxTooth,
    // API Status code
    apiStatus,
    // Autocomplete
    autocomplete,
    MOUTH
}