import React from "react";
import { Card, CardBody } from "reactstrap";


const UserProfile = ({ up }) => {

    return (
        <>
            <Card>
                <CardBody>
                    <p>Display Name: {up.displayName}</p>
                    <p>Full Name: {up.fullName}</p>
                    <p>User Type: {up.userType.name}</p>
                </CardBody>
            </Card>
        </>
    )
}

export default UserProfile;