const express = require("express")
const app=express();
const mongoose =require("mongoose");



const dotenv=require("dotenv")
dotenv.config();
// const dblink=`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.xznlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const dblink=`mongodb+srv://codework123407:${process.env.DB_PASSWORD}@cluster0.il2m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// mongodb+srv://codework123407:<db_password>@cluster0.il2m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(dblink).then(function(connection){
        console.log("connected sucesfully to db ")
    }).catch(err=>{
        console.log(err)
    })

app.use(express.json());
const cookieparser=require("cookie-parser")
app.use(cookieparser())

const AuthRouter=require("./router/AuthRouter")
app.use("/api/auth",AuthRouter)

app.listen(3010,function(){
    console.log("server listening")
})
