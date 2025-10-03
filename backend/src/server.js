import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

const app = express(); //creating express application

// separate the routes to a different folder, here .use, and call routes from other file

// in notesRoutes, take the RES instructions into a separate "notesController" file, and have them as functions, you can call them in the routes file, also change the routes appropiately, e.g - /api/notes, api/posts
// The idea is to have our server.js and other files organzied 

// each of this are called "Routes"
app.use("/api/notes", notesRoutes);



app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
