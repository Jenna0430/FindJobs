import { Box, Card, CardContent, TextField, Button, Typography, Tabs, Tab, CircularProgress, Divider } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { JSX } from "react";

export type AuthPageTab = "signin" | "signup";
 
export interface AuthPageSubmitPayload {
  tab: AuthPageTab;
  email: string;
  password: string;
  /** Only present when tab === "signup" */
  role?: "employer" | "applicant";
  fullName?: string;
}

export type AuthPageSubmitResult = null | void | undefined | "CHECK_EMAIL" | string;
 
export interface AuthPageProps {
  onSubmit: (payload: AuthPageSubmitPayload) => Promise<AuthPageSubmitResult>;
  onSuccess?: () => void;
  variant?: "default" | "admin";
  productName?: string;
  tagline?: string;
}

export function AuthPage({
  onSubmit,
  onSuccess,
  variant = "default",
  productName = "FindJobs",
  tagline,
}: AuthPageProps): JSX.Element {
  const isAdmin = variant === "admin";
 
  const defaultTagline = isAdmin ? "Restricted access" : "Find your next opportunity";
  const resolvedTagline = tagline ?? defaultTagline;
 
  const [tab, setTab]             = useState<AuthPageTab>("signin");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [fullName, setFullName]   = useState("");
  const [role, setRole]           = useState<"employer" | "applicant">("applicant");
  const [emailSent, setEmailSent] = useState(false);
 
  const resetForm = (): void => {
    setEmail(""); 
    setPassword(""); 
    setFullName(""); 
    setEmailSent(false);
  };
 
  const handleTabChange = (_: React.SyntheticEvent, newValue: AuthPageTab): void => {
    setTab(newValue);
    resetForm();
    mutation.reset();
  };
 
  const mutation = useMutation<AuthPageSubmitResult, Error>({
    mutationFn: () =>
      onSubmit({
        tab,
        email,
        password,
        ...(tab === "signup" && { role, fullName }),
      }),
    onSuccess: (result) => {
      if (result === "CHECK_EMAIL") { setEmailSent(true); return; }
      if (typeof result === "string" && result.length > 0) throw new Error(result);
      resetForm();
      onSuccess?.();
    },
    onError: () => {},
  });
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutation.mutate();
  };
 
  return (
    <PageBackground>
      <Card
        elevation={0}
        sx={{
          width: { xs: "90%", sm: "420px" },
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: "32px !important" }}>
 
          {emailSent ? (
            <EmailSentScreen
              email={email}
              onBack={() => { setEmailSent(false); setTab("signin"); resetForm(); }}
            />
          ) : (
            <>
              {/* Header */}
              <CardHeader
                productName={productName}
                tagline={resolvedTagline}
                isAdmin={isAdmin}
              />
 
              <Divider sx={{ my: "20px" }} />
 
              {/* Tabs (main-app only) */}
              {!isAdmin && (
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{ mb: "24px", minHeight: "36px",
                    "& .MuiTab-root": { minHeight: "36px", py: "6px", fontSize: "14px" },
                  }}
                >
                  <Tab label="Sign in" value="signin" />
                  <Tab label="Sign up" value="signup" />
                </Tabs>
              )}
 
              {/* Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <TextField label="Email" type="email" value={email}
                  onChange={e => setEmail(e.target.value)} fullWidth required size="small" />
 
                <TextField label="Password" type="password" value={password}
                  onChange={e => setPassword(e.target.value)} fullWidth required size="small" />
 
                {tab === "signup" && !isAdmin && (
                  <>
                    <TextField label="Full name" value={fullName}
                      onChange={e => setFullName(e.target.value)} fullWidth required size="small" />
                    <RoleSelector role={role} onChange={setRole} />
                  </>
                )}
 
                {mutation.error && (
                  <Typography variant="body2" color="error" sx={{ mt: "-4px" }}>
                    {mutation.error.message}
                  </Typography>
                )}
 
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={mutation.isPending}
                  size="large"
                  sx={{ mt: "4px" }}
                >
                  {mutation.isPending
                    ? <CircularProgress size={20} color="inherit" />
                    : tab === "signin" ? "Sign in" : "Create account"
                  }
                </Button>
 
                {isAdmin && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    sx={{ display: "block" }}
                  >
                    Admin accounts only
                  </Typography>
                )}
              </Box>
            </>
          )}
 
        </CardContent>
      </Card>
    </PageBackground>
  );
}

function PageBackground({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Subtle dot-grid pattern — works in both light and dark mode
        backgroundColor: "background.default",
        backgroundImage:
          "radial-gradient(circle, var(--mui-palette-divider, rgba(0,0,0,0.1)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {children}
    </Box>
  );
}
 
/** Card header — product name, tagline, optional admin badge. */
function CardHeader({
  productName,
  tagline,
  isAdmin,
}: {
  productName: string;
  tagline: string;
  isAdmin: boolean;
}): JSX.Element {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "4px" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1 }}>
          {productName}
        </Typography>
        {isAdmin && (
          <Typography
            component="span"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              px: "8px",
              py: "3px",
              borderRadius: "6px",
              backgroundColor: "warning.light",
              color: "warning.dark",
            }}
          >
            Admin portal
          </Typography>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary">
        {tagline}
      </Typography>
    </Box>
  );
}
 
/** Email-sent confirmation screen (main-app sign-up flow only). */
function EmailSentScreen({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}): JSX.Element {
  return (
    <Box sx={{ textAlign: "center", py: "8px" }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: "12px" }}>
        Check your email
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: "24px" }}>
        We sent a verification link to <strong>{email}</strong>.
        Click the link to activate your account, then come back to sign in.
      </Typography>
      <Button variant="outlined" fullWidth onClick={onBack}>
        Back to sign in
      </Button>
    </Box>
  );
}
 
/** Applicant / Employer toggle used in the sign-up form. */
function RoleSelector({
  role,
  onChange,
}: {
  role: "employer" | "applicant";
  onChange: (r: "employer" | "applicant") => void;
}): JSX.Element {
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      {(["applicant", "employer"] as const).map(r => (
        <Button
          key={r}
          type="button"
          variant={role === r ? "contained" : "outlined"}
          onClick={() => onChange(r)}
          fullWidth
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          {r === "applicant" ? "Applicant" : "Employer"}
        </Button>
      ))}
    </Box>
  );
}