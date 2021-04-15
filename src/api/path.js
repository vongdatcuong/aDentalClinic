// Authorization
const authorization = {
    authorization: '/authorization',
    logIn: "/signin",
    refreshToken: "/refresh-token"
}

// Appointment
const appointment = {
    appointment: '/appointment',
    block: '/block',
    chair: '/chair',
    delete: '/delete'
}

// Practice 
const practice = {
    practice: '/practice',
}

// Holiday
const holiday = {
    holiday: '/holiday'
}

// Patient
const patient = {
    patient: '/patient',
}

// Staff
const staff = {
    staff: '/staff'
}

// Common
const common = {
    autocomplete: '/auto-complete'
}

// Recall
const recall = {
    recall: '/recall'
}

// Treatment
const treatment = {
    treatment: '/treatment'
}

// Procedure
const procedure = {
    procedure: '/procedure',
    category: '/category'
}

// Tooth
const tooth = {
    tooth: '/tooth',
    patient: '/patient',
}

export {
    authorization,
}

export default {
    authorization,
    appointment,
    practice,
    holiday,
    patient,
    staff,
    common,
    recall,
    treatment,
    procedure,
    tooth
};