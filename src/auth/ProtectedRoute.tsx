import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import type { Role } from "../models/DecodedToken";
import { useAuth } from "./useAuth";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: Role | Role[];
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const rolesToCheck: Role[] = Array.isArray(requiredRole)
    ? requiredRole
    : requiredRole
      ? [requiredRole]
      : [];

  if (
    rolesToCheck.length > 0 &&
    !rolesToCheck.some((role) => user.roles.includes(role))
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
