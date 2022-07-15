import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../modules/postManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getAllCategories } from "../../modules/categoryManager";
import firebase from "firebase/app";
import "firebase/auth";

export const PostEdit = () => {
    
    const [post, setPost] = useState({
        id: 0,
        title: "",
        content: "",
        imageLocation: "",
        // publishDateTime: "",
        categoryId: 0,
        userProfile: ""
    });
    
    const [categories, setCategories] = useState([])
    
    const navigate = useNavigate();
    const {id} = useParams();
    const uId = firebase.auth().currentUser.uid;
    
    const getPost = () => {
        getPostById(id)
        .then(post => setPost(post))
    };

    const handleInputChange = (e) => {
        const newPost = {...post};
        let selectedVal = e.target.value;
        newPost[e.target.id] = selectedVal;
        setPost(newPost);
    };

    const handleClickUpdate = () => {
        if (post.title === "" || post.content === "" || post.imageLocation ==="" || post.publishDateTime === "" || post.categoryId === "") {
            window.alert("Please fill out all fields... jabroni")
        } else {
            const newPost = {...post};
            delete newPost.userProfile;
            updatePost(newPost)
            .then(navigate(`/posts/${post.id}`))
        }
    };

    useEffect(() => {
        getPost()
    }, []);

    useEffect(() => {
        getAllCategories()
        .then(cats => setCategories(cats))
    }, []);

    return (
        <Form>
            <h3>Edit Post</h3>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    onChange={handleInputChange}
                    value={post.title}
                />
                <Label for="content">Content</Label>
                <Input
                    id="content"
                    type="text"
                    onChange={handleInputChange}
                    value={post.content}
                />
                <Label for="imageLocation">Image Url</Label>
                <Input
                    id="imageLocation"
                    type="text"
                    onChange={handleInputChange}
                    value={post.imageLocation}
                />
                <Label for="categoryId">Category</Label><br/>
                <select value={post.categoryId} 
                        name="categories"
                        id="categoryId"
                        form="categoryForm"
                        onChange={handleInputChange}>
                    <option value="0">Select a Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                {uId == post.userProfile.firebaseUserId ?
                    <Button color="info"
                            onClick={() => handleClickUpdate()}>Update
                    </Button> : null
                }           
                <Button color="danger"
                        onClick={() => navigate("/posts")}>Cancel
                </Button>
            </FormGroup>
        </Form>
    )
}