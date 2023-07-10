# Application setup:
Create database (Postgres/MySQL) named - articles

There are 2 options for launching application:

## Docker:
 
```bash
# install and run all necessary commands for launching application
$ docker-compose-up
``` 
### Open `http://localhost:3001` for using application

## Manually:
```bash
# Backend

# go to server folder
$ cd server

# install packages
$ npm install

# *Side note: If you launch for the first time execute command `npm run migration:run`, this command will fill database with correct tables.*

# launch server
$ npm start

# Frontend

# go to client folder
$ cd server

# install packages
$ npm install

# launch application
$ npm start
``` 

# Backend documentation: `http://localhost:3000/documentation`
