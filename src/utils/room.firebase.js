import { firestore, default as firebase } from "../firebase/firebase.utils";

export const getRoom = async (roomId) => {
  console.log(roomId);
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
  const observer = msgRef.onSnapshot(
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
  // console.log(copyMessages);
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