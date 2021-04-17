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

}
//Images
const image = {
  image: "/image",
  patient: "/patient",
  mouth_template: "/image-mouth-template",
  mouth: "/image-mouth",
};
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
    tooth,
    drug,
    referralSource,
    noteMacro,
    image
};