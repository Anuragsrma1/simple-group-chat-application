const express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
let userName ;
 app.get("/", (req,res,) => {
   fs.readFile("username.txt" , (err , data) => {
    if(err) {
        console.log(err);
        data = 'No chat Exists'
        
    }
    console.log("data",data.toString());
   // userName = data.split(':')[0]  
    console.log(userName,"userName");
    res.send(
        `${data}<form action="/" method="POST" onSubmit= "document.getElementById('username').value = localStorage.getItem('username')"> 
        <input type="text" name= "message" id = "message">
	<input type="hidden" name ="username" id = "username"> 
      <br />
	<button type="submit">Submit</button>
</form>`
    );
   })
    
 });

 app.post("/" ,(req,res) => {
    console.log("username:",req.body.username);
    console.log("message:" ,req.body.message);

    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`,{flag : 'a'},(err) => 
       err ? console.log(err) : res.redirect("/")  
    );
 });

 app.get("/login" , (req,res) => {
    res.send( //= localStorage.getItem('username')
        `<form action="/" method="POST" onSubmit="localStorage.setItem('username').value "> 
       <input type="text" , name = "username", placeholder = "username" , id="usernameId">
       <br /> 
       <button type="submit">Submit</button>
</form>`
    );
 });

app.listen(3000);