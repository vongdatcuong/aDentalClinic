// FORCE DISCONNECT
const forceDisconnect = (socket) => {
    socket.emit("Force-Disconnect");
};

export {
    forceDisconnect
}
