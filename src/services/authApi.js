import axios from "axios";

const API_URL = "https://tmmsystem-sep490g143-production.up.railway.app/v1/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; 
  } catch (error) {   
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error");
    }
  }
};
export const changePassword = async (email, currentPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, {
      email,
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Change password failed");
    } else {
      throw new Error("Network error");
    }
  }
};


