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
    return getToken().then((token) => {
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

export const getCategoryById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get this category."
                )
            }
        })
    })
}

export const deleteCategory = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (res.ok) {

            }
            else if (res.status === 401) {
                throw new Error("Unauthorized")
            }
            else {
                throw new Error(
                    "An unknown error occurred while trying to delete category."
                )
            }
        })
    })
}

export const updateCategory = (cat) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${cat.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cat)
        }).then((res) => {
            if (res.ok) {

            }
            else if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            else {
                throw new Error(
                    "An unknown error occurred while trying to edit category.",
                );
            }
        })
    })
}