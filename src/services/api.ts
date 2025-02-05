import axios from "axios";
import Cookies from "js-cookie";
import { LoginRequest, LoginResponse, mainResponse } from "@/types";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

const token = Cookies.get("token");

// ----- LOGIN -----

export const login = async (
    loginData: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/Login", loginData);
    return response.data;
};

// ----- LOGOUT -----

export const logout = async (userId: string): Promise<string> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
    };
    try {
        const response = await api.post<mainResponse>(`/Logout?id=12`, {
            headers: customHeaderParams,
        });
        if (response.data.mensagem === "Sucesso") {
            Cookies.remove("token");
            return "Logout realizado com sucesso.";
        } else {
            throw new Error(response.data.mensagem);
        }
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};