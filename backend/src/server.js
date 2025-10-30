import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// CONTINUE: i) COMMIT FIRST: completed controllers
//            2) start MiddleWare & Rate limiting! (1hour,26min)

dotenv.config(); // it tells the dotenv package to load all the environment variables from your .env file into process.env.   in line 11 [process.env.port] So proces is a global variable, having the dotenv.config loads the environment variables so your process variable can use the variables you have in .env.

const app = express(); //creating express application
const PORT = process.env.PORT || 5001

// separate the routes to a different folder, here .use, and call routes from other file

// in notesRoutes, take the RES instructions into a separate "notesController" file, and have them as functions, you can call them in the routes file, also change the routes appropiately, e.g - /api/notes, api/posts
// The idea is to have our server.js and other files organzied 

//middlewares-----
app.use(
  cors({
  origin: "http://localhost:5173",
})
)
app.use(express.json()) // this middleWare will give me access to req.body 
// ** middleware, its bridge between client(req) and backend server(res) **
app.use(rateLimiter);
//-------------

// each of this are called "Routes"
app.use("/api/notes", notesRoutes);

connectDB().then(() => { //.then()=> function first connects to DB, then runs server. Because if database connection fails, whats the point of starting the app.
  app.listen(5001, () => {
  console.log("Server started on PORT: ", PORT);
  });
})


