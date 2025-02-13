import axios from "axios";
import Cookies from "js-cookie";
import { dtoResponse, estagioRequest, leadRequest, leadTypes, LoginRequest, LoginResponse, mainResponse, userEditRequest, userRequest, userTypes } from "@/types";

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

// ======================= USERS =======================

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
export const getUser = async (userId: number): Promise<userTypes> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<{ resposta: userTypes }>(`/VerUser/${userId}`, {
            headers: customHeaderParams,
        });
        return response.data.resposta;
    } catch (error) {
        console.error("Error during get user:", error);
        throw error;
    }
};

// ----- EDIT USER -----
export const editUser = async (
    userId: number,
    userData: userEditRequest
): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.put<mainResponse>(`/editarUser/${userId}`, userData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during edit user:", error);
        throw error;
    }
};

// ----- DELETE USER -----
export const deleteUser = async (userId: number): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.delete<mainResponse>(`/RemoverUser/${userId}`, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during delete user:", error);
        throw error;
    }
};

// ----- CREATE USER -----
export const createUser = async (userData: userRequest): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.post<mainResponse>("/novoUser", userData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during create user:", error);
        throw error;
    }
};

// ----- CHANGE PASSWORD -----


// ======================= LEAD =======================

// ----- GET LEADS -----

type getLeadsResponse = leadTypes[];
export const getLeads = async (): Promise<getLeadsResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<{ resposta: getLeadsResponse }>("/VerLeads", {
            headers: customHeaderParams,
        });
        return response.data.resposta;
    } catch (error) {
        console.error("Error during get leads:", error);
        throw error;
    }
};

// ----- GET LEAD -----
export const getLead = async (leadId: number): Promise<leadTypes> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<{ resposta: leadTypes}>(`/VerLeadById/${leadId}`, {
            headers: customHeaderParams,
        });
        return response.data.resposta;
    } catch (error) {
        console.error("Error during get lead:", error);
        throw error;
    }
};

// ----- EDIT LEAD -----

export const editLead = async (
    leadId: number,
    leadData: leadRequest
): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.put<mainResponse>(`/EditarLead/${leadId}`, leadData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during edit lead:", error);
        throw error;
    }
};

// ----- DELETE LEAD -----

export const deleteLead = async (leadId: number): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.delete<mainResponse>(`/RemoverLead/${leadId}`, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during delete lead:", error);
        throw error;
    }
};

// ----- CREATE LEAD -----

export const createLead = async (leadData: leadRequest): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.post<mainResponse>("/CriarLead", leadData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during create lead:", error);
        throw error;
    }
};

// ----- Upload Lead -----

export const uploadLead = async (leadFile: File): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("file", leadFile);

    try {
        const response = await api.post<mainResponse>("/UploadLead", formData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during upload lead:", error);
        throw error;
    }
};

// ======================= ESTAGIO =======================

// ----- GET ESTAGIOS -----
type getEstagiosResponse = leadTypes[];
export const getEstagios = async (): Promise<getEstagiosResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<{ resposta: getEstagiosResponse }>("/VerEstagios", {
            headers: customHeaderParams,
        });
        return response.data.resposta;
    } catch (error) {
        console.error("Error during get estagios:", error);
        throw error;
    }
};

// ----- GET ESTAGIO -----

export const getEstagio = async (estagioId: number): Promise<leadTypes> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.get<{ resposta: leadTypes}>(`/VerEstagioById/${estagioId}`, {        
            headers: customHeaderParams,
        }); 
        return response.data.resposta;
    } catch (error) {
        console.error("Error during get estagio:", error);
        throw error;
    }
};

// ----- EDIT ESTAGIO -----

export const editEstagio = async (
    estagioId: number,
    estagioData: estagioRequest
): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.put<mainResponse>(`/EditarEstagio/${estagioId}`, estagioData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during edit estagio:", error);
        throw error;
    }
};

// ----- DELETE ESTAGIO -----

export const deleteEstagio = async (estagioId: number): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.delete<mainResponse>(`/RemoverEstagio/${estagioId}`, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during delete estagio:", error);
        throw error;
    }
};

// ----- CREATE ESTAGIO -----

export const createEstagio = async (estagioData: estagioRequest): Promise<mainResponse> => {
    const customHeaderParams = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await api.post<mainResponse>("/CriarEstagio", estagioData, {
            headers: customHeaderParams,
        });
        return response.data;
    } catch (error) {
        console.error("Error during create estagio:", error);
        throw error;
    }
};



