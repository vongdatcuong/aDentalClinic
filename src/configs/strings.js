
const appointment = "Appointment";
const patient = "Patient";
const report = "Report";
const documents = "Documents";
const management = "Management";
const settings = "Settings";
const notifications = "Notifications";
const removeNotification = "Remove Notification";
const noNotificationToDisplay = "No notifications to display yet";
const appointmentHolder = "Appointment holder";
const todayAppointment = "Today's Appoinment";
const goBack = "Go back";
//treatment menu
const toothChart = "Tooth chart";
const patientProfile = "Patient profile";
const xRayImages = "X-Ray Images";
const images = "Images";

const search="Search";
//menu bar
const providers="Providers";
const practices="Practices";
const staffs="Staffs";
const procedure="Procedure";
const chairs="Chairs";
const referral="Referral";
const schedule="Schedule";
const authentication="Authentication";
const document="Document";
const templates="Templates";
const drug="Drug";
//provider
const index="#";
const id="ID";
const fullname="Fullname";
const birth="Birth";
const gender="Gender";
const address="Address";
//procedure
const code="Code";
const fee="Fee";
const ins="INS";
const duration="Duration";
const type="Type";
const abbr="ABBR";
const description="Description";
//authentication
const role="Role";
//practices
const aboutUs="About us";
const aboutUsContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const save="Save";
//chair
const number="Number";
const room="Room";
const provider="Provider";
//schedule
const note="Note";
const date="Date";
const workTime="Work time";
//portal
const portal="Portal";
//drug
const quantity="Quantity";
//table
const rowsPerPage="Rows per page";
// Common
const yes = "Yes";
const no = "No";
const ok = "OK";
const cancel = "Cancel";
const edit = "Edit";
const logout = "Log out";
const login = "Log in";
const chair = "Chair";
const all = "All";
const update = "Update";
const total = "Total";
const busy = "Busy";
const completed = "Completed";
const rejected = "Rejected";
const accept = "Accept";
const reject = "Reject";
const from = "From";
const to = "To";
const apply = "Apply";
const filter = "Filter";
const add = "Add";
const loading = "Loading";

// Messages

    // Success Messages
const updateAccountSuccess = "Update Account Success";
    // Success Messages Log in
const logInSuccessMsg = "Sign in successfully";
    // Error Messages
const updateAccountFail = "Update Account Fail";
const fullNameErrMsg = "Full name must contain at least 3 to 30 characters";
const emailErrMsg = "Email must follow the format abc@xyz.com/net/vn";
const phoneErrMsg = "Phone must contain at least 10 to 15 number";
const addressErrMsg = "Address must contain at least 5 to 300 characters";
const passwordErrMsg = "Password must contain at least 6 to 100 characters";
const oldPwdNotMatchErrMsg = "The entered password is incorrect";
const confirmPwdNotMatchErrMsg = "Confirm password does not match with new password";
const newPwdMatchOldPwd = "The new password is identical to old password";
const dateRangeInvalid = "Range of date is invalid";
    // Error Messages Login
const usernameErrMsg = "Username must contain at least 1 to 30 characters";
const logInFailMsg = "Sign in fail";
const refreshTokenFailMsg = "Refresh token fail";
    // Error Messages Appointment
const loadAppointmentFailMsg = "Loading appointments fail !!!";
    // Confirm Messages

// Context Actions
const setTheme = "Set-Theme";
const setLoading = "Set-Loading";

// Login page
const loginYourAccount = "<strong>Login</strong> your account";
const username = "Username";
const password = "Password";
const continueLogin = "Continue"; // "continue" in not valid name
const forgotPassword = "Forgot password?";
const dontHaveAccount = "Don't have an account? Sign Up"
const copyrightBy = "Copyright by";

// Patient Profile page
const treatmentPlan = "Treatment plan";
const history = "History";
const oralHealth = "Oral Health";
const medicalIssues = "Medical Issues";
const noTreatmentsPending = "Currently there are no treatments pending";
const addRecord = "Add record";
const plaqueIndex = "Plaque index";
const bleedingIndex = "Bleeding index";
const halitosis = "Halitosis";
// Tooth chart page
const overView = "Overview";
const quickSelect = "Quickselect";
const missing = "Missing";
const veneer = "Veneer";
const pontics = "Pontics";
const crown = "Crown";
const endoTests = "Endo tests";


// Report
const payment = "Payment";
const appointments = "Appointments";
const procedures = "Procedures";
const tasks = "Tasks";
const invoices = "Invoices";
const bookings = "Bookings";
const finances = "Finances";
const workHour = "Work hour";
const newPatient = "New patient";

// Settings
const general = "General";
const account = "Account";
const termPolicy = "Term & Policy";
const location = "Location";
const language = "Language";
const english = "English";
const vietnamese = "Vietnamese";
const theme = "Theme";
const light = "Light";
const dark = "Dark";
const termPolicyFullText = "Term Policy Full Text";
const notifyStaffMessage = "Notify when a STAFF sends you a message";
const notifyPatientMessage = "Notify when a PATIENT sends you a message";
const notifyHavingMeeting = "Notify when a you're having a MEETING";
const fullName = "Full Name";
const email =  "Email";
const phone = "Phone";
const oldPassword = "Old Password";
const newPassword = "New Password";
const confirmPassword = "Confirm Password";

// Date
const defaultTimeFormat = "HH:mm";
const chartDateFormat = "DD/MM";
const apiDateFormat = "YYYY-MM-DD";

// Unit
const hours = "hours"
const percent = "percent";
const hourShort = "Hour Short";
const patients = "Patients";

// Currency
const CURRENCY = "CURRENCY";
const CURRENCY_CHART = "CURRENCY CHART";

export default {
    appointment,
    patient,
    report,
    documents,
    management,
    settings,
    notifications,
    removeNotification,
    noNotificationToDisplay,
    appointmentHolder,
    todayAppointment,
    goBack,
    //treatment menu
    toothChart,
    patientProfile,
    xRayImages,
    images,
    // Common
    yes,
    no,
    ok,
    cancel,
    edit,
    login,
    logout,
    chair,
    all,
    update,
    total,
    busy,
    completed,
    rejected,
    accept,
    reject,
    from,
    to,
    apply,
    filter,
    add,
    loading,
    // Messages
    // Success Messages
    updateAccountSuccess,
    // Success Messages Log in
    logInSuccessMsg,
    // Error Messages
    updateAccountFail,
    fullNameErrMsg,
    emailErrMsg,
    phoneErrMsg,
    addressErrMsg,
    passwordErrMsg,
    oldPwdNotMatchErrMsg,
    confirmPwdNotMatchErrMsg,
    newPwdMatchOldPwd,
    dateRangeInvalid,
    // Error Messages Login
    usernameErrMsg,
    logInFailMsg,
    refreshTokenFailMsg,
    // Error Messages Appointment
    loadAppointmentFailMsg,
    // Confirm Messages
    // Context Actions
    setTheme,
    setLoading,
    // Login page
    loginYourAccount,
    username,
    password,
    continueLogin,
    forgotPassword,
    dontHaveAccount,
    copyrightBy,
    // Patient Profile page
    treatmentPlan,
    history,
    oralHealth,
    medicalIssues,
    noTreatmentsPending,
    addRecord,
    plaqueIndex,
    bleedingIndex,
    halitosis,
    // Tooth chart page
    overView,
    quickSelect,
    missing,
    veneer,
    pontics,
    crown,
    endoTests,
    // Management
    providers,
    staffs,
    practices,
    document,
    authentication,
    referral,
    procedure,
    chairs,
    schedule,
    index,
    fullname,
    id,
    birth,
    gender,
    address,
    search,
    code,
    fee,
    ins,
    duration,
    type,
    abbr,
    description,
    // Settings
    general,
    account,
    termPolicy,
    location,
    language,
    english,
    vietnamese,
    theme,
    light,
    dark,
    termPolicyFullText,
    notifyStaffMessage,
    notifyPatientMessage,
    notifyHavingMeeting,
    fullName,
    email,
    phone,
    oldPassword,
    newPassword,
    confirmPassword,
    // Report
    payment,
    appointments,
    procedures,
    tasks,
    invoices,
    bookings,
    finances,
    workHour,
    newPatient,
    // Date
    defaultTimeFormat,
    chartDateFormat,
    apiDateFormat,
    // Unit
    hours,
    percent,
    hourShort,
    patients,
    // Currency
    CURRENCY,
    CURRENCY_CHART,
    // ???? 
    templates,
    drug,
    role,
    number,
    room,
    provider,
    portal,
    date,
    workTime,
    note,
    quantity,
    rowsPerPage,
    aboutUs,
    aboutUsContent,
    save,
};