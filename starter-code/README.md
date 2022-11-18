Project #4: An inventory for Vending Nation company (Full Stack App)
1. # **Background of Vending Nation**
- Vending Nation is a company that sell snacks and drinks by vending machine
1. # **Overview of this application**
- by using this app, the workers can record the quantity of drinks and snacks in a machine
1. # **User stories**
- **Admin**
1. can create new users
1. change user's role and username
- **worker**
1. can create a new withdraw list to record the drinks quantity in vending machine
1. change user's role and username
1. # **Technologies used to build frontend:**
- React.js
- Node.js
1. # **Technologies used to build backend:**
- PostgreSQL
- Express
- Node.js

1. # **Github Repositories:**
Client: <https://github.com/Cjiaxin9/Inventory-backend.git>

Server: <https://github.com/Cjiaxin9/-Inventory-frontend.git>
1. # **How to install and run the project:**
**Create a database In sql (Shell)   copy and paste the following:**

- create database vendingnation;
- grant all privileges on database vendingnation to db\_user;
- grant select, insert, update, delete on all tables in schema public to db\_user;

**Server:** Create .env file

copy paste the code below:

PORT = 5001

ACCESS\_SECRET = 3vps3OOfV5wJDZy09fqqLfp3tzrEReHXcWL1m1dFaUuwP31HoKd68xLRttcYlMCFHUXKQgzniYWIUgtD

REFRESH\_SECRET = sZz0i1QiVBF0Mlh6LBdBDFoDmD2052jhLqhlRAx0vu5YFMFVRk4xqFGqKB58GMi6YxNE0iOVuxpkzKF5

Install backend dependencies

- npm install
- npm init –y
- npm i express
- npm i –D nodemon
- npm i dotenv cors bcypt

Run ‘npm run dev’ to start local host for back end

**In Postman,** `PUT` http://127.0.0.1:5001/users/create to insert 2 users

a. {

`    `"username": "Sihui",

`    `"password": "147258",

`    `"role":"ADMIN"

}

b.  {

`    `"username": "Estelle",

`    `"password": "987654",

`    `"role":"ADMIN"

}

**Client:** Run ‘npm install’ to install frontend dependencies (React)

Run ‘npm start’ to start local host for frontend
1. # **Things that can be add on**
- Fix the date in InputEdit page ( the date that was pass by the backend is in UTC and it is different from the local date)
- Stock in  so that we can calculate the balance stock
- A user account setting for individual user for them to change the password

