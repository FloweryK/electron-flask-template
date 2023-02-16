import os
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

# stop signs
is_processing = False
is_abort = False


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
def on_request(data):
    print("request from client:", data)

    # global variables
    global is_processing
    global is_abort

    # check is_processing
    if is_processing:
        print("request is already ongoing:", is_processing)
        return
    else:
        is_processing = True

    for i in range(5):
        # check abort
        if is_abort:
            print("abort processing")
            break

        # make response in json format
        res = json.dumps({
            "test": i,
            "projectdir": projectdir,
            "projectdirlist": os.listdir(projectdir)
        })

        # emit response
        print("response to client:", res)
        socketio.emit("response", res, room=request.sid)

        # sleep for a while
        time.sleep(1)

    # set is_processing as false (default)
    is_processing = False
    is_abort = False
    print("end of response")


@socketio.on('abort')
def abort():
    print("received abort sign")

    # global variables
    global is_processing
    global is_abort

    if is_processing:
        is_abort = True
        print("set abort as True")
    else:
        print("nothing to abort")


if __name__ == '__main__':
    host = sys.argv[1]
    port = sys.argv[2]
    projectdir = sys.argv[3]
    
    # app.run(host=host, port=port)
    socketio.run(app, host=host, port=port, allow_unsafe_werkzeug=True)
    