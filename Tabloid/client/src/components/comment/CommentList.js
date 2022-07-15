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
       <Link to={`/posts/${id}`}>
            <h2>Comments for: {comments[0]?.post.title}</h2>
       </Link>
       <Button onClick={() => navigate(`/posts/${id}/comments/create`)}>Add Comment</Button>
       <div>
            {comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
       </div>
       </> 
    )
}