import  Router  from 'router';

import * as authCheck from '../middlewares/authcheck.middleware.js';

import {addSong,createPlaylist,allPlaylist,deleteSong,deletePlaylist} from "../controller/playlist.controller.js"


const playlist = Router()



// creating a playlist


playlist.post('/playlist/create',authCheck.checkAuth,createPlaylist)


// deleting a playlist 

playlist.delete('/playlist/:playlistId',authCheck.checkAuth,deletePlaylist)




// adding song to  playlist
playlist.post(

  '/playlist/:playlistId/addSong/:songId',

  authCheck.checkAuth,

  addSong

)

// deleting  song from playlist

playlist.delete('/playlist/:playlistId/deleteSong/:songId',authCheck.checkAuth,deleteSong)



// fetching all the playlist 
playlist.get('/playlist',authCheck.checkAuth,allPlaylist) 





export default playlist