import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import AddEvent from "@/pages/AddEvent";
import LinkedInPost from "@/pages/LinkedInPost";
import Navbar from "@/components/ui/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/linkedin-post" element={<LinkedInPost />} />
      </Routes>
    </Router>
  );
}

export default App;