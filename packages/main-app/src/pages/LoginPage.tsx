import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthPage } from "@findjobs/shared-ui";
import { useAuth } from "../context/AuthContext";
import { useAuthPageSubmit } from "../hooks/useAuthPageSubmit";
import type { JSX } from "react";
 
function LoginPage(): JSX.Element {
  const { user, loading } = useAuth();
  const navigate          = useNavigate();
  const location          = useLocation();
  const handleSubmit      = useAuthPageSubmit();
 
  // Redirect destination preserved by RequireAuth
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";
 
  // Don't flash the login form if the user is already signed in
  if (loading) return <></>;
  if (user)    return <Navigate to={from} replace />;
 
  return (
    <AuthPage
      onSubmit={handleSubmit}
      onSuccess={() => navigate(from, { replace: true })}
    />
  );
}
export default LoginPage;