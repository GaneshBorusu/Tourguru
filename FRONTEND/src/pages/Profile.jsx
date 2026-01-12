import { useEffect, useState } from "react";
import API from "../api/axios";
import bgImage from "../assets/bg.png";

// MUI
import {
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    account_type: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // -------- FETCH PROFILE --------
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await API.get("/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        setProfile({
          username: res.data.username,
          email: res.data.email,
          role: res.data.role, // Operator / Analyst / Admin
          organization: res.data.organization,
          account_type: res.data.account_type, // Company / Port / Insurer
        });
      } catch {
        alert("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // -------- HANDLE CHANGE --------
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // -------- VALIDATION --------
  const validate = () => {
    let temp = {};

    if (!profile.name.trim()) temp.name = "Name is required";

    if (!profile.email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      temp.email = "Invalid email";
    }

    if (!profile.organization.trim())
      temp.organization = "Organization is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // -------- UPDATE PROFILE --------
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await API.put(
        "/profile/",
        {
          username: profile.username,
          email: profile.email,
          organization: profile.organization,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      alert("Profile updated successfully ✅");
    } catch {
      alert("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Glass Card */}
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#1e40af",
              fontSize: 32,
            }}
          >
            {profile.username ? profile.username.charAt(0).toUpperCase() : "?"}
          </Avatar>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          User Profile
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Maritime Analytics Platform
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="Role"
            value={profile.role}
            disabled
          />

          <TextField
            fullWidth
            label="Account Type"
            value={profile.account_type}
            disabled
          />

          <TextField
            fullWidth
            label="Organization / Company"
            name="organization"
            value={profile.organization}
            onChange={handleChange}
            error={!!errors.organization}
            helperText={errors.organization}
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            disabled={saving}
            sx={{
              borderRadius: 2,
              py: 1.5,
              fontSize: 16,
              background:
                "linear-gradient(90deg, #2563eb, #1e40af)",
            }}
          >
            {saving ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
