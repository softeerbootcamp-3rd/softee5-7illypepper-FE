import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Map from './pages/Map'
import RouteWalk from "./components/RouteWalk";
import React from "react";
import NavTime from "./pages/NavTime"
import NavDest from "./pages/NavDest"
import SignupNickname from "./pages/SignupNickname";
import SignupInterest from "./pages/SignupInterest";
import Home from "./pages/Home"
import NavTheme from "./pages/NavTheme";
import EndCourse from "./pages/EndCourse";
import ExitGuide from "./components/ExitGuide";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/onboarding" element={<Onboarding/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/navtime" element={<NavTime/>}/> 
        <Route path="/map" element={<Map/>} />      
        <Route path="*" element={<h1>NotFound</h1>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/route" element={<RouteWalk/>}/>
        <Route path="/navdest" element={<NavDest/>}/>
        <Route path="/navtheme" element={<NavTheme/>}/>
        <Route path="/signupnickname" element={<SignupNickname/>}/>
        <Route path="/signupinterest" element={<SignupInterest/>}/>
        <Route path="/route" element={<RouteWalk/>} />
        <Route path="/endcourse" element={<EndCourse/>} />
        <Route path="/eg" element={<ExitGuide/>} />
      </Route>
    )
  );
  
  function Router() {
    return <RouterProvider router={router} />;
  }
  
  export default Router;