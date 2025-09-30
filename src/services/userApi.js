import axios from "axios";
import { use } from "react";

const API_URL = "https://tmmsystem-sep490g143-production.up.railway.app/api/admin";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch users");
    } else {
      throw new Error("Network error");
    }
  }
};
export const CreateUsers = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`,userData);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Create failed ");
    } else {
      throw new Error("Network error");
    }
  }
};
