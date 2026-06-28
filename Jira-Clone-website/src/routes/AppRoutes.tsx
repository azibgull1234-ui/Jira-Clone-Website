import { Routes, Route } from "react-router-dom";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Registration from "../Page/Registration";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};

export default AppRoutes;