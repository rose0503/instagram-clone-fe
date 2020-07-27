import React, {useState, createContext, useReducer, useEffect, useContext} from 'react';
import NavBar from './components/NavBar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Home from "./components/Screens/Home"
import Profile from "./components/Screens/Profile"
import Signin from "./components/Screens/Signin"
import Signup from "./components/Screens/Signup"
import CreatePost from "./components/Screens/CreatePost"
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type: "USER", payload:user})
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/signin'>
          <Signin/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route path='/create'>
          <CreatePost/>
        </Route>
      </Switch>  
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (    
      <UserContext.Provider value={{state, dispatch}} >
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
