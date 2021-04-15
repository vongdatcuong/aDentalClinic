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

//procedure
const procedure={
    procedure:'/procedure',
    category:'/category',
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
export {
    authorization,
}

export default {
    authorization,
    appointment,
    practice,
    staff,
    patient,
    procedure,
    drug,
    referralSource,
    noteMacro
};