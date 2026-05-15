import User from '../model/user.model.js'
import Token from '../model/token.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import credential from '../config/config.js'


 // controller for register .
 /**
  * - post : /api/auth/register
  * -  helps in registration 
  *
  */
export const userAuth = async (req,res)=>{
      try{
             const {name, username,email,password,role="user"} = req.body
             if(!name || !username || !email || !password ){
               return    res.status(400).json({
                "response" : "all feilds are not filled !!"
              })
             }
             const checkDummyUser =await User.findOne({
              $or :[
                {username : username},
                {email : email}
              ]
             })
             if(checkDummyUser){
                return    res.status(409).json({
                "response":"user alread exist !!"
               }) }

               const hassedPasssword = await bcrypt.hash(password,10)
               const user = await User.create({
                name,
                username,
                email,
                password : hassedPasssword ,
                role 
               }) 
               if(!user){
                 return    res.status(401).json({
                  "response":"user not created !!"
                })
             }
              const token = jwt.sign({
                id : user._id ,
                role : user.role
              },credential.secretKey, {expiresIn :"1h"})

              const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      credential.secretKey,
      {
        expiresIn: "7d",
      }
    );

              const tokenAssign = await Token.create({
                userId : user._id,
                accessToken : token,
                refreshToken : refreshToken
              })

              if(!tokenAssign){
                 return   res.status(401).json({
                  "response":"token not created !!"
                })
              }
                 res.cookie("refreshToken",refreshToken)

               return   res.status(201).json({
                "response":"user created successfully !!",
                "userInfo": user,
               
              })

              
             

      }catch(err){
         
         return    res.status(400).json({
          "error" : err.message
        })

      }
}

 // controller for login

 /**
  * -  post  :  /api/auth/login
  * -  helps to login  
  */
export const userLogin = async (req,res)=>{
  try{
        

    const {username,name,email,password} = req.body
    const user =  await User.findOne({
      $or :[
        {username : username},
        {email : email},
        {name : name}
      ]
    })
    if(!user){
      return res.status(401).json({
        "response":"user not found !!"
      })
    }

    const checkedPassword = await bcrypt.compare(password,user.password)
    if(!checkedPassword){
      return res.status(401).json({
        "response":"password not matched !!"
      })
    }

        const token = jwt.sign({
                id : user._id ,
                role : user.role
              },credential.secretKey, {expiresIn :"1h"})

              const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      credential.secretKey,
      {
        expiresIn: "7d",
      }
    );

              const tokenAssign = await Token.create({
                userId : user._id,
                accessToken : token,
                refreshToken : refreshToken
              })

              if(!tokenAssign){
                 return   res.status(401).json({
                  "response":"token not created !!"
                })
              }
                 res.cookie("refreshToken",refreshToken)
               
                 res.status(201).json({
                  "response":"user login successfully !!",
                  "userinfo":user
                 })



  }catch(err){
    return  res.status(400).json({
      "error":err.message
    })
  }
}

// controller for logout 

/**
 * - delete :  /api/auth/logout
 * - helps to delete the account
 */

export const userLogout = async (req,res)=>{
  try{

    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
       return res.status(401).json({
        "response":"token not found !!"
      })

    }
  const  decoded = jwt.verify(refreshToken,credential.secretKey)
    
   const   delToken = await Token.findOneAndDelete({userId : decoded.id})

  
    if(!delToken){
      return res.status(401).json({
        "response":"token not found !!"
      })
    }
      
    res.clearCookie("refreshToken")
    res.status(201).json({
      "response":"user logout successfully !!"
    })
    

  }catch(err){
      res.status(400).json({
        "error":err.message
      })
  }
}



