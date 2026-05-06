import { useLogin, useNotify } from "react-admin";
import { AuthPage } from "@findjobs/shared-ui";
import type { AuthPageSubmitPayload, AuthPageSubmitResult } from "@findjobs/shared-ui";
import type { JSX } from "react";
 
function AdminLoginPage(): JSX.Element {
  // useLogin() calls authProvider.login() and handles redirect on success.
  const login  = useLogin();
  const notify = useNotify();
 
  
  const handleSubmit = async (
    payload: AuthPageSubmitPayload,
  ): Promise<AuthPageSubmitResult> => {
    try {
      await login({ email: payload.email, password: payload.password });
      // void return = success; AuthPage calls onSuccess() → React Admin redirects
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      // Notify via React Admin's toast system as well as showing inline
      notify(message, { type: "error" });
      // Returning the string causes AuthPage to display it inline in the form
      return message;
    }
  };
 
  return (
    <AuthPage
      onSubmit={handleSubmit}
      variant="admin"
      productName="FindJobs"
    />
  );
}
export default AdminLoginPage;