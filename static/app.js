const BACKEND_URL = window.location.origin;

let socket;
let USER;
let ROOM;

function login() {
    USER = document.getElementById("username").value;
    ROOM = document.getElementById("room").value;

    socket = io(BACKEND_URL);

    socket.emit("join", { room: ROOM });

    socket.on("receive_message", showMessage);

    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
}

function sendMessage() {
    let msg = document.getElementById("msg").value;

    socket.emit("send_message", {
        user: USER,
        message: btoa(msg),
        room: ROOM
    });

    document.getElementById("msg").value = "";
}

function showMessage(data) {
    let chat = document.getElementById("chat");

    let text = atob(data.message);

    let align = data.user === USER ? "right" : "left";

    chat.innerHTML += `
        <div class="msg ${align}">
            <b>${data.user}</b><br>${text}
        </div>
    `;
}