This directory contains both server and client code of published blog-list app and also Cypress end to end tests.

Before running the application the following environment variables have to be set in the backend.

- MONGODB_URI
- JWT_SECRET

# Installing dependencies

```bash
  cd server && npm install
  cd client && npm install
  cd e2e && npm install
```

# Starting the application

### Run the full stack app with single command

```bash
  cd server
  npm run app
```

### Running react app

```bash
  cd client
  npm start
```

### Starting api server

```bash
  # Go to server
  cd server

  # Start server in dev mode
  npm run start:dev
```

# Testing the application

### API testing

```bash
  # Go to server directory and start server in test mode
  cd server && npm run start:test

  # Run the tests
  npm run test
```

### UI testing

```bash
  cd client
  npm run test
```

### End to end testing

```bash
  # Go to server directory and start server in test mode
  cd server && npm run start:test

  # Go to client directory and start the react applicaiton
  cd client && npm start

  # Go to e2e directory
  cd e2e

  # Run cypress tests
  npm run test
```
