import { useAuth } from "../context/AuthContext";
import type { AuthPageSubmitPayload, AuthPageSubmitResult } from "@findjobs/shared-ui";
 
export function useAuthPageSubmit(): (payload: AuthPageSubmitPayload) => Promise<AuthPageSubmitResult> {
  const { signIn, signUp } = useAuth();
 
  return async ({ tab, email, password, role, fullName }: AuthPageSubmitPayload): Promise<AuthPageSubmitResult> => {
    if (tab === "signin") {
      // signIn returns null on success or an error string
      return signIn(email, password);
    }
    // signUp returns null | "CHECK_EMAIL" | error string
    return signUp(email, password, role ?? "applicant", fullName ?? "");
  };
}