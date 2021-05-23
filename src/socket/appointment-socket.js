// Notify appointment requests response
const notifyAppointReqRes = (socket, appointRequests, setAppointRequests) => {
    socket.on("Notify-Appointment-Request-Response", (result) => {
        setAppointRequests([...appointRequests, result]);
    })
}

const notifyAppointReqResOff = (socket) => {
    socket.off("Notify-Appointment-Request-Response");
}

// Notify update appointment requests response
const notifyUpdateAppointReqRes = (socket, appointRequests, setAppointRequests) => {
    socket.on("Notify-Update-Appointment-Request-Response", (result) => {
        const newAppointRequests = [];
        appointRequests.forEach((request) => {
            if (request._id !== result._id){
                newAppointRequests.push(request);
            } else {
                newAppointRequests.push(result);
            }
        })
        setAppointRequests(newAppointRequests);
    })
}

const notifyUpdateAppointReqResOff = (socket) => {
    socket.off("Notify-Update-Appointment-Request-Response");
}

// Notify delete appointment requests response
const notifyDeleteAppointReqRes = (socket, appointRequests, setAppointRequests) => {
    socket.on("Notify-Delete-Appointment-Request-Response", (resultID) => {
        setAppointRequests(appointRequests.filter((request) => request._id !== resultID));
    })
}

const notifyDeleteAppointReqResOff = (socket) => {
    socket.off("Notify-Delete-Appointment-Request-Response");
}

export {
    notifyAppointReqRes,
    notifyAppointReqResOff,
    notifyUpdateAppointReqRes,
    notifyUpdateAppointReqResOff,
    notifyDeleteAppointReqRes,
    notifyDeleteAppointReqResOff
}
