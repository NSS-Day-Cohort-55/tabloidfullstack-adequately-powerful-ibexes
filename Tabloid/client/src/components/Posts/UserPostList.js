import { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../modules/postManager";
import { Post } from "./Post";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const UserPostList = () => {
const [posts, setPosts] = useState([])
const navigate = useNavigate();


useEffect(() => {
  getAllPostsByUser()
  .then(res => setPosts(res))
}, [])

    return (
        <>
        <h1>You've got some hella good posts!</h1>
        <Button className="btn btn-primary" onClick={() =>navigate("/posts/create")}>Add Post</Button>
        {posts.map((post) => (
            <Post post={post} key={post.id} />
        ))}
        </>
    )
}