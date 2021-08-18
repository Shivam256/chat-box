
import {firestore,default as firebase} from '../firebase/firebase.utils';
import {getRoom,filterId} from './room.firebase.js';

export const getUserRooms = async (userId) => {
  const userRef = firestore.collection('users').doc(userId);
  const userSnap = await userRef.get();
  console.log(userSnap.data());
  const roomsRef = userSnap.data().rooms.map(rm => rm.id);
  let rooms = roomsRef.map(async id => await getRoom(id));
  return rooms;

}

export const getUser = async (userId) => {
  let url = `/users/${String(userId)}`;
  if(String(userId)[0] === ' '){
    url = `/users/${String(userId).slice(1)}`;
  }

  const userRef = firestore.doc(url);
  const userSnap = await userRef.get();

  return {...userSnap.data(),uid:userId}
}


export const joinRoom = async (userId,roomId) => {
  const userRef = firestore.doc(`/users/${filterId(userId)}`);
  const roomRef = firestore.doc(`/rooms/${filterId(roomId)}`);

  try{
    const newUser = await userRef.update({
      rooms:firebase.firestore.FieldValue.arrayUnion(roomRef)
    });
    console.log(newUser);
  
    const newRoom = await roomRef.update({
      members:firebase.firestore.FieldValue.arrayUnion(userRef)
    })
    console.log(newRoom);
  }catch(err){
    console.log('ERROR IN JOINING ROOM!',err);
  }
}


export const leaveRoom = async (userId,roomId) =>{
  const userRef = firestore.doc(`/users/${filterId(userId)}`);
  const roomRef = firestore.doc(`/rooms/${filterId(roomId)}`);

  try{
    const newUser = await userRef.update({
      rooms:firebase.firestore.FieldValue.arrayRemove(roomRef)
    });
    console.log(newUser);
  
    const newRoom = await roomRef.update({
      members:firebase.firestore.FieldValue.arrayRemove(userRef)
    })
    console.log(newRoom);
  }catch(err){
    console.log('ERROR IN JOINING ROOM!',err);
  }
}


export const addFriend = async (userId,friendId) => {
  const userRef = firestore.doc(`/users/${filterId(userId)}`);
  const friendRef = firestore.doc(`/users/${filterId(friendId)}`);

  const friendCollectionRef = firestore.doc(`/users/${filterId(userId)}`).collection('friends');
  const friendCollectionSnap = await friendCollectionRef.get();
  // console.log(friendCollectionSnap);
  let isAlreadyFriend = false;
  const frd = friendCollectionSnap.docs.filter(doc =>(
    filterId(doc.data().friend.id) === filterId(friendId)
  ))
  isAlreadyFriend = (frd.length>0);

  if(!isAlreadyFriend){
    //make a message collection
    const messageCollectionRef = firestore.collection('messages');
    const messageCollection = await messageCollectionRef.add({
      user1:userRef,
      user2:friendRef,
      messages:[]
    })
    const friendMessageCollection = firestore.doc(`/messages/${filterId(messageCollection.id)}`);
    //make them friends
    const userRes = await friendCollectionRef.add({
      friend:friendRef,
      messageCollection:friendMessageCollection
    })
    const friendRes = await firestore.doc(`/users/${filterId(friendId)}`).collection('friends').add({
      friend:userRef,
      messageCollection:friendMessageCollection
    })

    console.log(userRes);
    
  }else{
    console.log(frd[0].data());
  }

}

export const getUserFriends = async(userId) =>{
  const friendRef= firestore.doc(`/users/${filterId(userId)}`).collection('friends');

  const friendsSnap = await friendRef.get();
  const friends = friendsSnap.docs.map(async doc => await getUser(doc.data().friend.id));
  // console.log(friends);

  return friends;
}