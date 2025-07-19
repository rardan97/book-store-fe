import axios from "axios";
import { REST_API_BASE_URL_USER_PUBLIC } from "../config";
import type { BooksPublic } from "../interfaces/BooksPublic.interface";

export const api = axios.create({
    baseURL: REST_API_BASE_URL_USER_PUBLIC,
    withCredentials: true
});

export async function getPublicListBooks() : Promise<BooksPublic[]>{
    try{
        const response = await api.get<BooksPublic[]>(`${REST_API_BASE_URL_USER_PUBLIC}/books/getBooksListAll`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        console.log("checckk");
        console.log(response);
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function getPublicBookValueById(id : number) : Promise<BooksPublic>{
    try{
        const response = await api.get<BooksPublic>(`${REST_API_BASE_URL_USER_PUBLIC}/books/getBooksFindById/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}




export async function getLoadImagePublicBook(filename : string) : Promise<Blob>{
    try{
        console.log("Check load :"+filename);
        const response = await api.get<Blob>(`${REST_API_BASE_URL_USER_PUBLIC}/books/images/${filename}`, {
            responseType:'blob',
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}
