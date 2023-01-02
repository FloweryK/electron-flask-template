# electron-flask-template

minimal template for electron frontend, flask backend application.



<br/>

<br/>



## Available features

- communication between electron and flask available:
  - `http`
  - `socket.io`



<br/>

<br/>



## Preparing

- make server executable with:

  ```bash
  cd public/backend
  
  # using virtualenv is strongly recommended
  pip install -r requirements.txt
  pyinstaller --onefile server.py
  ```

- install node packages, and run in dev mode at least once (to generate electron.js)

  ```bash
  npm install
  npm run start
  ```

  

<br/>

<br/>



## Available Scripts

- `npm run start` : runs the app and the server in dev mode
- `npm run react-start` : runs the app only
- `npm run electron-start` : runs the server only
- `npm run electron-pack` : build a electron executable file. default location is `/dist`

