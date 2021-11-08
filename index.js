import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import router from './router/index.js'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router)


async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}

startApp();