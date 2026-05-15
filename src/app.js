import express from 'express'
import connect from './db/db.setup.js'
import router from './routes/user.auth.js'
import soundUpload from './routes/song.js'
import history from './routes/history.js'
import trending from './routes/trending.likes.js'
import playlist from './routes/playlist.song.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/auth', router)
app.use('/api/user', soundUpload)
app.use('/api',playlist)
app.use('/api',history)
app.use('/api',trending)

connect()
export default app
