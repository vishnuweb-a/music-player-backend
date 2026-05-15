import Sound from '../model/music.model.js'
import History from '../model/history.model.js'



/**
 * - get  /api/trending 
 * - gives  the trending  songs from the  database  
 * 
 */

export const trendingSoung  =  async (req,res)=>{
  try{

  const trendingSongs = await History.aggregate([

  // group by songId
  {
    $group: {

      _id: "$songId",

      totalPlays: {
        $sum: 1
      }

    }
  },

  // sort descending
  {
    $sort: {
      totalPlays: -1
    }
  },

  // top 10 songs
  {
    $limit: 10
  }

])

return res.status(200).json({
  trendingSongs
})


  }catch(err){
    return res.status(500).json({
      "response":err.message
    })
  }
}

