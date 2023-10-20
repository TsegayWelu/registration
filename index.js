const express = require('express')
const cors=require("cors")//calling for cors that allow connection.
const app = express()
const port = 3000
app.use(express.json())//to recive data from client or post man
// featch data from mysql db course table user using localhost:3000/users
const mysql=require('mysql');
var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'course'
})

app.use(cors())//please recive file that cames from local compuetr file  .html example
conn.connect(function(err){
  if(err) throw err;
  console.log('you connected successfully ')
});
// connected sucees fully to our database then to fetch data
//from table user and database course   
//nab postman keydka nmkbal localhost:3000/users bel b get method 
app.get('/users', (req, res) => {

  conn.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    // The results variable will contain an array of objects, where each object represents a row in the user table
    res.send(results)
  });
})
// data kab postman mkbal 
app.post("/users",(req,res)=> {
  console.log(req.body)

  res.send({record: req.body})
})
//go to postman and type  localhost:3000/data  then in the body
//type the data you want to send 
app.post("/data",(req,res)=>{
  console.log(req.body);
  res.send({record:req.body})// meliska nab postman  nmsdad zsededo kriao
})
// i am reciving data from front end  so i have to use post 

/* app.post("/information",(req,res)=>{
  console.log(req.body);
  res.send({record:req.body});
})  */
//in this i am inserting the data i resived from html register.html or to may table
//or from postman http://localhost:3000/information
app.post('/information', (req, res) => {
  const { name, age, class_year, coutry } = req.body;

  const sql = 'INSERT INTO user (name, age, `class year`, coutry) VALUES (?, ?, ?, ?)';

  const values = [name, age, class_year, coutry];

  console.log({body:  req.body})
  


   conn.query(sql, values, (err, result) => {
     if (err) {
      console.error(err);
      return res.status(500).send('Error inserting data into the database');
    }
     console.log('Data inserted successfully');
     //res.status(200).send('Data inserted successfully');
  });
  res.send("inserted")
});






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//to update name halefom to tsgay wehre age =90 


 /*  const sql = "UPDATE user SET name = 'tsegay' WHERE age = 90 AND name = 'halefom'";

  conn.query(sql, function(err, result) {
    if (err) throw err;
    console.log('Name updated successfully');
    conn.end(); // Close the connection
  });  */


  //with express js how to update
  app.put('/update', (req, res) => {
    const { age, currentName, newName } = req.body;
  
    const sql = `UPDATE user SET name = '${newName}' WHERE age = ${age} AND name = '${currentName}'`;
  
    conn.query(sql, function(err, result) {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating name');
      } else {
        console.log('Name updated successfully');
        res.send('Name updated successfully');
      }
    });
  });



 //how to connect database  with out express
/* var mysql=require('mysql');
var con=mysql.createConnection({
  host:"localhost",
  user:'root',
  password:'',
  database: 'course'
});
con.connect(function(err){
  if(err) throw err;
  console.log("connected to db")
}); 

//how to insert data to my database name course table name users
con.query("INSERT INTO user (name, age, `class year`, coutry) VALUES ('tse', 90, 4, 'ethiopia')", function (err, result) {
  if (err) throw err;
  console.log("Data inserted successfully");
});




//how to fetch data from db course table user
// how to fetch  data from my table user

 con.query('SELECT * FROM user', (err, results) => {
  if (err) {
    console.error(err);
    return;
  }

  // The results variable will contain an array of objects, where each object represents a row in the user table
  console.log(results);
});
 */




