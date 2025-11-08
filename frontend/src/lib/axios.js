import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // the reason why we don't include '/notes/' in the URL and set it manually in every file is because if we have a new feature later e.g - authentication then we can just have this URL call and in the specific files, we can pass '/note' or '/auth', etc accordlingly.
});

export default api;
