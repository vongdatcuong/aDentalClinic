// Authorization
const authorization = {
    authorization: '/authorization',
    logIn: "/signin",
    refreshToken: "/refresh-token",
    changePassword: "/change-password"
}

// Appointment
const appointment = {
    appointment: '/appointment',
    block: '/block',
    chair: '/chair',
    delete: '/delete',
    appointRequest: '/appointment-request'
}

//staffs
const staff={
    staff:'/staff',
    provider:'/provider',
    schedule: '/schedule',
    nextAvailableDate: '/next_available_date'
}
//patient
const patient={
    patient:'/patient'
}
//patient progress note
const progressNote={
    progressNote:'/progress-note',
    progressNoteByPatient:'/progress-note/patient',
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
    recall: '/recall',
}

// Treatment
const treatment = {
    treatment: '/treatment',
    patient:'/patient'
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

//drug
const drug={
    drug:'/drug',

}
//referral source
const referralSource={
    referralSource:'/referral-source',
}

//note_macro
const noteMacro={
    noteMacro:'/note-macro',
    medical_alert: "/medical-alert",
    progress_note: "/progress-note",
}
//Images
const image = {
  image: "/image",
  patient: "/patient",
  mouth_template: "/image-mouth-template",
  mouth: "/image-mouth",
};

//prescription
const prescription={
    prescription:'/prescription',
    detail:'/detail',
    patient:'/patient',
}

//patient recall
const patientRecall={
    recall:'/recall',
    patient:'/patient',
}
//referral
const referral={
    referral:'/referral',

}

// report
const report = {
    report: '/report',
    appointment: '/appointment',
    treatmentHistory: '/treatment-history'
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
    progressNote,
    holiday,
    common,
    recall,
    treatment,
    procedure,
    tooth,
    drug,
    referralSource,
    noteMacro,
    image,
    prescription,
    patientRecall,
    referral,
    report
};