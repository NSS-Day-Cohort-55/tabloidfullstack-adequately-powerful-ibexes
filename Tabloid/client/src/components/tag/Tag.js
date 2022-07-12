import React from "react";
import {Card, CardBody} from "reactstrap";

const Tag = ({tag}) => {
    return (
        <Card>
            <CardBody>
                <p className="tag">
                    {tag.name}
                </p>
            </CardBody>
        </Card>
    );
};

export default Tag;