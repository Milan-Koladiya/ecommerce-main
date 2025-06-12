import axios from "axios";
import localStorage from "../utils/localStorage";

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
    });
    instance.interceptors.request.use(
        (config) => {
            console.log("Calling API:", config.baseURL + config.url);
            const tokens = localStorage.getItem("token") ?? {};
            config.headers.authorization = `Bearer ${tokens}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
            
        },
        (error) => {
                return Promise.reject(error);
        }
    );

    return instance;
};

const axiosClient = createAxiosInstance();

export default axiosClient;
