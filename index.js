import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.json())

async function startApp() {
  try {
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}

startApp();