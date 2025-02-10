import axios from "axios";
import Cookies from "js-cookie";
import { dtoResponse, LoginRequest, LoginResponse, mainResponse, userTypes } from "@/types";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

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

// ----- VALIDATE -----
export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const response = await api.post<dtoResponse>(`/ValidarToken?token=${token}`);
        return response.data.resposta;
    } catch (error) {
        console.error("Error during validation:", error);
        throw error;
    }
};

// ----- GET USERS -----
type getUsersResponse = userTypes[];

export const getUsers = async (): Promise<getUsersResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<{ resposta: getUsersResponse }>("/VerUser", {
            headers: customHeaderParams,
        });
        return response.data.resposta;
    } catch (error) {
        console.error("Error during get users:", error);
        throw error;
    }
};

// ----- GET USER -----
export const getUser = async (userId: string): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<mainResponse>(`/VerUser/${userId}`, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during get user:", error);
        throw error;
    }
};

// ----- EDIT USER -----
export const editUser = async (
    userId: string,
    userData: any
): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.put<mainResponse>(`/Users/${userId}`, userData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during edit user:", error);
        throw error;
    }
};