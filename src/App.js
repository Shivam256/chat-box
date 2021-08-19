import React, { useState, useEffect ,useRef} from "react";
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
import { auth, createUserDoc } from "./firebase/firebase.utils";

//libs
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useHistory} from 'react-router-dom';

const App = ({ currentUser, setCurrentUser }) => {
  let unsubscribeFromAuth = useRef(null);
  let history = useHistory();
  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserDoc(userAuth);
        console.log(userRef);

        userRef.onSnapshot((snapshot) => {
          // console.log(snapshot);
          setCurrentUser({
            uid: snapshot.id,
            ...snapshot.data(),
          });
        });
      }else{
        // console.log("YOU SIGNED OUT!");
        setCurrentUser(userAuth);
        history.push('/');
      }
      setCurrentUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth.current();
    };
  }, []);
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
          render={() =>
            currentUser ? (
              <Room />
            ) : (
              <div className="loader-container">
                {" "}
                <Loader
                  type="TailSpin"
                  color="#7209B7"
                  height={80}
                  width={80}
                />
              </div>
            )
          }
        />

        <Route
          exact
          path="/rooms/:id"
          render={() =>
            currentUser ? (
              <Room />
            ) : (
              <div className="loader-container">
                {" "}
                <Loader
                  type="TailSpin"
                  color="#7209B7"
                  height={80}
                  width={80}
                />
              </div>
            )
          }
        />
        <Route
          exact
          path="/home"
          render={() =>
            currentUser ? (
              <Home />
            ) : (
              <div className="loader-container">
                {" "}
                <Loader
                  type="TailSpin"
                  color="#7209B7"
                  height={80}
                  width={80}
                />
              </div>
            )
          }
        />
        <Route
          exact
          path="/home/:id"
          render={() =>
            currentUser ? (
              <Home />
            ) : (
              <div className="loader-container">
                {" "}
                <Loader
                  type="TailSpin"
                  color="#7209B7"
                  height={80}
                  width={80}
                />
              </div>
            )
          }
        />
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
