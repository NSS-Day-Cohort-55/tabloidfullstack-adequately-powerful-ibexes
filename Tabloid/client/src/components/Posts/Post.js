import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AddTagToPost } from "./TagManager";
import firebase from "firebase/app";
import "firebase/auth";

export const Post = ({ post }) => {

    const navigate = useNavigate();
    const uId = firebase.auth().currentUser.uid;
    
    return(
        <Card>
            <CardBody>
                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <h6>By: {post.userProfile.displayName}</h6>
                <p>Category: {post.category.name}</p>
                {uId == post.userProfile.firebaseUserId ?
                <Button color="info" onClick={() => navigate(`/posts/edit/${post.id}`)}>
                    Edit
                </Button> : null
                }
                {uId == post.userProfile.firebaseUserId ?
                    <Button color="danger" onClick={() => navigate(`/posts/delete/${post.id}`)}>
                        Delete
                    </Button> : null
                }
            </CardBody>
        </Card>
    )
}

export default Post;