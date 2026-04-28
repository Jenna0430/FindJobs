import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { Box, Button, Card, CardContent, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff, AdminPanelSettings } from "@mui/icons-material";

 const LoginPage = () => {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]       = useState(false);

  const login  = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch (error: unknown) {
      notify(
        error instanceof Error ? error.message : "Login failed. Please try again.",
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 5 }}>

          {/* Header */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <AdminPanelSettings sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              FindJobs Admin
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Sign in to your admin account
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              size="medium"
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(v => !v)}
                      edge="end"
                      size="small"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              size="large"
              sx={{ mt: 1, py: 1.5, fontWeight: 600, borderRadius: 2 }}
            >
              {loading
                ? <CircularProgress size={22} color="inherit" />
                : "Sign in"
              }
            </Button>
          </Box>

          {/* Footer note */}
          <Typography
            variant="caption"
            color="text.disabled"
            display="block"
            textAlign="center"
            mt={3}
          >
            Admin accounts are managed by the system administrator.
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;