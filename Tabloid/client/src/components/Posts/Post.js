import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {

    const navigate = useNavigate();
    
    return(
        <Card>
            <CardBody>
                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <h6>By: {post.userProfile.displayName}</h6>
                <p>Category: {post.category.name}</p>
                <Button color="danger" onClick={() => navigate(`/posts/delete/${post.id}`)}>
                    Delete
                </Button>
            </CardBody>
        </Card>
    )
}

export default Post;