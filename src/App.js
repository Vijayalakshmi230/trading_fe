import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './App.css';
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import History from "./components/dashboard/History"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set Auth Token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwtDecode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  

  // Check for expired token
  const currentTime = Date.now() / 1000; // in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* </Routes>
            <Routes> */}
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/history" component={History} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
