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
import EndCourse from "./pages/EndCourse";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/map" element={<Map/>} />      
        <Route path="*" element={<h1>NotFound</h1>} />
        <Route path="/route" element={<RouteWalk/>} />
        <Route path="/endcourse" element={<EndCourse/>} />
      </Route>
    )
  );
  
  function Router() {
    return <RouterProvider router={router} />;
  }
  
  export default Router;