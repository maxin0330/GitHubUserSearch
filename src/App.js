import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Following from "./components/Following";
import Followers from "./components/Followers";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route exact path="/user/:username" element={<Profile />} />
          <Route path="/user/:username/following" element={<Following />} />
          <Route path="/user/:username/followers" element={<Followers />} />
        </Routes>
      </div>
    </Router>
  );
}
