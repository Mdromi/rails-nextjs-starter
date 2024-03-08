import axios from "axios";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";
import { apiUrl } from "@/utils/apiUrl";

// Set up a global axios instance with default configurations
const axiosInstance = axios.create({
  // Set your base URL
  baseURL: apiUrl,
});

// Add a request interceptor to include the bearer token in every request
axiosInstance.interceptors.request.use(
  async (config) => {
    // Explicitly specify the return type of getCurrentUser()
    const user = (await getCurrentUser()) as SafeUser | null;

    // Retrieve the bearer token from wherever it is stored in your application
    const token = user?.accessToken;

    // Add the bearer token to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
