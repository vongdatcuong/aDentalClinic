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


export {
    authorization,
}

export default {
    authorization,
    appointment,
    practice,
    staff,
    patient,
    
};