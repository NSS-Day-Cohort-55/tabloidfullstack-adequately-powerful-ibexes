import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { addTag } from "../../modules/tagManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const TagForm = () => {
    const [tag, setTag] = useState({
        name: ""
    })
    
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const newTag = {...tag}
        let selectedVal = e.target.value
        newTag[e.target.id] = selectedVal
        setTag(newTag)
    }

    const handleClickSave = () => {
        if (tag.name === "") {
            window.alert("Are you kidding? There's only 1 thing to fill out.")
        } else {
            addTag(tag)
            .then(navigate("/tags"))
        }
    }

    return(
        <Form>
            <FormGroup>
                <Label for="name">New Tag</Label>
                <Input
                    id="name"
                    type="text"
                    onChange={handleInputChange}
                    value={tag.name}
                />
            </FormGroup>
            <FormGroup>
                <Button onClick={() => handleClickSave()}>Save</Button>
                <Button onClick={() => navigate("/tags")}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}