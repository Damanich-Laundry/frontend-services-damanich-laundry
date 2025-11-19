"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";

interface ForgotPasswordFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, email: string) => void;
  backToLoginLink?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  backToLoginLink = "/auth/login",
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e, email);
    }
  };

  return (
    <Paper elevation={0} sx={{ width: "100%", maxWidth: 450 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, mb: 4, color: "#000" }}
      >
        Forgot Password
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* Email field */}
        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
          required
        />

        <Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
          Enter your registered email address and we’ll send you a link to reset
          your password.
        </Typography>

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mb: 3,
            py: 1.5,
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
        >
          Send Reset Link
        </Button>

        {/* Back to login */}
        <Typography sx={{ textAlign: "center" }}>
          <Link href={backToLoginLink} underline="hover" sx={{ color: "#1976d2" }}>
            Back to Login
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default ForgotPasswordForm;
