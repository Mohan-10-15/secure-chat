from flask import Flask, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__, static_folder="static")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

messages = []

# ✅ MAIN PAGE
@app.route("/")
def index():
    return send_from_directory("static", "index.html")

# ✅ ADMIN PAGE
@app.route("/admin")
def admin():
    return send_from_directory("static", "admin.html")

# SOCKET CONNECT
@socketio.on("connect")
def connect():
    print("User connected")

# SEND MESSAGE
@socketio.on("send_message")
def send_message(data):
    msg = {
        "user": data["user"],
        "message": data["message"],
        "time": datetime.now().strftime("%H:%M")
    }
    messages.append(msg)
    socketio.emit("receive_message", msg)

# GET MESSAGES (ADMIN)
@socketio.on("get_messages")
def get_messages():
    socketio.emit("all_messages", messages)

# RUN SERVER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port)