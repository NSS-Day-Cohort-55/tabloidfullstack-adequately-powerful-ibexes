import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateTag, getTagById } from "../../modules/tagManager"
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const TagEdit = () => {
    const [tag, setTag] = useState({
        name: ""
    })

    const navigate = useNavigate()
    const { id } = useParams()

    const getTag = () => {
        getTagById(id)
        .then(tag => setTag(tag))
    }

    const handleInputChange = (e) => {
        const newTag = {...tag}
        let selectedVal = e.target.value
        newTag[e.target.id] = selectedVal
        setTag(newTag)
    }

    const handleClickUpdate = () => {
        if (tag.name === "") {
            window.alert("Are you kidding? There's only 1 thing to fill out.")
        } else {
            updateTag(tag)
            .then(navigate("/tags"))
        }
    }

    useEffect(() => {
        getTag()
    }, [])
    
    return (
        <Form>
        <FormGroup>
            <Label for="name">Edit Tag</Label>
            <Input
                id="name"
                type="text"
                onChange={handleInputChange}
                value={tag.name}
            />
        </FormGroup>
        <FormGroup>
            <Button onClick={() => handleClickUpdate()}>Update</Button>
            <Button onClick={() => navigate("/tags")}>Cancel</Button>
        </FormGroup>
    </Form>
    )
}