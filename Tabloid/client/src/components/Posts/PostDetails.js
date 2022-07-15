import { useEffect, useState } from "react";
import { getPostById } from "../../modules/postManager";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

export const PostDetails = () => {
    const [post, setPost] = useState({
        title: "",
        imageLocation: "",
        content: "",
        publishDateTime: "",
        userProfile: {
            displayName: ""
        },
        tags: []
    })
    const { id } = useParams();
    const uId = firebase.auth().currentUser.uid;

    const getPost = () => {
        getPostById(id)
        .then(post => {
            setPost(post);
            console.log();
        })
    }
    
    useEffect(() => {
        getPost()
    }, [])

    return (
        <Card>
            <CardBody>
                <h1>{post.title}</h1>
                <div>
                    <img src={post?.imageLocation} alt={`${post.title} header image`}/>
                </div>
                <ul>
                    {post.tags.map(tag => (
                        <li>{tag.name}</li>
                    ))}
                </ul>
                {uId == post.userProfile.firebaseUserId && <Link to={`/posts/${post.id}/tag-manager`}>
                    <h3>Manage Tags</h3>
                </Link>}
                <p>{post.content}</p>
                <p>{post.publishDateTime}</p>
                <p>{post.userProfile.displayName}</p>
            </CardBody>
        </Card>
    )
}