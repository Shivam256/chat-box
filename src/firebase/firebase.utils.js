import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgFostF1gZM0vrJJn4l74I_0WPKvPPEiU",
  authDomain: "chat-app-1-58537.firebaseapp.com",
  projectId: "chat-app-1-58537",
  storageBucket: "chat-app-1-58537.appspot.com",
  messagingSenderId: "915210894224",
  appId: "1:915210894224:web:d08bbf246bc8dc3423d115",
  measurementId: "G-E0G31RN4CY"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();



export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({promot:"select_account"});

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// export const signInWithGoogle = () => {
//   auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     return auth.signInWithPopup(googleProvider)
//   })
// }

export const createUserDoc = async (userAuth,additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const userSnap = await userRef.get();

  if(!userSnap.exists()){
    const {displayName,email,photoURL} = userAuth;
    const createdAt = new Date();


    try{
      await userRef.set({
        username:displayName,
        email,
        profilePic:photoURL,
        createdAt,
        ...additionalData
      })
    }
    catch(err){
      console.log('error creating user',err);
    }

  }

  return userRef;
}

export const saveUserDoc = async (user) => {
  // const data = await firestore.collection('users').get();
  // console.log(data);
  const userRef = firestore.collection('users').doc(user.uid);
  const userSnap = await userRef.get();

  if(!userSnap.exists){
    const {displayName,email,photoURL} = user;
    const createdAt = new Date();

    try{
      await userRef.set({
        username:displayName,
        email,
        profilePic:photoURL,
        createdAt
      })
    }catch(err){
      console.log('error creating user!',err);
    }
  }

  return userRef;
}



export default firebase;
