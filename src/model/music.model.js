import mongoose from 'mongoose'

const musicSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true
  },
  songurl:{
    type:String,
    required:true,
    unique:true
  },
  artist:{
    type:String,
    required:true,
   
  },
  thumnailUrl:{
    type:String,
    required:true,
    unique:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  genre:{
    type:String,
    required:true
  },
  
  likes:{
    type:Number,
    default:0
  }
})

export default mongoose.model("music",musicSchema)