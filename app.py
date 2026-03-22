from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

messages = []

print("🚀 தமிழ் சர்வர் தயார்!")

@socketio.on("connect")
def on_connect():
    print("✅ ஒரு பயனர் இணைந்தார்")

@socketio.on("send_message")
def send_message(data):
    msg = {
        "user": data["user"],
        "message": data["message"],  # encrypted
        "time": datetime.now().strftime("%H:%M")
    }
    messages.append(msg)
    socketio.emit("receive_message", msg)

@socketio.on("get_messages")
def get_messages():
    socketio.emit("all_messages", messages)

if __name__ == "__main__":
    print("🚀 சர்வர் இயங்குகிறது...")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)