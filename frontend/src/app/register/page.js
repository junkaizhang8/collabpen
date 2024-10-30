"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { AppRegistration as Logo } from "@mui/icons-material";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleRegister = async () => {
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    // Call backend api to register
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (response.status === 201) {
        console.log("Registered successfully");
        setRegisterError("");
        router.push("/project-workspace");
      } else {
        setRegisterError("Username is already taken.");
      }
    } catch (error) {
      setRegisterError(`Something went wrong: ${error}`);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={5}
        sx={{ padding: 4, width: "100%", maxWidth: "500px" }}
      >
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Logo sx={{ fontSize: 25 }} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            CollabPen
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mt: 2 }}>
          Register
        </Typography>

        {registerError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {registerError}
          </Typography>
        )}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setRegisterError("");
          }}
          error={usernameError && !username}
          helperText={!username && usernameError}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setRegisterError("");
          }}
          error={passwordError && !password}
          helperText={!password && passwordError}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setRegisterError("");
          }}
          error={passwordError && !password}
          helperText={!password && passwordError}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push("/login")}
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "secondary.main",
              fontWeight: 600,
              "&:hover": { color: "secondary.dark" },
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
