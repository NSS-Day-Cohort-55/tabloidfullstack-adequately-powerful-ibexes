import { useEffect, useState } from "react";
import {Button,Form,FormGroup,Input,Label, Tag} from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { addComment } from "../../modules/commentManager";

export const CommentForm = () => {
    const [comment, setComment] = useState({
        postId: 0,
        subject: "",
        content: ""
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const newComment = {...comment}
        let selectedVal = e.target.value
        newComment[e.target.id] = selectedVal
        setComment(newComment)
    }

    const handleClickSave = () => {
        if (comment.subject === "" || comment.content === "") {
            window.alert("get off the app, you're done")
        } else {
            const newComment = {...comment}
        }
    }

    return (
        <p>Get the fuck outta here ya jabroni. Shit ain't done yet</p>
    )
}