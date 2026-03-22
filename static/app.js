const BACKEND_URL = "http://127.0.0.1:5000";
let socket;
let USER;
let sharedKey = "தமிழ்"; // AES key

function login() {
    USER = document.getElementById("username").value;
    socket = io(BACKEND_URL);

    socket.emit("get_messages");
    socket.on("receive_message", showMessage);
    socket.on("all_messages", msgs => msgs.forEach(showMessage));

    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
}

function encrypt(msg) {
    return CryptoJS.AES.encrypt(msg, sharedKey).toString();
}

function decrypt(cipher) {
    try { return CryptoJS.AES.decrypt(cipher, sharedKey).toString(CryptoJS.enc.Utf8); }
    catch { return "🔒 குறியாக்கம்"; }
}

function sendMessage() {
    let msg = document.getElementById("msg").value;
    let encrypted = encrypt(msg);
    socket.emit("send_message",{user:USER,message:encrypted});
    document.getElementById("msg").value="";
}

function showMessage(data) {
    let chat = document.getElementById("chat");
    let text = decrypt(data.message);
    let align = data.user===USER ? "right" : "left";

    chat.innerHTML += `<div class="msg ${align}">
        <b>${data.user}</b><br>${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
}