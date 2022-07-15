import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../modules/commentManager";
import { Comment } from "./Comment"

export const CommentList = () => {
    const [comments, setComments] = useState([])

    const { id } = useParams()

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
       <div>
            {comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
       </div>
       </> 
    )
}