import { firestore, default as firebase } from "../firebase/firebase.utils";

export const getRoom = async (roomId) => {
  // console.log(roomId);
  let url = `/rooms/${String(roomId)}`;
  if (String(roomId)[0] === " ") {
    url = `/rooms/${String(roomId).slice(1)}`;
  }
  const roomRef = firestore.doc(url);
  const roomSnapShot = await roomRef.get();
  return { ...roomSnapShot.data(), uid: roomId };
};



export const sendMessageToRoom = async (roomId, message, userId) => {
  let url = `/rooms/${String(roomId)}`;
  if (String(roomId)[0] === " ") {
    url = `/rooms/${String(roomId).slice(1)}`;
  }
  const roomMessage = {
    message,
    author: firestore.doc(`/users/${userId}`),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  await firestore
    .doc(url)
    .collection("messages")
    .add(roomMessage)
    .catch((err) => console.log("error sending message", err));
};

const copyArr = (arr1, arr2) => {
  for (let a of arr1) {
    const temp = { ...a };
    arr2.push(temp);
  }
};



export const getRoomMessages = async (roomId) => {
  let url = `/rooms/${String(roomId)}`;
  if (String(roomId)[0] === " ") {
    url = `/rooms/${String(roomId).slice(1)}`;
  }
  const msgRef = firestore.doc(url).collection("messages");
  let messages = [];
  let copyMessages = [];
  msgRef.onSnapshot(
    (snapshot) => {
      // messages = [...snapshot.docs]
      messages = snapshot.docs.map((doc) => doc.data());
      copyArr(messages, copyMessages);
      // console.log(messages);
    },
    (err) => {
      console.log("error in istening messages!", err);
    }
  );

  return copyMessages;
};


export const deleteMessagesFromRoom = async (roomId) =>{
  let url = `/rooms/${String(roomId)}`;
  if (String(roomId)[0] === " ") {
    url = `/rooms/${String(roomId).slice(1)}`;
  }
  const msgRef = firestore.doc(url).collection("messages");

  const msgSnap = await msgRef.get();
  console.log(msgSnap)
}

export const createNewRoom = async (name,description,imageURL,creatorId) =>{
  console.log(`wrkjnw/${creatorId}`);
  const room = {
    name,
    description,
    imageURL,
    creator:firestore.doc(`/users/${creatorId}`),
    members:[firestore.doc(`/users/${creatorId}`)]
  }
  console.log(room);

  const res = await firestore.collection('rooms').add(room).catch(err => {
    console.log('error creating room',err);
  })
  console.log(res);
  const currnetRoomDoc = firestore.doc(`/rooms/${res.id}`);

  //add the room to the user
  const userRef = firestore.doc(`/users/${creatorId}`);
  const userSnap = userRef.get();
  const currentRooms = (await userSnap).data().rooms;
  const userRes = await userRef.set({
    rooms:[...currentRooms,currnetRoomDoc]
  },{merge:true})
  

}

export const getAllRooms = async () => {
  const roomsRef = firestore.collection('rooms');
  const roomSnap = await roomsRef.get();

  const rooms = roomSnap.docs.map(async doc => await getRoom(doc.id))
  // console.log(rooms);
  return rooms;
}