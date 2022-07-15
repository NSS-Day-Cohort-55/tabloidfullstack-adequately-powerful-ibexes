import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";


const UserProfile = ({ up }) => {
    const navigate = useNavigate();

    return (
        <>
            <Card>
                <CardBody>
                    <p>Display Name: {up.displayName}</p>
                    <p>Full Name: {up.fullName}</p>
                    <p>User Type: {up.userType.name}</p>
                    <Button color="info" onClick={() => navigate(`/users/details/${up.id}`)}>Details</Button>
                </CardBody>
            </Card>
        </>
    )
}

export default UserProfile;