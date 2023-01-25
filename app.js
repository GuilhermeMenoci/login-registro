// imports
require( 'dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const router = require('./src/routes')

// initializing the server
const app = express()

// Configure Json Response
app.use(express.json())
app.use(router)

// credentials
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

// Connect with db
mongoose
.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.zoycesc.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
  app.listen(3000)
  console.log('conectou ao banco');

})
.catch((err)=>{   
  console.log(err);
})
