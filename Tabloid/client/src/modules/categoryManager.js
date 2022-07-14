import "firebase/auth";
import { getToken } from "./authManager";


const baseUrl = '/api/Category';

export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get categories.",
                )
            }

        })
    })

}

export const addCategory = (cat) => {
    return getToken().then((token)=> {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
        }).then((res) => {
            if (res.ok) {
                
            }
            else if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            else {
                throw new Error("Something happened.");
            }
        })
    })
}