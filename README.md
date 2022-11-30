Project #4: An inventory for Vending World company (Full Stack App)

1. # **Background of Vending World**

- Vending World is a company that sell snacks and drinks by vending machine

2. # **Overview of this application**

- by using this app, the workers can record the quantity of drinks and snacks in a machine

3. # **User stories**

- **Admin**

* can create new users
* change user's role and username

- **worker**

* can create a new withdraw list to record the drinks quantity in vending machine
* can view the withdraw list that was created
* can only edit if the date is created in the current date

- **Supervisor**
*can view and edit all the Stockin lists that were created
*can view, edit and create new company(supplier), location, unit, category and product name

4. # **Technologies used to build frontend:**

- React.js

5. # **Technologies used to build backend:**

- PostgreSQL
- Express
- Node.js

6. # **Github Repositories:**
   Client: <https://github.com/Cjiaxin9/-Inventory-frontend.git>
   Server: <https://github.com/Cjiaxin9/Inventory-backend.git>

7. # **How to install and run the project:**
   **Create a database In sql (Shell) copy and paste the following:**

- create database vendinworld;
- grant all privileges on database vendingnation to db_user;
- grant select, insert, update, delete on all tables in schema public to db_user;

**Server:** Create .env file

copy paste the code below:

PORT = 5001

ACCESS_SECRET = 3vps3OOfV5wJDZy09fqqLfp3tzrEReHXcWL1m1dFaUuwP31HoKd68xLRttcYlMCFHUXKQgzniYWIUgtD

REFRESH_SECRET = sZz0i1QiVBF0Mlh6LBdBDFoDmD2052jhLqhlRAx0vu5YFMFVRk4xqFGqKB58GMi6YxNE0iOVuxpkzKF5

Install backend dependencies

- npm install
- npm init –y
- npm i express
- npm i –D nodemon
- npm i dotenv cors bcypt

Run ‘npm run dev’ to start local host for back end

**Client:** Run ‘npm install’ to install frontend dependencies (React)

Run ‘npm start’ to start local host for frontend

**login(username and password ):**
a. Admin{

` `"username": "Sihui",

` `"password": "147258"

}

b. Worker{

` `"username": "Estelle",

` `"password": "987654",

}
c. Supervisor{

` `"username": "Daniel",

` `"password": "123456",

}

<br> 8. # **Things that can be add on**

- calculate the balance stock
- A user account setting for individual user for them to change the password
- Authorization
