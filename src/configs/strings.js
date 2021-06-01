
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
const noAppointRequestToDisplay = "No Appointment Requests to display yet";

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
const active="Active";
const inactive="Inactive";
const status="Status";
const read="Read";
//referral
const additionalInfo="Additional information";
const newReferral="New referral";
const existedReferral="Existed referral";
const referredBy="Referred by";
const referredTo="Referred to";
//provider
const index="#";
const id="ID";
const fullname="Fullname";
const birth="Birth";
const gender="Gender";
const address="Address";
const idCard="ID Card";
const publisher="Publisher";
const country="Country";
const city="City";
const postalCode="Postal Code";
const male="Male";
const female="Female";
const insert="Insert";
const insertPerson="Insert Person";
const facebook="Facebook";
const fax="Fax";
const mobilePhone="Mobile phone";
const staffTypeStaff="STAFF";
const staffTypeProvider="PROVIDER";
const userTypePatient="PATIENT";
const displayId="Display Id";
const providerColor="Provider color";
const drugLic="Drug license";
const npi="Npi";
const biography="Biography";
//procedure
const code="Code";
const fee="Fee";
const ins="INS";
const duration="Duration";
const type="Type";
const abbr="ABBR";
const description="Description";
const filepath="Filepath";
const category="Category";
const abbreviation="Abbreviation";
const insuredPercent="Insured percent";
const procedureCode="Procedure code";
const procedureFee="Procedure fee";
const procedureType="Procedure type";
const procedureTime="Procedure time";
const toothSelect="Tooth select";
const toothType="Tooth type";

//authentication
const role="Role";
//practices
const aboutUs="About us";
const aboutUsContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const save="Save";
const organization="Organization";
const hotline="Hotline";
const startTime="Start time";
const endTime="End time";

//chair
const number="Number";
const room="Room";
const provider="Provider";
const order="Order";
const color="Color";
//schedule
const note="Note";
const date="Date";
const workTime="Work time";
//portal
const portal="Portal";
//drug
const quantity="Quantity";
const name="Name";
const refill="Refill";
const dispensed="Dispensed";
//table
const rowsPerPage="Rows per page";
const action="Action";
const profile="Profile";
//template
const template="Template";
const recent="Recent";
const allTemplates="All templates";
const invoice="Invoice";
const resignationLetter="Resignation letter";
const content="Content";
const noteType="Note type";
const templateDefault="DEFAULT";
const templateMedicalAlert="MEDICAL ALERT";
const templateProgress="PROGRESS";
const templateTreatment="TREATMENT";
const medicalAlert="Medical alert";
const progress="Progress";
//patient
const maritalStatus="Marital status";
const notSpecify="NOT_SPECIFY";
const married="MARRIED";
const divorced="DIVORCED";
const single="SINGLE";
const widowed="WIDOWED";
// Common
const yes = "Yes";
const no = "No";
const ok = "OK";
const cancel = "Cancel";
const btnDelete = "Delete";
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
const noOptions = "No options";
const MALE="MALE";
const FEMALE="FEMALE";
const none = "None";
const confirm = "Confirm";
const startDate = "Start Date";
const endDate = "End Date";
const today = "Today";
const nextS = "Next S";
const request = "Request";
const atTime = "At time";
const exportStr = "Export";
const source = "Source";
// Messages

    // Success Messages
const updateAccountSuccess = "Update Account Success";
const updateSuccess = "Update Success";
const insertSuccess = "Insert Success";
const deleteSuccess = "Delete Success";

    // Success Messages Log in
const logInSuccessMsg = "Sign in successfully";
    // Success Messages Appointment
const deleteAppointmentSuccess = "Delete Appointment successfully";
const addAppointmentSuccess = "Add Appointment successfully";
const updateAppointmentSuccess = "Update Appointment successfully";
    // Success Messages Settings
const updateUserProfileSuccess = "Update Profile successfully";
const changePwdSuccess = "Change Password successfully";
    // Error Messages
const errorNoDrug="You can't insert prescription if it don't have drug";
const errorStartEndTime="Time is invalid";
const confirmChangeInReadMode="Cannot change in read mode";
const updateAccountFail = "Update Account Fail";
const updateFail = "Update Fail";
const insertFail = "Insert Fail";
const deleteFail = "Delete Fail";
const fullNameErrMsg = "Full name must contain at least 3 to 30 characters";
const emailErrMsg = "Email must follow the format abc@xyz.com/net/vn";
const phoneErrMsg = "Phone must contain at least 10 to 15 number";
const addressErrMsg = "Address must contain at least 5 to 300 characters";
const passwordErrMsg = "Password must contain at least 6 to 100 characters";
const oldPwdNotMatchErrMsg = "The entered password is incorrect";
const confirmPwdNotMatchErrMsg = "Confirm password does not match with new password";
const newPwdMatchOldPwd = "The new password is identical to old password";
const dateRangeInvalid = "Range of date is invalid";
const errorLoadData="Error when load data";
const errorInput="Please fill out all fields";
const nameErrMsg="Name must contain at least 1 to 30 characters";
    // Error Messages Login
const usernameErrMsg = "Username must contain at least 1 to 30 characters";
const logInFailMsg = "Sign in fail";
const refreshTokenFailMsg = "Refresh token fail";
    // Error Messages Appointment
const loadAppointmentFailMsg = "Loading appointments fail !!!";
const invalidFilterChairMsg = "Invalid Chair Filter";
const firstNameErrMsg = "First name must contain at least 1 to 30 characters";
const lastNameErrMsg = "First name must contain at least 1 to 30 characters";
const firstNameErrMsgShort = "First name validate (Short)";
const lastNameErrMsgShort = "Last name validate (Short)";
const phoneErrMsgShort = "Phone validate (Short)";
const appointProviderErrMsg = "Provider is required";
const appointHolidayErrMsg = "Invalid Date (Holiday)";
const appointTimeErrMsg = "Invalid Time";
const appointDurationErrMsg = "Appointment duration must be between 30 - 240 minutes and multiple of 30";
const loadPatientErrMsg = "Load Patient fail";
const loadRecallErrMsg = "Load Recall fail";
const loadTreatmentErrMsg = "Load Treatment fail";
const loadProcedureCateErrMsg = "Load Procedure Category fail";
const loadProcedureCodeErrMsg = "Load Procedure Code fail";
const loadToothErrMsg = "Load Teeth of Patient fail";
const loadToothSurfaceErrMsg = "Load Surface of Tooth fail";
const appointProcedureErrMsg = "Procedure is required";
const appointToothErrMsg = "Tooth is required";
const appointSurfaceErrMsg = "Surface is required";
const deleteAppointmentErrMsg = "Delete Appointment fail";
const thisIsAHolidayErrMsg = "This is a holiday";
const addAppointmentErrMsg = "Add Appointment fail";
const updateAppointmentErrMsg = "Update Appointment fail";
const nextAvaiDateErrMsg = "Get Next Available Date fail";
const providerNotWorkingErrMsg = "Provider not working in the near future";
const deleteAppointReqErrMsg = "Delete Appointment Request fail";
const patientErrMsg = "Patient is required";
    // Error Messages Settings
const changeLanguageErrMsg = "Change language fail";
const changeThemeErrMsg = "Change theme fail";
const changePwdErrMsg = "Change Password fail";
    // Error Messages Schedule
const loadProviderErrMsg = "Load Providers fail";
const startDateErrMsg = "Start day is required";
const datesErrMsg = "Dates are quired";
const addScheduleErrMsg = "Add Schedule fail";
const updateScheduleErrMsg = "Update Schedule fail";
    // Error Messages Report
const loadStatisticsErrMsg = "Load Report fail";
const loadAppointDocErrMsg = "Load Appointment Document fail";
const loadPatientDocErrMsg = "Load Patient Document fail";
const loadAppointPatientDocErrMsg = "Load Appointment of Patient Document fail";
const assistantErrMsg = "Assistant is required";
const staffErrMsg = "Staff is required";
const referralSourceErrMsg = "Source is required";
    // Error Messages Treatments
const treatmentDateErrMsg = "Treatment date must be in the future";
    // Confirm Messages
const areYouSureWantTo = "Are you sure want to";
const deleteConfirmMessage="Do you want to delete this?";

// Context Actions
const setTheme = "Set-Theme";
const setLoading = "Set-Loading";
const connectSocket = "Connect-socket";
const disconnectSocket = "Disconnect-socket";

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
const addMoreImage = "Add more image";
const layer = "Layer";
const imagesPerPage = "Images per page";
const prescription="Prescription";
const addMoreDrug="Add more drug";
const expired="Expired date";
const agree="Agree";
const info = "Info";
// Tooth chart page
const overView = "Overview";
const quickSelect = "Quickselect";
const missing = "Missing";
const veneer = "Veneer";
const pontics = "Pontics";
const crown = "Crown";
const endoTests = "Endo tests";
const dental = "Dental";
const reset = "Reset";
const pathology = "Pathology";
const restoration = "Restoration";
const endodontic = "Endodontic";
const cold = "Cold";
const percussion = "Percussion";
const palpation = "Palpation";
const heat = "Heat";
const electricity = "Electricity";
const test = "Test";
const existRootCanalTreatment = "Not applicable, Existing Root canal Treatment";
const positive = "Positive";
const uncertain = "Uncertain";
const negative = "Negative";
const notApplicable = "Not applicable";
const clear = "Clear";

// Progress Notes
const addNote = "Add Note";
const updateNote = "Update Note";
const title = "Title";


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

// Appointment
const time = "Time";
const assistant = "Assistant";
const selectPatient = "Select Patient";
const enterNewPatient = "Enter new Patient";
const patientInformation = "Patient information";
const patientID = "Patient ID";
const chart = "Chart";
const firstName = "First name";
const lastName = "Last name";
const mi = "MI";
const patientContact = "Patient Contact";
const homePhone = "Home Phone";
const mobile = "Mobile";
const scheduleAppoint = "Schedule Appointment";
const staging = "Staging";
const reminderNote = "Reminder Note";
const recall = "Recall";
const treatments = "Treatments";
const tooth = "Tooth";
const surface = "Surface";
const noRecall = "No Recall";
const noTreatment = "No Treatment"
const nextAvailable = "Next Available";
const onlyMine = "Only mine";
const nextDateProvider = "Next Available date for default provider";
const appointDate = "Appointment Date";
const appointRequest = "Appointment Request";

//patient recall
const treatment="Treatment";
const interval="Interval";
const recallDate="Recall date";
const patientRecall="Patient recall";

// Tooth
const selectOneTooth = "S";
const selectMultiTooth = "M";
const selectNoneTooth = "N";

// Date
const defaultTimeFormat = "HH:mm";
const chartDateFormat = "DD/MM";
const apiDateFormat = "YYYY-MM-DD";
const forward = "forward";
const back = "back";
const select = "select";
const unselect = "unselect";
const defaultDateFormat = "DD-MM-YYYY";
const holidayDormat = "DD/MM";
const defaultDateTimeFormat = "DD/MM/YYYY HH:mm";

// Unit
const hours = "hours"
const percent = "percent";
const hourShort = "Hour Short";
const patients = "Patients";
const appointDurationUnit = "AppointDurationU";

// Currency
const CURRENCY = "CURRENCY";
const CURRENCY_CHART = "CURRENCY CHART";
const CURRENCY_PRE = "CURRENCY_PRE";

//images and files
const fileName = "File Name";
const image = "image";

// Schedule
const mode = "Mode";
const monthly = "Monthly";
const weekly = "Weekly";
const auto = "Auto";

// Treatment 
const next = "next";
const finish = "finish";
const allStepsCompleted = "All steps completed - you are finished";
const selectTreatment = "Select Treatment";
const selectTooth = "Select Tooth";
const selectedTooth = "Selected Tooth";
const reviewTreatmentInfo = "Review Treatment Information";
const pleaseSelectTooth = "Please select tooth";
const notSelectMissingTooth = "Cannot select missing tooth";
const notAllowedTooth = "Not allowed to select this tooth";
const notAllowSellectMultipleTooth = "Not allowed to select multiple tooth";

const facial = "Facial";
const lingual = "Lingual";
const mesial = "Mesial";
const distal = "Distal";
const top = "Top";
const root = "Root";

// Report
const patientsShort = "Patients Short";
const viewPatientDocument = "View patient document";
const viewAppointDocument = "View appointments document";
const viewAppointOfPatientDocument = "View appointments of patient document";
const noPatientLoadAllAppoints = "If no patient is provided, all appointments will be loaded";

// Transaction
const transaction = "Transaction";
const amount = "Amount";
const paid = "Paid";
const returned = "Return";
const totalAmount = "Total amount";
const noTransactionsPending = "Currently there are no payments pending";

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
    noAppointRequestToDisplay,
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
    btnDelete,
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
    noOptions,
    MALE,
    FEMALE,
    none,
    confirm,
    startDate,
    endDate,
    today,
    nextS,
    request,
    atTime,
    exportStr,
    source,
    // Messages
    // Success Messages
    updateAccountSuccess,
    updateSuccess,
    insertSuccess,
    deleteSuccess,
    // Success Messages Log in
    logInSuccessMsg,
    // Success Messages Appointment
    deleteAppointmentSuccess,
    deleteAppointmentErrMsg,
    addAppointmentSuccess,
    updateAppointmentSuccess,
    deleteAppointReqErrMsg,
    patientErrMsg,
    // Success Messages Settings
    updateUserProfileSuccess,
    changePwdSuccess,
    // Error Messages
    errorNoDrug,
    errorStartEndTime,
    confirmChangeInReadMode,
    updateFail,
    insertFail,
    deleteFail,
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
    errorLoadData,
    errorInput,
    nameErrMsg,
    // Error Messages Login
    usernameErrMsg,
    logInFailMsg,
    refreshTokenFailMsg,
    // Error Messages Appointment
    loadAppointmentFailMsg,
    invalidFilterChairMsg,
    firstNameErrMsg,
    lastNameErrMsg,
    firstNameErrMsgShort,
    lastNameErrMsgShort,
    phoneErrMsgShort,
    appointProviderErrMsg,
    appointHolidayErrMsg,
    appointTimeErrMsg,
    appointDurationErrMsg,
    loadPatientErrMsg,
    loadRecallErrMsg,
    loadTreatmentErrMsg,
    loadProcedureCateErrMsg,
    loadProcedureCodeErrMsg,
    loadToothErrMsg,
    loadToothSurfaceErrMsg,
    appointProcedureErrMsg,
    appointToothErrMsg,
    appointSurfaceErrMsg,
    thisIsAHolidayErrMsg,
    addAppointmentErrMsg,
    updateAppointmentErrMsg,
    changePwdErrMsg,
    nextAvaiDateErrMsg,
    providerNotWorkingErrMsg,
    // Settings Error Messages
    changeLanguageErrMsg,
    changeThemeErrMsg,
    // Error Messages Schedule
    loadProviderErrMsg,
    startDateErrMsg,
    datesErrMsg,
    addScheduleErrMsg,
    updateScheduleErrMsg,
        // Error Messages Report
    loadStatisticsErrMsg,
    loadAppointDocErrMsg,
    loadPatientDocErrMsg,
    loadAppointPatientDocErrMsg,
    assistantErrMsg,
    staffErrMsg,
    referralSourceErrMsg,
    // Error Messages Treatments
    treatmentDateErrMsg,
    // Confirm Messages
    areYouSureWantTo,
    deleteConfirmMessage,
    // Context Actions
    setTheme,
    setLoading,
    connectSocket,
    disconnectSocket,
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
    addMoreImage,
    layer,
    imagesPerPage,
    prescription,
    addMoreDrug,
    expired,
    agree,
    info,
    // Tooth chart page
    overView,
    quickSelect,
    missing,
    veneer,
    pontics,
    crown,
    endoTests,
    dental,
    reset,
    pathology,
    restoration,
    endodontic,
    cold,
    percussion,
    palpation,
    heat,
    electricity,
    test,
    existRootCanalTreatment,
    positive,
    uncertain,
    negative,
    notApplicable,
    clear,
    // Progress Notes
    addNote,
    updateNote,
    title,
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
    name,
    organization,
    hotline,
    startTime,
    endTime,
    idCard,
    publisher,
    country,
    city,
    postalCode,
    male,
    female,
    insert,
    insertPerson,
    active,
    inactive,
    status,
    action,
    profile,
    read,
    template,
    recent,
    allTemplates,
    invoice,
    resignationLetter,
    facebook,
    fax,
    mobilePhone,
    staffTypeStaff,
    staffTypeProvider,
    userTypePatient,
    displayId,
    providerColor,
    drugLic,
    npi,
    biography,
    filepath,
    category,
    order,
    color,
    dispensed,
    refill,
    additionalInfo,
    newReferral,
    existedReferral,
    referredBy,
    referredTo,
    content,
    noteType,
    abbreviation,
    insuredPercent,
    procedureCode,
    procedureFee,
    procedureTime,
    procedureType,
    toothSelect,
    toothType,
    templateDefault,
    templateMedicalAlert,
    templateProgress,
    templateTreatment,
    medicalAlert,
    progress,
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
    // Appointment
    time,
    assistant,
    selectPatient,
    enterNewPatient,
    patientInformation,
    patientID,
    chart,
    firstName,
    lastName,
    mi,
    patientContact,
    homePhone,
    mobile,
    scheduleAppoint,
    staging,
    reminderNote,
    recall,
    treatments,
    tooth,
    surface,
    noRecall,
    noTreatment,
    nextAvailable,
    onlyMine,
    nextDateProvider,
    appointDate,
    appointRequest,
    // Date
    defaultTimeFormat,
    chartDateFormat,
    apiDateFormat,
    forward,
    back,
    select,
    unselect,
    defaultDateFormat,
    holidayDormat,
    defaultDateTimeFormat,
    // Tooth
    selectOneTooth,
    selectMultiTooth,
    selectNoneTooth,
    // Unit
    hours,
    percent,
    hourShort,
    patients,
    appointDurationUnit,
    // Currency
    CURRENCY,
    CURRENCY_CHART,
    CURRENCY_PRE,
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
    fileName,
    image,
    // Schedule
    mode,
    monthly,
    weekly,
    auto,
    //patient recall
    treatment,
    interval,
    recallDate,
    patientRecall,
    //patient
    maritalStatus,
    notSpecify,
    married,
    divorced,
    single,
    widowed,
    // Treatment
    next,
    finish,
    allStepsCompleted,
    selectTreatment,
    selectTooth,
    reviewTreatmentInfo,
    facial,
    lingual,
    mesial,
    distal,
    top,
    root,
    selectedTooth,
    pleaseSelectTooth,
    notSelectMissingTooth,
    notAllowedTooth,
    notAllowSellectMultipleTooth,
    // Report
    patientsShort,
    viewPatientDocument,
    viewAppointDocument,
    viewAppointOfPatientDocument,
    noPatientLoadAllAppoints,
    // Transaction
    transaction,
    amount,
    paid,
    returned,
    totalAmount,
    noTransactionsPending
};