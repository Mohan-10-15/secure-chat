from flask import Flask, send_from_directory
from flask_socketio import SocketIO, join_room
from flask_cors import CORS
from datetime import datetime
import os
import uuid

app = Flask(__name__, static_folder="static")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

messages = {}

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/admin")
def admin():
    return send_from_directory("static", "admin.html")

@socketio.on("join")
def on_join(data):
    room = data["room"]
    join_room(room)

    if room in messages:
        socketio.emit("room_history", messages[room], to=room)

@socketio.on("send_message")
def send_message(data):
    room = data["room"]

    msg = {
        "id": str(uuid.uuid4()),  # ✅ FIX DUPLICATE
        "user": data["user"],
        "message": data["message"],  # encrypted
        "room": room,
        "time": datetime.now().strftime("%H:%M")
    }

    if room not in messages:
        messages[room] = []

    messages[room].append(msg)

    socketio.emit("receive_message", msg, to=room)
    socketio.emit("receive_message", msg)  # admin

@socketio.on("get_messages")
def get_messages():
    all_msgs = []
    for room_msgs in messages.values():
        all_msgs.extend(room_msgs)

    socketio.emit("all_messages", all_msgs)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port)