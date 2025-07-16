import axios from "axios";
import { REST_API_BASE_URL_USER } from "../config";
// import type { BooksPublic } from "../interfaces/BooksPublic.interface";

export const api = axios.create({
    baseURL: REST_API_BASE_URL_USER,
    withCredentials: true
});



export async function paymentProduct(token: string, userId : number) : Promise<CartItem>{
    try{
        const response = await api.post<CartItem>(`${REST_API_BASE_URL_USER}/cartTransaction/clearCart/${userId}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }, 
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}





export const createProductPembelian = (productTransaksi) => {
    return axios.post(REST_API_BASE_URL + '/createProductPembelianTransaction', productTransaksi, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  };

