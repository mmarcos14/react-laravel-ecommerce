import axios from "axios";

// Vérifie si l'application tourne en local ou en production
const isLocal =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost";

const BASE_URL = isLocal
  ? "http://127.0.0.1:8000"
  : "https://ambroiseapp.com";
  //

 export  const api=axios.create({
    baseURL:`${BASE_URL}/api`,
    withCredentials:true,
      headers: {
    "X-Requested-With": "XMLHttpRequest", // requis par Laravel
    Accept: "application/json", // réponse attendue en JSON
  },
  });

 

  
  // Récupère le cookie CSRF (obligatoire pour les requêtes protégées Laravel Sanctum)
  // Récupère le cookie CSRF (obligatoire pour les requêtes protégées Laravel Sanctum)
export const getCsrfCookie = async () => {
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

   // get 
   export const FetchAll=(endopoint)=>api.get(`/${endopoint}/index`);

   //store data
   export const CreateOne=async (endopoint,data)=>{
    await getCsrfCookie();
    return api.post(`/${endopoint}/store`,data);
   }

   //update
   export const updateOne= async (endopoint,data)=>{
   await getCsrfCookie();
   return api.post(`/${endopoint}/update`,data);

};



     export const login=async (endopoint,data)=>{
    await getCsrfCookie();
    return api.post(`/${endopoint}/login`,data);
   }