import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  userId :{
    type : mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  accessToken :{
    type : String,
    required:true
  },
  refreshToken :{
    type : String,
    required:true
  }
})

export default mongoose.model('token',tokenSchema)

