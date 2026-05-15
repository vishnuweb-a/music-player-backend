import  Router  from 'router';

import * as authCheck from '../middlewares/authcheck.middleware.js';
import {getAllPlayedSongs,getSongById} from '../controller/history.controller.js'


const history = Router();


history.get('/history',authCheck.checkAuth,getAllPlayedSongs)
history.get('/history/:song',authCheck.checkAuth,getSongById)



export default history;
