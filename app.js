// imports
<<<<<<< HEAD
require( 'dotenv').config()
=======
require('dotenv').config()
>>>>>>> 32facfa4e539c419207322e34b373e3ed8c14177
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

<<<<<<< HEAD
// initializing the server
const app = express()
// Configure Json Response
app.use(express.json())

// Models
const User = require('./model/User')

//Middlewares
function checkToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(authHeader);

  if(!token){
    return res.status(401).json({message: 'acesso negado!'})
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({message: "Token inválido"})
  }
}

// Open route - Public Route 
app.get('/', (req, res)=>{
  res.status(200).json({message: 'Bem vindo a API'})
})

// Private Route
app.get('/user/:id', checkToken, async (req, res)=>{
  const id = req.params.id

  // check if user exists
  const user = await User.findById(id, '-password -_id -__v ')

  if(!user){
    return res.status(404).json({message: 'Usuário não encontrado'})
  }

  res.status(200).json({user})
})

// Register User
app.post('/auth/register', async (req, res)=>{
  const { name, email, pass, confirmPass } = req.body
  
  // Validations
  if(!name){
    return res.status(422).json({message: 'O nome é obrigatório'})
  }

  if(!email){
    return res.status(422).json({message: 'O email é obrigatório'})
  }

  if(!pass){
    return res.status(422).json({message: 'A senha é obrigatória'})
  }

  if(pass !== confirmPass){
    return res.status(422).json({message: 'As senhas não conferem'})
  }

  const userExists = await User.findOne({email})

  if(userExists){
    return res.status(422).json({message: 'Email já está sendo utilizando por outra conta'})
  }

  //create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(pass, salt)

  //create User
  const user = new User({
    name, 
    email,
    password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({message: 'Usuário criado com sucesso'})

    
  } catch (error) {
    console.log(error);

    res
    .status(500)
    .json({
      message: 'Aconteceu um erro no servidor, tente novamente mais tarde'
    })
  }
})

// Login User
app.post('/auth/login', async (req, res) => {
  const { email, pass } = req.body

  // Validations
  if(!email){
    return res.status(422).json({message: 'O email é obrigatório'})
  }

  if(!pass){
    return res.status(422).json({message: 'A senha é obrigatória'})
  }

  //check if user exists
  const user = await User.findOne({email})

  if(!user){
    return res.status(422).json({message: 'Usuário não encontrado'})
  }

  //check if the password match
  const checkPass = await bcrypt.compare(pass, user.password)

  if(!checkPass){
    return res.status(422).json({message: 'Senha inválida'})
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign({
      id: user._id,
    }, secret)

    res.status(200).json({message: 'Autenticação realizada com sucesso',token})
    
  } catch (error) {
    console.log(error);

    res
    .status(500)
    .json({
      message: 'Aconteceu um erro no servidor, tente novamente mais tarde'
    })
  }
})

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
=======
const app = express()

// app.get('/', (req, res) => {
//     res.status(200).json({ msg: 'Teste route' })
// })

//Disponibilizando na porta 3000
app.listen(3000)
>>>>>>> 32facfa4e539c419207322e34b373e3ed8c14177
