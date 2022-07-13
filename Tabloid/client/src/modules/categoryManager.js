const baseUrl = '/api/Category';

export const getAllCategories = () => {
    return fetch(baseUrl)
    .then((res)=> res.json())
}