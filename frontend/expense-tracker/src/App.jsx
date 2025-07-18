import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/userContext";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} /> 
            <Route path="/signup" exact element={<SignUp />} /> 
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>

        <Toaster toastOptions={{
          className: "",
          style: {
            fontSize: '13px',
          },
        }}
        />
      </UserProvider>
    </div>
  );
};

export default App;

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    
    if (!payload.exp) return false;

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return payload.exp > now;
  } catch (error) {
    console.error("Invalid token format", error);
    return false;
  }
};

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = isTokenValid();

  // Redirect to dashboard if Authenticated, otherwise to login

  return isAuthenticated ? (
    <Navigate to ="/dashboard" />
   ) : (
    <Navigate to="/login" />
   );
};
