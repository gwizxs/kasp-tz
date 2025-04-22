import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "shared/constants";

function createInstance(): AxiosInstance {
    const instance = axios.create({
        withCredentials: true,
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return instance;
}

export const baseInstanceV1 = createInstance();