import React from 'react';
import './sign-in.styles.scss';

//material ui
import ForumIcon from '@material-ui/icons/Forum';
import {signInWithGoogle,saveUserDoc} from '../../firebase/firebase.utils';

import {setCurrentUser} from '../../redux/user/user.actions';
import {connect} from 'react-redux';

const SignIn = ({setCurrentUser}) => {
  // let unsubscribe = null;
  const signIn = async () => {
    const userObj = await signInWithGoogle();
    setCurrentUser(userObj.user);
    // console.log(userObj);
    // const userRef =await createUserDoc(userObj.user);
    const userRef = await saveUserDoc(userObj.user);
    const userSnap = await userRef.get();
    console.log(userSnap.data());
    
    
    
  }
  return (
    <div className="sign-in-page">
      <div className="sign-in-card">
        <ForumIcon/>
        <div className="sign-in-text">SIGN IN WITH</div>
        <button className="sign-in-btn" onClick={signIn}>GOOGLE</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user => dispatch(setCurrentUser(user))
})


export default connect(null,mapDispatchToProps)(SignIn);
