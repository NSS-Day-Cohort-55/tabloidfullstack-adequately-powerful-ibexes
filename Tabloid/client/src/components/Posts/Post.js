import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
    return(
        <Card>
            <CardBody>
                <h3>{post.title}</h3>
                <h6>By: {post.userProfile.displayName}</h6>
                <p>Category: {post.category.name}</p>
            </CardBody>
        </Card>
    )
}