import { useEffect, useState } from "react";
import { getPostById } from "../../modules/postManager";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const PostDetails = () => {
    const [post, setPost] = useState({
        title: "",
        imageLocation: "",
        content: "",
        publishDateTime: "",
        userProfile: {
            displayName: ""
        }
    })
    const { id } = useParams()

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
                <Link to={`/posts/${post.id}/tag-manager`}>
                    <h3>Manage Tags</h3>
                </Link>
                <p>{post.content}</p>
                <p>{post.publishDateTime}</p>
                <p>{post.userProfile.displayName}</p>
            </CardBody>
        </Card>
    )
}