const jwt = require('jsonwebtoken')

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

module.exports = checkToken