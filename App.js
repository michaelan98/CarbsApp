var mongoclient = require("mongodb").MongoClient;
var url = "mongodb+srv://michael:Password1@carbsapp-fhszl.mongodb.net/carbsApp?retryWrites=true";
var express = require("express");
var bodyParser = require("body-parser"); 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = require("path");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 8082;

// Connecting to mySQL DB
/*app.use("/", function(req, res, next){
var con = mysql.createConnection({
    host:"remotemysql.com",
    user:"bupFWhT8t5",
    password:"HtaOPLrUi5",
    database:"bupFWhT8t5",
    port: 3306
    });
    con.query("SELECT * FROM mytable", function(err, rows){
        if(err) throw err;
        console.log(rows[0].name+" "+ rows[0].nutritionper100genergy);
    });
    next();
});
*/

app.use(express.static("public"));
app.post("/user", urlencodedParser, function(req,res){
    res.send("Data received");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.confirm);

    mongoclient.connect(url, {useNewUrlParser:true}, function(err, db){
        if(err) throw err;
        console.log("Successful Connection");
        var database = db.db("carbsApp");
       
        var obj ={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            confirm:req.body.confirm
        };
        database.collection("user").insertOne(obj, function(err, result){
            if(err) throw err;
            console.log("Data has been added to database");
        });
    });
});

  // Route for querying all food types -
  app.get("/foods", function(req, res){
    var con = mysql.createConnection({
        host:"remotemysql.com",
        user:"bupFWhT8t5",
        password:"HtaOPLrUi5",
        database:"bupFWhT8t5",
        port: 3306
    });

    con.query("SELECT * FROM mytable limit 10", function(err, result){
        if(err) throw err;
        res.json(result);
        });
    });


app.get("/", function(req,res){
    res.send("Hello world")
    console.log("The server is listening at port" + port);
    db.close();
});

//Route to handle the path(home)
app.get("/home", function(req,res){
    res.sendFile(path.join(__dirname + "/Home.html"))
});

//Route to handle the path(Login)
app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname + "/Login.html"))
});

//Route to handle the path(register)
app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname + "/Register.html"))
});

//Route to handle the path(food)
app.get("/food", function(req,res){
    res.sendFile(path.join(__dirname + "/Food.html"))
});
app.listen(port);