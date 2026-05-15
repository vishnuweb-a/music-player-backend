import User from '../model/user.model.js'
import Token from '../model/token.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import credential from '../config/config.js'


// middleware to check the authentication 

export const checkAuth = async (req,res,next)=>{
     
  try{
        const acessToken = await req.cookies.refreshToken
        if(!acessToken){
          return  res.status(401).json({
            "response":"token not found !!"
          })
        }
        const decoded = jwt.verify(acessToken,credential.secretKey)
        req.user = await User.findById(decoded.id)
        req.body = decoded.id
        next()
  }catch(err){
     return res.status(401).json({
  response: err.message
})
  }
}

// middleware to check the authorisation 
export const checkauthorisation = async (req,res,next)=>{
     
  try{
        const acessToken = await req.cookies.refreshToken
        if(!acessToken){
          return  res.status(401).json({
            "response":"token not found !!"
          })
        }
        const decoded = jwt.verify(acessToken,credential.secretKey)
        req.user = await User.findById(decoded.id)
        if(req.user.role !== "admin"){
           return res.status(401).json({
            "response":"unautherised to access the data !!"
           })
        }
        next()
  }catch(err){
     return res.status(401).json({
          "response": err.message
})
  }
}