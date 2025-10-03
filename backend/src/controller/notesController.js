export function getAllNotes(req, res) { //You (the client) tell the waiter what you want (req = request).
  // send the notes or waiter goes to kitchen
  res.status(200).send("you got 5 notes"); //The waiter brings back your food (res = response).
}

export function postNotes(req, res){
  res.status(201).json(message="Post created succesfully");
}

export function updateNotes(req, res) {
  res.status(200).json(message="Post updated succesfully");
}

export function deleteNotes(req, res) {
  res.status(200).json(message="Post deleted succesfully");
}