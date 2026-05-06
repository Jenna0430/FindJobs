 
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";
 
interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: Array<"employer" | "applicant">;
}
 
export function RequireAuth({ children, allowedRoles }: RequireAuthProps): JSX.Element {
  const { user, role, loading } = useAuth();
  const location = useLocation();
 
  if (loading) return <></>;
 
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  // Wrong role → go home
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
 
  return <>{children}</>;
}