import dotenv from 'dotenv'

dotenv.config()


if(!process.env.PORT || !process.env.MONGODB_URL|| !process.env.SECRET_KEY|| !  process.env.REFRESH_KEY){
  console.log("env keys are missing !!.")
}

const credential = {
  mongourl :  process.env.MONGODB_URL,
  port : process.env.PORT,
  secretKey : process.env.SECRET_KEY,
  refresh_key : process.env.REFRESH_KEY
}





export  default credential