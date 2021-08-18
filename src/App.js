import React, { useState, useEffect } from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";

//components
import SignIn from "./pages/sign-in/sign-in.component";
import Room from "./pages/room/room.component";
import Home from "./pages/home/home.component";

//redux
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";

//utils
// import {auth,createUserDoc} from './firebase/firebase.utils';

const App = ({ currentUser, setCurrentUser }) => {
  // const [unsubscribe,setUnsubscribe] = useState(null);

  // useEffect(()=>{
  //   setUnsubscribe(auth.onAuthStateChanged(async userAuth =>{
  //     if(userAuth){
  //       const userRef = createUserDoc(userAuth);
  //       userRef.onSnapshot(snapShot => {
  //         setCurrentUser({
  //           id:snapShot.id,
  //           ...snapShot.data()
  //         })
  //       })
  //     }
  //     setCurrentUser(userAuth);

  //     return () => {
  //       unsubscribe()
  //     }
  //   }))
  // },[])
  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (currentUser ? <Redirect to="/rooms" /> : <SignIn />)}
        />
        <Route
          exact
          path="/rooms"
          render={() => (currentUser ? <Room /> : <SignIn />)}
        />

        <Route exact path="/rooms/:id" render={()=>(currentUser?<Room/>:<SignIn/>)} />
        <Route exact path="/home" render={()=>(currentUser?<Home/>:<SignIn/>)} />
        <Route exact path="/home/:id" render={()=>(currentUser?<Home/>:<SignIn/>)} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
