import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";


const Category = ({ cat }) => {
    const navigate = useNavigate();
    return (
        <>
            <Card>
                <CardBody>
                    <p>{cat.name}</p>
                    <Button color="clear" onClick={() => navigate(`/categories/edit/${cat.id}`)}>Edit</Button>
                    <Button color="danger" onClick={() => navigate(`delete/${cat.id}`)}>Delete</Button>
                </CardBody>
            </Card>
        </>
    )
}

export default Category;