import axios from "axios";

const API_URL = "https://tmmsystem-sep490g143-production.up.railway.app/api/admin";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; // Trả về danh sách user
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch users");
    } else {
      throw new Error("Network error");
    }
  }
};
