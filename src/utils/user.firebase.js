import {firestore} from '../firebase/firebase.utils';
import {getRoom} from './room.firebase.js';

export const getUserRooms = async (userId) => {
  const userRef = firestore.collection('users').doc(userId);
  const userSnap = await userRef.get();
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

