import React from "react";
import {Button, Card, CardBody} from "reactstrap";
import { useNavigate } from "react-router-dom";

const Tag = ({tag}) => {
    const navigate = useNavigate()

    return (
        <Card>
            <CardBody>
                <p className="tag">
                    {tag.name}
                </p>
                <Button color="info" onClick={() => navigate(`/tags/edit/${tag.id}`)}>Edit</Button>
                <Button color="danger" onClick={() => navigate(`/tags/delete/${tag.id}`)}>Delete</Button>
            </CardBody>
        </Card>
    );
};

export default Tag;