import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deletePost, getPostById} from "../../modules/postManager";
import {Button, Form, FormGroup, Label} from "reactstrap";

export const PostDelete = () => {
    const [post, setPost] = useState({
        title: ""
    });

    const navigate = useNavigate();
    const {id} = useParams();

    const getPost = () => {
        getPostById(id)
        .then(post => setPost(post))
    };

    const handleClickDelete = () => {
        deletePost(post.id)
        .then(navigate("/posts"))
    };

    useEffect(() => {
        getPost()
    }, []);

    return(
        <Form>
            <FormGroup>
                <Label>Are you sure you'd like to delete the <b>{post.title} post?</b>
                </Label>
            </FormGroup>
            <FormGroup>
                <Button color="danger" onClick={() => handleClickDelete()}>
                    Delete
                </Button>
                <Button onClick={() => navigate("/posts")}>
                    Cancel
                </Button>
            </FormGroup>
        </Form>
    )
}