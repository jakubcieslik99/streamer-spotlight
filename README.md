# <img src="https://i.ibb.co/bstFRHH/streamer-spotlight-1.png" width="600">

## Streamer Spotlight 🔍

📌 Simple streamer spotlight app with REST API server, based on the MERN stack. Project contains Express.js app as a backend
(server) and React app as a frontend (client).

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/jakubcieslik99/streamer-spotlight?color=orange&filename=server%2Fpackage.json&label=server%20version)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/jakubcieslik99/streamer-spotlight?color=orange&filename=client%2Fpackage.json&label=client%20version)
![GitHub top language](https://img.shields.io/github/languages/top/jakubcieslik99/streamer-spotlight)
![GitHub repo size](https://img.shields.io/github/repo-size/jakubcieslik99/streamer-spotlight)
[![Website)](https://img.shields.io/website?label=demo%20website&url=https%3A%2F%2Fstreamer-spotlight.jakubcieslik.com%2F)](https://streamer-spotlight.jakubcieslik.com/)

## Features

- Adding favorite streamers along with some relevant details
- Voting or unvoting existing streamers
- Searching through all existing streamers and displaying details about them

## Screenshots

<img src="https://i.ibb.co/DCsVHSX/streamer-spotlight-2.png" width="630">

## Endpoints Documentation

📚 Documentation of all available endpoints can be found here:
[API Documentation](https://documenter.getpostman.com/view/20607862/2s93z6ejcb)

## Run Locally

- Clone repository

```bash
  git clone https://github.com/jakubcieslik99/streamer-spotlight.git
```

ℹ️ Instructions for running server app locally:

- Navigate to the server directory and install dependencies

```bash
  cd streamer-spotlight/server
  npm install
```

- Run server app in development mode

```bash
  npm run dev
```

ℹ️ Instructions for running client app locally:

- Navigate to the client directory and install dependencies

```bash
  cd streamer-spotlight/client
  npm install
```

- Run client app in development mode

```bash
  npm run dev
```

## Deployment

ℹ️ Instructions for building and running server app in production

- Transpile to production build

```bash
  npm run build
```

- Run server app in production mode

```bash
  npm install --omit=dev
  npm run prod
```

ℹ️ Instructions for building client app to production

- Create production build

```bash
  npm run build
```

## Environment Variables

⚙️ To run server app, you will need to add the following environment variables to your .env file

- `ENV`

- `PORT`

- `IP`

- `API_URL`

- `WEBAPP_URL`

- `MONGODB_URI`

( ℹ️ - sample .env config file is provided in the server directory under the name `.env.sample` )

⚙️ To build client app, you will need to add the following environment variables to your .env file

- `VITE_APP_ENV`

- `VITE_APP_API_URL`

( ℹ️ - sample .env config file is provided in the client app directory under the name `.env.sample` )

## Languages

🔤 Available client app languages: **EN**

## Feedback

If you have any feedback, please reach out to me at ✉️ contact@jakubcieslik.com

## Authors

- [@jakubcieslik99](https://www.github.com/jakubcieslik99)
