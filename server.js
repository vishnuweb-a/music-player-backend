import app from './src/app.js'

import credential from './src/config/config.js'


// starting the server .
app.listen(credential.port,()=>{
  console.log("server is on running status .")
})
