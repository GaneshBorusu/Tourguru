import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import bgImage from "../assets/bg.png";

// MUI
import { TextField, Button } from "@mui/material";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "OPERATOR",
    organization: "",
    account_type: "Company",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let temp = {};

    if (!formData.username.trim()) {
      temp.username = "Username is required";
    }

    if (!formData.email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      temp.email = "Invalid email format";
    }

    if (!formData.password) {
      temp.password = "Password is required";
    } else if (formData.password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      temp.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      temp.confirmPassword = "Passwords do not match";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ---------------- REGISTER API ----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await API.post("/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        organization: formData.organization,
        account_type: formData.account_type,
      });

      alert("Registration successful ✅");
      navigate("/login");
    } catch (error) {
      alert("Registration failed ❌");
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
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 my-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Register to get started
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />

          {/* Role */}
          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="OPERATOR">Operator</option>
            <option value="ANALYST">Analyst</option>
            <option value="ADMIN">Admin</option>
          </TextField>

          {/* Organization */}
          <TextField
            fullWidth
            label="Organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
          />

          {/* Account Type */}
          <TextField
            fullWidth
            select
            label="Account Type"
            name="account_type"
            value={formData.account_type}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="Company">Company</option>
            <option value="Port">Port Authority</option>
            <option value="Insurer">Insurer</option>
          </TextField>

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
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
