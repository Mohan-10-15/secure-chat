const BACKEND_URL = window.location.origin;

let socket;

function adminLogin() {
    let pass = document.getElementById("adminPass").value;

    if (pass !== "admin123") {
        alert("Wrong password");
        return;
    }

    socket = io(BACKEND_URL);

    socket.emit("get_messages");

    socket.on("all_messages", (data) => {
        let chat = document.getElementById("chat");
        chat.innerHTML = "";

        data.forEach(msg => {
            chat.innerHTML += `
                <div class="msg hacker">
                    <b>${msg.user}</b><br>
                    ${msg.message}
                </div>
            `;
        });
    });

    socket.on("receive_message", (msg) => {
        let chat = document.getElementById("chat");

        chat.innerHTML += `
            <div class="msg hacker">
                <b>${msg.user}</b><br>
                ${msg.message}
            </div>
        `;
    });

    document.getElementById("login").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
}