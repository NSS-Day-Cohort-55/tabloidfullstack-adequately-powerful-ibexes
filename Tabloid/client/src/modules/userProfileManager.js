import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/userprofile";

export const getAllUserProfiles = () => {
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
                    "An unknown error occurred while trying to get user profiles.",
                )
            }

        })
    })

}

export const getUserProfileById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/Details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } 
            else {
                throw new Error(
                    "An unknown error occurred while trying to get this user profile."
                )
            }
        })
    })
}