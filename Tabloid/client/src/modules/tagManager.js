import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/tag";

export const getAllTags = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                "An unknown error occurred while trying to get tags.",
                );
            }
        });
    })  
};

export const getTagById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get this tag." 
                )
            }
        })
    })
}

export const addTag = (tag) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        }).then((resp) => {
            if (resp.ok) {
        
            } else if (resp.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error(
                "An unknown error occurred while trying to save a new tag.",
              );
            }
        });
    })
}

export const deleteTag = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (res.ok) {
            } else if (res.status === 401) {
                throw new Error("Unauthorized")
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new tag."
                )
            }
        })
    })
}