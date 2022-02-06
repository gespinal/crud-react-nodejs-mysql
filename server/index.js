const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require ("mysql");

const app = express();

const db = mysql.createConnection ({
   host: "crud-db",
   user: "user",
   password: "user",
   database: "crud"
});

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My CRUD App." });
});

app.get("/api/get", (req,res) => {
   console.log('Calling get api...');
   const sqlGet = "SELECT id, item FROM items;"
   db.query(sqlGet, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

app.post("/api/insert", (req,res) => {
   console.log('Calling insert api...');
   const item = req.body.item;
   if (item.length > 0){
      const sqlInsert = "INSERT INTO items (item) VALUES (?);"
      db.query(sqlInsert, item, (err, result) => {
         if (err) {
            console.log(err);
         } else {
            res.send(result);
         }
      });
   } else {
      console.log('Unable to insert null into table.');
   }
});

app.put("/api/update", (req,res) => {
   console.log('Calling update api...');
   const id = req.body.id;
   const itemU = req.body.itemU;
   if (itemU.length > 0){
      const sqlUpdate = "UPDATE items SET item = ? where id = ?;"
      db.query(sqlUpdate, [itemU, id], (err, result) => {
         if (err) {
            console.log(err);
         } else {
            res.send(result);
         }
      });
   } else {
      console.log('Unable to update null into table.');
   }
});

app.delete("/api/delete/:id", (req,res) => {
   console.log('Calling delete api...');
   const id = req.params.id;
   const sqlDelete = "DELETE FROM items WHERE id = ?;"
   db.query(sqlDelete, id, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
