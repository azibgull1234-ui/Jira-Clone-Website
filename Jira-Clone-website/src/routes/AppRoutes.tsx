import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import ForgotPassword from "../components/auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AppLayout from "../Layout/AppLayout";
import {
  BacklogPage,
  BoardsPage,
  DashboardPage,
  IssuesPage,
  PeoplePage,
  ProjectsPage,
  ReportsPage,
  SettingsPage,
} from "../pages";
import IssueFormPage from "../components/issues/IssueFormPage";
import IssueDetailsPage from "../components/issues/IssueDetailsPage";
import ProjectFormPage from "../components/projects/ProjectFormPage";
import ProjectDetailsPage from "../components/projects/ProjectDetailsPage";
import ProjectBoardPage from "../components/boards/ProjectBoardPage";
import PersonProfilePage from "../components/people/PersonProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/issues/new" element={<IssueFormPage />} />
          <Route path="/issues/:id" element={<IssueDetailsPage />} />
          <Route path="/issues/:id/edit" element={<IssueFormPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<ProjectFormPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/projects/:projectId/edit" element={<ProjectFormPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:projectId" element={<ProjectBoardPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:personId" element={<PersonProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
