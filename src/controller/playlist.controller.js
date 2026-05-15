import User from '../model/user.model.js'
import Token from '../model/token.model.js'
import Sound from '../model/music.model.js'
import Playlist from '../model/playlist.model.js'

// creating a playlist

export const createPlaylist = async (req,res)=>{
  try{

    const {title,ispublic} = req.body
    const userId = req.user.id
    const playlist = await Playlist.create({
      title,
      ispublic,
      userId
    })

    if(!playlist){
      return res.status(401).json({
        "response":"playlist not created !!"
      })
    }

    return res.status(201).json({
      "response":"playlist created successfully !!",
      playlist
    })

  }catch(err){
    return res.status(500).json({
      error: err.message
    });
  }
}

// adding song  to playlist 
export const addSong = async (req,res)=>{
  try{

    const{playlistId,songId} = req.params
    console.log(playlistId,songId)

    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
      return res.status(401).json({
        "response":"playlist not found "
      })
    }
    console.log(playlist)

    playlist.songs.push(songId)
    await  playlist.save()
     return res.status(200).json({
      "response":"song added successfully to playlist ✅"
     })


  }catch(err){
    return res.status(500).json({
      error: err.message
    });
  
  }
}

// fetching all the song of playlist

/**
 * - /api/playlist
 * - get all the playlist 
 */

export const allPlaylist = async (req,res)=>{
  try{

    const playlist = await Playlist.find({ })
    if(!playlist){
      return res.status(401).json({
        "response":"playlist not found !!"
      })
    }
    return res.status(200).json({
      playlist
    })

  }catch(err){
    return res.status(500).json({
      error: err.message
    });
  }
}

/**
 * - /api/playlist/:playlistId/deleteSong/:songId
 * - delete song from the current playlist
 */

export const deleteSong = async (req,res)=>{
  try{

    const{playlistId,songId} = req.params
   // console.log(playlistId,songId)
   await Playlist.findByIdAndUpdate(

  playlistId,

  {
    $pull: {
      songs: songId
    }
  }
)

   return res.status(200).json({
    "response":"song deleted successfully !!"
   })

  }catch(err){
    return res.status(500).json({
      "response":err.message
    })
  }
}

/**
 * - /api/playlist/:playlistId
 *  - delete a playlist from database
 */

export const deletePlaylist = async (req,res)=>{
   try{

    const {playlistId} = req.params
    const delPlaylist = await Playlist.findByIdAndDelete(playlistId)
    if(!delPlaylist){
      return res.status(401).json({
        "response":"playlist not found !!"
      })

    }

    return res.status(200).json({
      "response":"playlist has been deleted !!",
      delPlaylist
    })


   }catch(err){
    return res.status(500).json({
      "response":err.message
    })
   }
}









