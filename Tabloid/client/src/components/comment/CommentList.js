import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getCommentsByPostId } from "../../modules/commentManager";
import { Comment } from "./Comment"

export const CommentList = () => {
    const [comments, setComments] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    const getComments = () => {
        getCommentsByPostId(id)
        .then(comments => setComments(comments))
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
       <>
       {comments.length ? 
            <Link to={`/posts/${id}`}>
                    <h2>Comments for: {comments[0]?.post.title}</h2>
            </Link>
            : <p>No comments on this post yet. Gonna add one or what ya jabroni?</p>       
        }
       <Button onClick={() => navigate(`/posts/${id}/comments/create`)}>Add Comment</Button>
       {comments.length ? 
            <div>
                {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
                ))}
            </div>
            : ""
        }
       </> 
    )
}