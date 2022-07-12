import { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/postManager";
import { Post } from "./Post";

export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts().then(posts => setPosts(posts))
    }, [])

    return (
        <>
        <h1>Check out all these dang posts!</h1>
        {posts.map((post) => (
            <Post post={post} key={post.id} />
        ))}
        </>
    )
}