import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Category = ({cat}) => {
    return (
        <>
        <Card>
            <CardBody>
                <p>{cat.name}</p>
            </CardBody>
        </Card>
        </>
    )
}

export default Category;