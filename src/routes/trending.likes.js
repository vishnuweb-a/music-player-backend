import  Router  from 'router';

import * as authCheck from '../middlewares/authcheck.middleware.js'
import {trendingSoung} from '../controller/trending.controller.js'

const trending =  Router()


// get trending  song  ...
trending.get('/trending',authCheck.checkAuth,trendingSoung)

export default trending
