import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NewSoftware from "../pages/NewSoftware";
import NewHardware from "../pages/NewHardware";
import UnAuthorized from "../pages/UnAuthorized";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import SideBarLayout from "../layouts/SideBarLayout";
import StudentList from "../pages/StudentList";
import FacultyList from "../pages/FacultyList";
import Inbox from "../pages/Inbox";
import DashBoard from "../pages/DashBoard";
import NewSoftwareRegister from "../pages/NewSoftwareRegister";
import NewHardwareRegister from "../pages/NewHardwareRegister";
const RoutePath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<SideBarLayout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRole={["STUDENT", "ADMIN", "FACULTY"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-software"
            element={
              <ProtectedRoute allowedRole={["ADMIN"]}>
                <NewSoftware />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-hardware"
            element={
              <ProtectedRoute allowedRole={["ADMIN"]}>
                <NewHardware />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-list"
            element={
              <ProtectedRoute allowedRole={["ADMIN"]}>
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-list"
            element={
              <ProtectedRoute allowedRole={["ADMIN"]}>
                <FacultyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox/:id"
            element={
              <ProtectedRoute allowedRole={["FACULTY", "ADMIN"]}>
                <Inbox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute allowedRole={["ADMIN", "FACULTY", "STUDENT"]}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-software"
            element={
              <ProtectedRoute allowedRole={["ADMIN", "FACULTY", "STUDENT"]}>
                <NewSoftwareRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-hardware"
            element={
              <ProtectedRoute allowedRole={["ADMIN", "FACULTY", "STUDENT"]}>
                <NewHardwareRegister />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/un-authorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutePath;
