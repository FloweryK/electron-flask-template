import sys
import time
import json
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO
from engineio.async_drivers import threading

# app settings
app = Flask(__name__)
app.config['SECRET_KEY'] = 'test'
CORS(app, supports_credentials=True)

# socketIO
socketio = SocketIO(
    app, 
    cors_allowed_origins=["http://localhost:3000"],
    async_mode="threading"
)

@app.route('/')
def hello_world():
    print('Hello world in stdout!')
    return 'Hello World!'


@socketio.on("connect")
def on_connect():
    print("client connected")


@socketio.on("disconnet")
def on_disconnect():
    print("client disconnected")


@socketio.on("request")
def on_request():
    print("received request. emitting response")
    for i in range(5):
        # make response in json format
        res = json.dumps({
            "test": i
        })

        # emit response
        socketio.emit("response", res, room=request.sid)
    print("end of response")

if __name__ == '__main__':
    host = sys.argv[1]
    port = sys.argv[2]
    
    # app.run(host=host, port=port)
    socketio.run(app, host=host, port=port, allow_unsafe_werkzeug=True)
    