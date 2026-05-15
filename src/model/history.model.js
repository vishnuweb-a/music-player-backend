import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
  userId :{
    type : mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  songId :{
    type : mongoose.Schema.Types.ObjectId,
    ref:"music",
    required:true
  
  },

  playedAt :{
    type : Date,
    default :  Date.now

  }
})

export default mongoose.model('history',historySchema)