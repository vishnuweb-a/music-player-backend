import router from 'router'
import * as authController from '../controller/auth.controller.js'
import * as authMiddleware from '../middlewares/authcheck.middleware.js'
 
const   Router  = router()



Router.post("/register",authController.userAuth)
Router.post('/login',authController.userLogin)
Router.delete('/logout',authMiddleware.checkAuth,authController.userLogout)




export default Router

