import React from 'react';
import NavBar from './components/NavBar'
import "./App.css"
import {BrowserRouter, Route} from "react-router-dom"
import Home from "./components/Screens/Home"
import Profile from "./components/Screens/Profile"
import Signin from "./components/Screens/Signin"
import Signup from "./components/Screens/Signup"
import CreatePost from "./components/Screens/CreatePost"

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
