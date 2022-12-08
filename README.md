# NotaBene
# Setting Up the Project

Welcome to NotaBene--an efficient and convenient tool to keep track of your tasks and notes!

Once you have downloaded the code from this repository, please go to your terminal, cd into the root folder, and then run "npm install". This will install all the needed node modules. Make sure to add your user and password to the env.json file. Then, create the database and tables by running the command "psql --username USERNAME -f setup.sql", replacing USERNAME with your Postgres username. Finally, run "npm start", which will cd into the app directory and run the server.js file.