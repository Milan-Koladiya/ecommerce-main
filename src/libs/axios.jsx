import axios from "axios";
import localStorage from "../utils/localStorage";

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
    });
    instance.interceptors.request.use(
        (config) => {
            const tokens = localStorage.getItem("token") ?? {};
            console.log("============",tokens)
            config.headers.authorization = `Bearer ${tokens}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            console.log(response)
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
