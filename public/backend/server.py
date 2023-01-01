import sys
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/')
def hello_world():
    print('Hello world in stdout!')
    return 'Hello World!'

if __name__ == '__main__':
    host = sys.argv[1]
    port = sys.argv[2]
    app.run(host=host, port=port)