import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deletePost, getPostById} from "../../modules/postManager";
import {Button, Form, FormGroup, Label, Card} from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const PostDelete = () => {
    const [post, setPost] = useState({
        title: "",
        userProfile: ""
    });

    const navigate = useNavigate();
    const {id} = useParams();
    const uId = firebase.auth().currentUser.uid;

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

    if (uId == post.userProfile.firebaseUserId)
    {
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
    } else {
        return (
            <h1>GET OUT OF HERE YOU SNEAKY BASTARD!!!</h1>
        )
    }
}