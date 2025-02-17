import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"; // Backend API URL
axios.defaults.withCredentials = true; // Allow cookies

// Login API call
export const login = async (email, password) => {
  try {
    await axios.post("/user_login/", { email, password }, { withCredentials: true });
    return true; // Login successful
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// Logout API call
export const logout = async () => {
  try {
    await axios.post("/user_logout/", {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Get authenticated user info
export const getUser = async () => {
  try {
    const response = await axios.get("/user_info/", { withCredentials: true });
    return response.data; // Return user data
  } catch (error) {
    return null; // User is not authenticated
  }
};
