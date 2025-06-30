import axios from "axios";
import localStorage from "../utils/localStorage";
import type { AxiosInstance, AxiosResponse } from "axios";

export type APIsuccessResponse<T = undefined> = {
    success?: boolean,
    message?: string,
    data?: any,
    response?:AxiosResponse<T>
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const createAxiosInstance = ():AxiosInstance => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
    });
    instance.interceptors.request.use(
        (config) => {
            const tokens = localStorage.getItem("token") ?? {};
            config.headers.authorization = `Bearer ${tokens}`;
            console.log(`${config.baseURL}${config.url}`)
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
