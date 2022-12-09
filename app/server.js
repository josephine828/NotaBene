// Please Note: A better database schema is required for this project, thus using PostgreSQL is temporarily on hold. The data is currently saved in local storage.
// I have plans for migrating this over to an actual database in the near future.


const pg = require("pg");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("public/index.html"); 
});

app.listen(port, () => {
    console.log(`Server is listening on: ${port}`);
});
