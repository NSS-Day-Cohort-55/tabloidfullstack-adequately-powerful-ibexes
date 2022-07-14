import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteTag, getTagById } from "../../modules/tagManager"
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const TagDelete = () => {
    const [tag, setTag] = useState({
        name: ""
    })

    const navigate = useNavigate()
    const { id } = useParams()

    const getTag = () => {
        getTagById(id)
        .then(tag => setTag(tag))
    }

    const handleClickDelete = () => {
        deleteTag(tag.id)
        .then(navigate("/tags"))
    }

    useEffect(() => {
        getTag()
    }, [])
    
    return(
        <Form>
        <FormGroup>
            <Label>Are you sure you'd like to delete the <b>{tag.name}</b> tag?</Label>
        </FormGroup>
        <FormGroup>
            <Button color="danger" onClick={() => handleClickDelete()}>Delete</Button>
            <Button onClick={() => navigate("/tags")}>Cancel</Button>
        </FormGroup>
    </Form>
    )
}