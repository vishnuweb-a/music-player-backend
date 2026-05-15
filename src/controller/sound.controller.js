import User from '../model/user.model.js'
import Token from '../model/token.model.js'
import Sound from '../model/music.model.js'
import history from '../model/history.model.js'
import jwt from 'jsonwebtoken'
import credential from '../config/config.js'



// for posting the song 
/**
 * - post  :  /api/user/upload
 * - used to upload the song 
 */
export const uploadSong = async (req, res) => {

  try {
         const token = req.cookies.refreshToken
        
     const    decoded = jwt.verify(token,credential.secretKey)
         
    // uploaded file urls
    const audioUrl = req.files.audio[0].path;

    const thumbnailUrl = req.files.thumbnail[0].path;

    // body data
    const { title, artist, genre,likes=0 } = req.body;

    // save to db later
    // await Song.create({...})
    const uploadedSong = await Sound.create({
      title,
      artist,
      genre,
      songurl: audioUrl,
      thumnailUrl: thumbnailUrl,
      createdBy : decoded.id,
    })
     if(!uploadedSong){
       return res.status(401).json({
        "response":"song not uploaded !!"
      })
     }

    return res.status(201).json({

      response: "Song uploaded successfully",

      data: {
        title,
        artist,
        genre,
        audioUrl,
        thumbnailUrl,
        createdBy : decoded.id
      }
    });

    

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });
  }
}

// for fetching all the songs 

/**
 * - get :  /api/user/songs
 * - use to get all the song  
 */

export const fetchSongs = async (req,res)=>{
  try{

    const song = await Sound.find()
    if(!song){
      return res.status(401).json({
        "response" :"song not found !"
      })
    }
    res.status(200).json({
      song
    })

  }catch(err){
    return res.status(500).json({
      error: err.message
    });
  }
}

// for fetching song  by artist 

/**
 * - get :/api/user/songs/:artist
 * - help to search song by  artist name 
 */

export const fetchSongByArtist = async (req,res)=>{
  try{

    const artist = req.params.artist
    
    const song = await Sound.find({artist})
    if(!song){
      return res.status(401).json({
        "response":"no soung found by  his name !!"
      })
    }

      return  res.status(200).json({
       song
    })

  }catch(err){
       return res.status(500).json({
        "response":err.message
       })
  }
}

// for fetching song by id 

/**
 * - get : /api/user/songs/:id 
 * -  help to fetch song by id 
 */

export const fetchSongById = async (req,res)=>{
  try{
      
    const id = req.params.id
    
    const uniSong = await Sound.findOne({
      _id : id
    })
    console.log(uniSong)
    if(!uniSong){
      return res.status(404).json({
        "response":"song not found !!"
      })
    }
    return res.status(200).json({
      uniSong
    })
  }catch(err){
    return res.status(500).json({
      "ressponse": err.message
    })
  }
}

// query search 

/**
 * - get : /api/user/songs/search 
 * - help to search song dynamically (query search)
 */

export const fetchQuerySearch = async (
  req,
  res
) => {

  try {

    // remove extra spaces
    const query = req.query.q.trim()
    console.log("SEARCH CONTROLLER HIT")

    

    const songs = await Sound.find({

      $or: [

        // title
        {
          title: {
            $regex: query,
            $options: "i"
          }
        },

        // artist
        {
          artist: {
            $regex: query,
            $options: "i"
          }
        },

        // genre
        {
          genre: {
            $regex: query,
            $options: "i"
          }
        }

      ]
    })

   

    if (!songs.length) {

      return res.status(404).json({
        response: "No songs found"
      })
    }

    return res.status(200).json({
      totalSongs: songs.length,
      songs
    })

  } catch (err) {

    return res.status(500).json({
      response: err.message
    })
  }
}

//deleting  the  song 
/**
 * - delete :  /api/user/songs/:id
 * - delete  song by  id   
 */ 

export const deleteSong = async (req,res)=>{
  try {

    const id = req.params.id
    const delSong = await Sound.findByIdAndDelete({
      _id : id
    })
    if(!delSong){
      return res.status(401).json({
        "response":"no sound found to  delete  !!"
      })

    }
    return res.status(200).json({
      "response" :"song deleted successfully !"
    })




  }catch(err){
     return res.status(500).json({
      error: err.message
    });
  }

}

/**
 * -post /api/user/songs/:songId/play
 * - play the song 
 */

export const playSong = async (req,res)=>{
  try{
    const songId = req.params.songId
    const song = await Sound.findById(songId)
    if(!song){
      return res.status(401).json({
        "response":"song not found !!"
      })
    }

    await Sound.findByIdAndUpdate({
      _id:songId
    },{
      $inc:{
        likes:1
      }
    })

    const historyAppend = history.findByIdAndUpdate(
      {
        userId:req.body,
      },{
     $inc:{
      userId:req.body,
      songId:songId,
      playedAt:Date.now()
  }})
       if(!historyAppend){
          await history.create({
            userId:req.body,
            songId:songId,
            playedAt:Date.now()
          })
      }
       return res.status(200).json({
        "response":"song played and updated the history !!",
        historyAppend
       })

  }
    
  catch(err){
    return res.status(500).json({
      "response":err.message
    })
  }
}








