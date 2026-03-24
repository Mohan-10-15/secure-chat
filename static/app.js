const BACKEND_URL = window.location.origin;

let socket;
let USER;
let ROOM;

// 🔐 encryption key
const SECRET = "tamil-secure-key";

// ✅ prevent duplicate messages
let shownMessages = new Set();

function login() {
    USER = document.getElementById("username").value;
    ROOM = document.getElementById("room").value;

    socket = io(BACKEND_URL);

    socket.emit("join", { room: ROOM });

    socket.on("receive_message", showMessage);

    // ✅ LOAD HISTORY
    socket.on("room_history", (msgs) => {
        msgs.forEach(msg => {
            if (!shownMessages.has(msg.id)) {
                showMessage(msg);
            }
        });
    });

    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
}

// 🔐 encrypt
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET).toString();
}

// 🔓 decrypt
function decrypt(cipher) {
    try {
        return CryptoJS.AES.decrypt(cipher, SECRET).toString(CryptoJS.enc.Utf8);
    } catch {
        return "🔒";
    }
}

function sendMessage() {
    let msg = document.getElementById("msg").value;

    socket.emit("send_message", {
        user: USER,
        message: encrypt(msg),
        room: ROOM
    });

    document.getElementById("msg").value = "";
}

function showMessage(data) {
    if (shownMessages.has(data.id)) return;
    shownMessages.add(data.id);

    let chat = document.getElementById("chat");

    let text = decrypt(data.message);

    let align = data.user === USER ? "right" : "left";

    chat.innerHTML += `
        <div class="msg ${align}">
            <b>${data.user}</b><br>${text}
        </div>
    `;
}