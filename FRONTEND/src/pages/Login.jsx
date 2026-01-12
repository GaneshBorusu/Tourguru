import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import bgImage from "../assets/bg.png";

// MUI
import { TextField, Button } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let temp = {};

    if (!email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      temp.email = "Invalid email format";
    }

    if (!password) {
      temp.password = "Password is required";
    } else if (password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ---------------- LOGIN API ----------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await API.post("/login/", {
        email,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      alert("Login successful ✅");
    } catch (err) {
      alert("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Glass card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Maritime intelligence Platform
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          {/* Button */}
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: "12px",
              padding: "12px",
              fontSize: "16px",
              background: "linear-gradient(90deg, #2563eb, #1e40af)",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;