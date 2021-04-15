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
    chair: '/chair'
}

//staffs
const staff={
    staff:'/staff',
    provider:'/provider',
}
//patient
const patient={
    patient:'/patient'
}
// Practice 
const practice = {
    practice: '/practice',
}

// Holiday
const holiday = {
    holiday: '/holiday'
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
    staff,
    patient,
    holiday,
    common,
    recall,
    treatment,
    procedure,
    tooth
};