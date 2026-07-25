import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const ProviderServiceContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //  BASE URL CORRIGÉ
    const islocal =
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost";

    const BASE_URL = islocal ? "http://127.0.0.1:8000" : "https://ton-site.com";

    //  AXIOS INSTANCE
    const api = axios.create({
        baseURL: `${BASE_URL}/api`,
        withCredentials: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
        },
    });

    //  CSRF
    const getCsrfCookie = async () => {
        await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
    };

    //  GET
    const FetchAll = (endpoint) => api.get(`/${endpoint}/index`);

    const OneDelete = (endpoint, id) => api.delete(`/${endpoint}/delete/${id}`);

     const OneDetails = (endpoint, id) => api.get(`/${endpoint}/details/${id}`);

    //  CREATE
    const CreateOne = async (endpoint, data) => {
        await getCsrfCookie();
        return api.post(`/${endpoint}/store`, data);
    };

    //  UPDATE
    const updateOne = async (endpoint, data) => {
        await getCsrfCookie();
        return api.post(`/${endpoint}/update`, data);
    };

    //  LOGIN
    const login = async (endpoint, data) => {
        await getCsrfCookie();
        return api.post(`/${endpoint}/login`, data);
    };


        const logout = async (endpoint) => {
        await getCsrfCookie();
        return api.post(`/${endpoint}/logout`);
    };

    //  GET USER
    const getUser = async () => {
        try {
            await getCsrfCookie();
            const response = await FetchAll("user");

            const data = response.data.datauser || response.data;

            setUser(data);
            console.log("USER CONNECTÉ :", data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    //  LOAD USER ON START
    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                FetchAll,
                CreateOne,
                updateOne,
                OneDelete,
                login,
                logout,
                getCsrfCookie,
                getUser,
                OneDetails
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
