// Appointment
const defaultCellDuration = 30;
const defaultStartDayHour = 7;
const defaultEndDayHour = 18;

// Toast
const toastTimeout = 5000;
const toastLimit = 10;

// Statistics
const statisDayRangeDefault = 7;

// Table
const defaultRowsPerPage = 10;
const rowsPerPageOption = [5, 10, 25];

// API Status code
const apiStatus = {
    success: 200,
    invalid: 400,
    unauthorized: 401,
    notFound: 404,
    exception: 500,
}

export default {
    // Appointment
    defaultCellDuration,
    defaultStartDayHour,
    defaultEndDayHour,
    // Toast
    toastTimeout,
    toastLimit,
    // Statistics
    statisDayRangeDefault,
    // Table
    defaultRowsPerPage,
    rowsPerPageOption,
    // API Status code
    apiStatus,
}