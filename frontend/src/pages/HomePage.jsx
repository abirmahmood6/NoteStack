import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios.js";
import NoNotesUI from "../components/noNotesUI.jsx";
import RateLimitedUI from "../components/RateLimitedUI";
import LoadingUI from "../components/LoadingUI";

const HomePage = () => {
  const[isRateLimited, setRateLimit] = useState(false); 
  const[notes, setNotes] = useState([]);
  const[isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => { //arrowFunc vs nrml func?
      try {
        const res = await api.get("/notes");
        console.log(res.data)
        setNotes(res.data)
        setRateLimit(false) // if we able to fetch the notes, then ratelimited is false. As, if backend sees it is ratelimited, we retrieve errorCode 429 instead of notes.
      } catch (error) {
        console.log("Error Fetching Notes", error)

        // check if RateLimited then return rateLimitedUI
        if (error.response?.status === 429){
          setRateLimit(true)
        } else {
          toast.error("Failed to Load Notes")
        }

      } finally {
        setLoading(false) // whether the TRY block works or the CATCH block, in both case the loading is over thus we set to false.
      }
  };
  fetchNotes();
  },[]);

  return ( 
  <div className='min-h-screen'> {/* Parent Element */}
    <Navbar/> 
    {isRateLimited && <RateLimitedUI/>} {/* why here and not under useEffect()? */}

    <div className="max-w-7xl mx-auto p-4 mt-6"> 
      {isLoading && <LoadingUI/>}
    </div>

    {/* If no Notes exist, then show a UI to indicate that */}
    {notes.length === 0 && <NoNotesUI/>}

    {/* UNDERSTAND the NOTECARD and this section !!!!!! */}
    {notes.length > 0 && !isRateLimited && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Screen Sizes - 
      if screen is small(default) - 1column(top to bottom), if md - 2 columns, if lg- 3 columns*/}
      {notes.map(note => ( 
        <div> 
          <NoteCard key={note._id} note ={note} setNotes ={setNotes}/> {/*we pass setNotes to be used in NoteCard*/}
        </div>
      )) }
      {/*
      .map: basically it takes each item in your notesArray(each note) and return something new (like make a NoteCard out of it)
      you have a list of raw potatoes (your array)
      .map() peels and fries each one (your callback function)
      and gives you back a new list of fries 🍟 (the transformed array)
      */}
    </div>
  )}
  </div>
  );
};

export default HomePage;
