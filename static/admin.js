const BACKEND_URL = "http://127.0.0.1:5000";

let socket;

function adminLogin() {
    let pass = document.getElementById("adminPass").value.trim();

    // DEBUG
    console.log("Entered:", pass);

    if (pass !== "admin123") {
        alert("❌ தவறு கடவுச்சொல் (Wrong Password)");
        return;
    }

    alert("✅ Login Successful");

    socket = io(BACKEND_URL);

    socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("get_messages");
    });

    socket.on("all_messages", showAll);
    socket.on("receive_message", showMsg);

    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
}

function showAll(data) {
    let chat = document.getElementById("chat");
    chat.innerHTML = "";

    data.forEach(msg => {
        chat.innerHTML += `
        <div class="msg hacker">
            <b>${msg.user}</b><br>
            ${msg.message}
        </div>`;
    });
}

function showMsg(msg) {
    let chat = document.getElementById("chat");

    chat.innerHTML += `
    <div class="msg hacker">
        <b>${msg.user}</b><br>
        ${msg.message}
    </div>`;

    chat.scrollTop = chat.scrollHeight;
}