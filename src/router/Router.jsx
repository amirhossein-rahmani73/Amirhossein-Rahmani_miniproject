import { Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/404Page";

function Router() {
  return (
    <Routes>
      <Route index element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
