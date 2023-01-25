const User = require('../../model/User')

const UserService = require('../../service/UserService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserController {

  async helloWorld(req, res){
    try {
      const id = 'oi'
      UserService.helloWorld(req, res, id)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
    // res.status(200).json({"message": "Bem vindo a API"})
  }

  async listInfo(req, res){
      const id = req.params.id
      const user = await UserService.listInfo(id)
      if(!user){
        res.status(404).json({message: 'Usuário não encontrado'})
      }
      res.status(200).json({user})
  }

  async register(req, res){
    try {
      UserService.register(req, res)
      
    } catch (error) {
      res.status(400).json({message: error.message})

    }
  
  
  }

  async login(req, res){
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
  }

}

module.exports = new UserController()