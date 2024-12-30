import { useState } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import FreePlan from './pages/FreePlan';
import PaidPlan from './pages/PaidPlan';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Payment from './pages/Payment';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './assets/Navbar';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route path="/" element={<Home />} />
        <Route path="/free" element={<FreePlan />} />
        <Route path="/premium" element={<ProtectedRoute> <PaidPlan /> </ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/payment" element={  <Payment /> }/>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const Root = () => {
  return (
    <div>
      < Navbar />
      < Outlet />
    </div>
  );
};
export default App;
