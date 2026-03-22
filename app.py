from flask import Flask, send_from_directory
from flask_socketio import SocketIO, join_room
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__, static_folder="static")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

messages = []

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/admin")
def admin():
    return send_from_directory("static", "admin.html")

# JOIN ROOM
@socketio.on("join")
def on_join(data):
    join_room(data["room"])

# SEND MESSAGE
@socketio.on("send_message")
def send_message(data):
    msg = {
        "user": data["user"],
        "message": data["message"],
        "room": data["room"],
        "time": datetime.now().strftime("%H:%M")
    }

    messages.append(msg)

    # 🔥 send to room users
    socketio.emit("receive_message", msg, to=data["room"])

    # 🔥 ALSO send to admin (VERY IMPORTANT FIX)
    socketio.emit("receive_message", msg)

# ADMIN GET ALL
@socketio.on("get_messages")
def get_messages():
    socketio.emit("all_messages", messages)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port)