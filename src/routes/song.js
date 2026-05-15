import  Router  from 'router';
import * as authCheck from '../middlewares/authcheck.middleware.js';
import { uploadSong , fetchSongs,fetchSongByArtist,fetchSongById,fetchQuerySearch,deleteSong,playSong } from '../controller/sound.controller.js';
import upload from '../middlewares/upload.middleware.js';

const soundUpload = Router();

// music upload routes.
soundUpload.post(
  "/songs/upload",authCheck.checkAuth,authCheck.checkauthorisation,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadSong
);

 soundUpload.get('/songs/search',authCheck.checkAuth,fetchQuerySearch)
 soundUpload.get("/songs",authCheck.checkAuth,fetchSongs)
 soundUpload.get("/songs/:artist",authCheck.checkAuth,fetchSongByArtist)
 soundUpload.get('/sounds/:id',authCheck.checkAuth,fetchSongById)
 soundUpload.delete('/songs/:id',authCheck.checkAuth,authCheck.checkauthorisation,deleteSong)
 soundUpload.post('/songs/:songId/play',authCheck.checkAuth,playSong)
 

export default soundUpload;
