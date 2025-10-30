import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import LoadingUI from "../components/LoadingUI";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const[isRateLimited, setRateLimit] = useState(false); 
  const[notes, setNotes] = useState([]);
  const[isLoading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNotes = async () => { //arrowFunc vs nrml func?

      try {
        const res = await axios.get("http://localhost:5001/api/notes/");
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



    {notes.length > 0 && !isRateLimited && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
      {notes.map(note => ( 
        <div> 
          <NoteCard key={note._id} note ={note}/>
        </div>
      )) }



    </div>
)}



  </div>
    );
};


export default HomePage;
