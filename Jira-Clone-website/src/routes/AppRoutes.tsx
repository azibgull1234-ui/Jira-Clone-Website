import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Registration from "../Page/Registration";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};

export default AppRoutes;