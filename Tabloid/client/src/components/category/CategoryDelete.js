import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryById, deleteCategory } from "../../modules/categoryManager"
import { Button, Form, FormGroup, Label } from "reactstrap";

export const CategoryDelete = () => {
    const [cat, setCat] = useState({
        name: ""
    })

    const navigate = useNavigate()
    const { id } = useParams()

    const getCat = () => {
        getCategoryById(id)
        .then(cat => setCat(cat))
    }

    const handleClickDelete = () => {
        deleteCategory(cat.id)
        .then(navigate("/categories"))
    }

    useEffect(() => {
        getCat()
    }, [])
    
    return(
        <Form>
        <FormGroup>
            <Label>Are you sure you'd like to delete <b>{cat.name}</b>?</Label>
        </FormGroup>
        <FormGroup>
            <Button color="danger" onClick={() => handleClickDelete()}>Delete</Button>
            <Button onClick={() => navigate("/categories")}>Cancel</Button>
        </FormGroup>
    </Form>
    )
}