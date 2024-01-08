import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
import Onboarding from './pages/Onboarding'

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate to="/Onboarding" replace />} />
        <Route path="/Onboarding" element={<Onboarding/>} />   
        <Route path="*" element={<h1>NotFound</h1>} />
      </Route>
    )
  );
  
  function Router() {
    return <RouterProvider router={router} />;
  }
  
  export default Router;