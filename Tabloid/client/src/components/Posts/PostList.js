import { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/postManager";
import { Post } from "./Post";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts().then(posts => setPosts(posts))
    }, [])

    return (
        <>
        <h1>Check out all these dang posts!</h1>
        <Button className="btn btn-primary" onClick={() =>navigate("/posts/create")}>Add Post</Button>
        {posts.map((post) => (
            <Post post={post} key={post.id} />
        ))}
        </>
    )
}