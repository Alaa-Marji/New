import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import BarChar from "./Pages/BarChart";
import Block from "./Pages/Block";
// import ContractRequests from "./Pages/ContractRequests";
import LineChar from "./Pages/LineChart";
import PieChar from "./Pages/PieChart";
import Posts from "./Pages/Posts";
import Reports from "./Pages/Reports";
import Users from "./Pages/Users";
import Login from "./Pages/Auth/Login";
import Roles from "./Pages/Roles";
import AddEmployee from "./Pages/AddEmployee";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/Employee" element={<AddEmployee />} />
        <Route path="/BarChart" element={<BarChar />} />
        <Route path="/LineChart" element={<LineChar />} />
        <Route path="/PieChart" element={<PieChar />} />

        <Route path="/Block" element={<Block />} />
        {/* <Route path="/CompaniesRegistration" element={<ContractRequests />} />
        <Route path="/PieChart" element={<PieChart />} /> */}
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
