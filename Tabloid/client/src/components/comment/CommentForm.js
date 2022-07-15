import { useEffect, useState } from "react";
import { Button,Form,FormGroup,Input,Label } from 'reactstrap';
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
            delete newComment.userProfile
            delete newComment.post
            newComment.postId = id
            addComment(newComment)
            .then(navigate(`/posts/${id}/comments`))
        }
    }

    return (
        <Form>
            <h3>Add a New Comment</h3>
            <FormGroup>
                <Label for="subject">Subject:</Label>
                <Input
                    id="subject"
                    type="text"
                    onChange={handleInputChange}
                    value={comment.subject}
                />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content:</Label>
                <Input
                    id="content"
                    type="textarea"
                    onChange={handleInputChange}
                    value={comment.content}
                />
            </FormGroup>
            <FormGroup>
                <Button onClick={() => handleClickSave()}>Save</Button>
                <Button onClick={() => navigate(`/posts/${id}/comments`)}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}