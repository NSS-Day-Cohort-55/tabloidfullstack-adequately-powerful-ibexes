import { useEffect, useState } from "react";
import { getPostById } from "../../modules/postManager";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import { addSubscription } from "../../modules/subscriptionManager";
import firebase from "firebase/app";
import "firebase/auth";

export const PostDetails = () => {
    const [post, setPost] = useState({
        title: "",
        imageLocation: "",
        content: "",
        publishDateTime: "",
        userProfileId: 0,
        userProfile: {
            displayName: ""
        }
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const uId = firebase.auth().currentUser.uid;

    const handleSubscribe = () => {
        const subscription = {
            providerUserProfileId: post.userProfileId
        }
        console.log(post.userProfileId)
        addSubscription(subscription)
        .then(window.alert("You've successfully subscribed to this author ya JABRONI!"))
    }

    const getPost = () => {
        getPostById(id)
        .then(post => setPost(post))
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
                <p>{post.content}</p>
                <p>{post.publishDateTime}</p>
                <p>{post.userProfile.displayName}</p>
                <Button onClick={() => navigate(`/posts/${post.id}/comments`)}>View Comments</Button>
                {uId !== post.userProfile.firebaseUserId ? <Button onClick={handleSubscribe}>Subscribe To User</Button> : ''}
            </CardBody>
        </Card>
    )
}