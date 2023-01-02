# electron-flask-template

minimal template for electron frontend, flask backend application.



## Available features

- communication between electron and flask available:
  - `http`
  - `socket.io`





## Preparing

- make server executable with:

  ```bash
  cd public/backend
  
  # using virtualenv is strongly recommended
  pyinstaller --onefile server.py
  ```





## Available Scripts

- `npm run start` : runs the app and the server in dev mode
- `npm run react-start` : runs the app only
- `npm run electron-start` : runs the server only
- `npm run electron-pack` : build a electron executable file. default location is `/dist`

