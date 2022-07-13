import { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../modules/postManager";
import { useParams } from "react-router-dom";
import { Post } from "./Post";
import firebase from "firebase";

export const UserPostList = () => {
const [posts, setPosts] = useState([])


useEffect(() => {
  getAllPostsByUser()
  .then(res => setPosts(res))
}, [])

    return (
        <>
        <h1>You've got some hella good posts!</h1>
        {posts.map((post) => (
            <Post post={post} key={post.id} />
        ))}
        </>
    )
}