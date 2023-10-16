# Employee Review System

## Table of Contents

- [Introduction](#introduction)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)

## Introduction

This is a full stack web application which allows employees to submit feedback towards each other. It is built using MERN stack. It uses passport.js for authentication and express-session for session management. It uses mongodb as database and mongoose as ODM. It uses react for frontend.

Admin can perform following actions:

-Promote or demote employees.
-Remove employees.
-Assign performance review to employees.
-Assign employees to participate in another employee's performance review
-View all employees and their details.

Employee can perform following actions:

- Employee can create a new account or login using an existing account.
- Employee can view all the feedbacks received from other employees.
- Employee can view all the feedbacks given to other employees.
- Give feedback to other employees.

The app is hosted at [https://employee-review-system-raghavendra.netlify.app](https://employee-review-system-raghavendra.netlify.app)
The backend is hosted at [https://employee-review-system-raghavendra.onrender.com/](https://employee-review-system-raghavendra.onrender.com/)

## Directory Structure

```bash
├── client
│   ├── public
│   └── src
│       ├── components
│       ├── context
│       ├── pages
│       ├── styles
│       ├── App.js
│       └── index.js
└── server
    ├── config
    ├── controllers
    ├── models
    ├── routes
    ├── index.js
    └── package.json
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file on server root directory.

`MONGODB = "<your mongodb connection string>"`

`COOKIE_SECRET = "<Secret key to encrypt cookie>"`

Add `CORS_ORIGIN = "<your frontend base address>"` only if hoasting the frontend. To run on localhost no need to add `CORS_ORIGIN`.

## Run Locally

Clone the project

```bash
  git clone https://github.com/RaghavendraPatel/Employee-Review-System.git
```

Go to the project directory

```bash
  cd Employee-Review-System
```

#### To start the server

Go to server directory

```bash
    cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

#### To start the client

On a seperate terminal

Go to client directory

```bash
    cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
