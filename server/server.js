import 'dotenv/config'
import express from "express"
import { ConnectDataBase } from './Config/database.js'
import user from './routes/userRoute.js'
import blog from './routes/blogRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {v2 as cloudinary} from "cloudinary"
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js'
import { Server } from 'socket.io'
import http from "http"
import sockets from './sockets/routes.js'
import chat from "./routes/chatRoute.js"

//connect database
ConnectDataBase()


const corsOptions = {
    origin:'https://blog-gram.onrender.com',
    credentials: true, 
}


const app = express()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))

const httpServer = http.createServer(app)
// const io = new Server(httpServer,{
//     cors:{
//         origin:['https://blog-gram-server.onrender.com'],
//     },
// })


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
});


app.use("/api/v1",user)
app.use("/api/v1",blog)
app.use("/api/v1",chat)

app.get("/", (req, res) => {
  res.send("API IS HOT");
});


app.use(notFound)
app.use(errorHandler)

// io.on('connection',sockets)


//server
httpServer.listen(process.env.PORT || 3001 , ()=>{
    console.log(`Server Running on Port ${process.env.PORT}`)
})