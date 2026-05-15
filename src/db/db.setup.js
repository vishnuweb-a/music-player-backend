import mongoose from 'mongoose'
import credential from '../config/config.js'

const connect = async ()=>{

  console.log(credential.connect)
const status = await mongoose.connect(credential.mongourl)
 if(!status){
  return res.status(401).json({
    "response" : " mongodb connection failed ."
  })
 }

 console.log("mongodb connection success .")


}

export default connect

