import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/Post"

export const getAllPosts = () => {
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
                    "An unknown error occurred while trying to get posts."
                )
            }
        })
    })
}

export const getPostById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get posts."
                )
            }
        })
    })
}

export const getAllPostsByUser = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,

            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get your posts",
                )
            }
        })
    })
}

export const addPost = (post) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save your post.",
                );
            }
        });
    });
};

