import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryById, updateCategory } from "../../modules/categoryManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const CategoryEdit = () => {
    const [cat, setCat] = useState({
        name: ""
    })

    const navigate = useNavigate()
    const { id } = useParams()

    const getCat = () => {
        getCategoryById(id)
            .then(cat => setCat(cat))
    }

    const handleInputChange = (e) => {
        const newCat = { ...cat }
        let selectedVal = e.target.value
        newCat[e.target.id] = selectedVal
        setCat(newCat)
    }

    const handleClickUpdate = () => {
        if (cat.name === "") {
            window.alert("Add a name.")
        } else {
            updateCategory(cat)
                .then(() => navigate("/categories"))
        }
    }

    useEffect(() => {
        getCat()
    }, [])

    return (
        <Form>
            <FormGroup>
                <Label for="name">Edit Category</Label>
                <Input
                    id="name"
                    type="text"
                    onChange={handleInputChange}
                    value={cat.name}
                />
            </FormGroup>
            <FormGroup>
                <Button onClick={() => handleClickUpdate()}>Update</Button>
                <Button onClick={() => navigate("/categories")}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}