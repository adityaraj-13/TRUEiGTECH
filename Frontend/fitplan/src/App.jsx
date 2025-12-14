import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrainerDashboard from './pages/TrainerDashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PlanDetail from "./pages/PlanDetail";
import UserFeed from "./pages/UserFeed";
import TrainerProfile from "./pages/TrainerProfile";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/trainer" element={<TrainerDashboard/>}></Route>
          <Route path="/plans/:id" element={<PlanDetail />} />
          <Route path="/feed" element={<UserFeed />} />
          <Route path="/trainers/:trainerId" element={<TrainerProfile />} />
      </Routes>
    </Router>
  )
}

export default App;
