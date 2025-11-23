import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path"

// CONTINUE: i) COMMIT FIRST: completed controllers
//           2) start MiddleWare & Rate limiting! (1hour,26min)

dotenv.config(); // it tells the dotenv package to load all the environment variables from your .env file into process.env.   in line 11 [process.env.port] So proces is a global variable, having the dotenv.config loads the environment variables so your process variable can use the variables you have in .env.

const app = express(); //creating express application
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// separate the routes to a different folder, here .use, and call routes from other file

// in notesRoutes, take the RES instructions into a separate "notesController" file, and have them as functions, you can call them in the routes file, also change the routes appropiately, e.g - /api/notes, api/posts
// The idea is to have our server.js and other files organzied 

// To devlopment we have two different domains, in PRODUCTION we have one domain as the frontend will be under backend and not separately run
//middlewares----- If not in production, use cors and connect the two domains
if (process.env.NODE_ENV !== "production"){ // we use cors in devlopment when working two domains separately
  app.use(
    cors({
    origin: "http://localhost:5173",
  }))
} 

app.use(express.json()) // this middleWare will give me access to req.body 
// ** middleware, its bridge between client(req) and backend server(res) **
app.use(rateLimiter);
//-------------

// each of this are called "Routes"
app.use("/api/notes", notesRoutes);

//production - If in production, we run one domaim
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  // if in production, go ahead and serve the react application which is under frontend/dist/index.html
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
}



connectDB().then(() => { //.then()=> function first connects to DB, then runs server. Because if database connection fails, whats the point of starting the app.
  app.listen(5001, () => {
  console.log("Server started on PORT: ", PORT);
  });
})


