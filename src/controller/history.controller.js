import User from '../model/user.model.js'
import Token from '../model/token.model.js'
import Sound from '../model/music.model.js'
import History from '../model/history.model.js'


/**
 * - get : /api/history
 * - give all  the history of  the song played 
 */

export const getAllPlayedSongs = async (req,res)=>{
  try{
    const history = await History.find({
      userId:req.body
    })
    if(!history){
      return res.status(401).json({
        "return":"no  history yet !!"
      })
    }
    return res.status(200).json({
      "response":"history has been fetched ",
       history
    })
  }catch(err){
    return res.status(500).json({
      "response":err.message
    })
  }
}

/**
 *- get : /api/history/:songId
 * -  get song by id in search 
 */
export const getSongById =  async (req,res)=>{
  try{
      
    const songId = req.params.songId

   const history = await History.find({

  userId: req.user._id

}).populate("songId")


   if(!history){
    return res.status(401).json({
      "response":"no history found !!"
    })

   }
   return res.status(200).json({
    "response":"song has been fetched !!",
    history
   })
     
  }catch(err){
    return res.status(500).json({
      "response":err.message
    })
  }
}


