import React, {createContext, useReducer, useEffect, useContext} from 'react';
import NavBar from './components/NavBar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Home from "./components/Screens/Home"
import Profile from "./components/Screens/Profile"
import Signin from "./components/Screens/Signin"
import Signup from "./components/Screens/Signup"
import CreatePost from "./components/Screens/CreatePost"
import UserProfile from "./components/Screens/UserProfile"
import SubscribedUserPosts from "./components/Screens/SubUserPost"
import Reset from "./components/Screens/Reset"
import NewPassword from './components/Screens/NewPassword'
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
      if(!history.location.pathname.startsWith('/reset'))
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
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route path='/create'>
          <CreatePost/>
        </Route>
        <Route path='/profile/:userid'>
          <UserProfile/>
        </Route>
        <Route path='/myfollowingpost'>
          <SubscribedUserPosts />
        </Route>
        <Route exact path='/reset'>
          <Reset />
        </Route>
        <Route path='/reset/:token'>
          <NewPassword />
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

