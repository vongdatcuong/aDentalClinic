// Appointment
const defaultCellDuration = 30;
const defaultStartDayHour = 7;
const defaultEndDayHour = 18;
const maxAppointmentDuration = 240;

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
}

// Autocomplete
const autocomplete = {
    limit: 10
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