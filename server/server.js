const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port =  5000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user:' root',
  password: '',
  database: 'wwms'
});

app.post('/signup', (req, res) => {

  sql = "INSERT INTO user_details (fname, lname, phonenumber, email, password) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.phonenumber,
    req.body.email,
    req.body.password
  ]
  db.query(sql, values, (err, result) => {
    if(err) 
      return res.json({message:'Something unexpected has occurred' + err})
      return res.json({message:'User registered successfully'});
})

})

app.listen(port, () => {
  console.log(`Server running on port ` + port);
});