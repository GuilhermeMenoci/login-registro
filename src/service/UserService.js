const bcrypt = require('bcrypt')
const User = require('../model/User')

const TesteException = require('./exception/TesteException')

class UserService{

  async listInfo(id){
      // check if user exists
      return User.findById(id, '-password -_id -__v ')
  }

  async register(req, res){
    const { name, email, pass, confirmPass } = req.body
    // Validations
  if(!name){
    throw new TesteException('O nome é obrigatório')
    // return res.status(422).json({message: 'O nome é obrigatório'})
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
  }

  async helloWorld(req, res, id){
    if(id !== 88){
      throw new Error ('error')
    }
  }

}

module.exports = new UserService