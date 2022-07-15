import { useEffect, useState } from "react";
import { getUserProfileById } from "../../modules/userProfileManager";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

export const UserProfileDetails = () => {
    const [user, setUser] = useState({
        fullName: "",
        displayName: "",
        imageLocation: "",
        email: "",
        createDateTime: "",
        userType: {
            name: ""
        }
    })
    const navigate = useNavigate()
    const { id } = useParams()

    const getUser = () => {
        getUserProfileById(id)
            .then(u => setUser(u))
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Button className="btn btn-primary" onClick={() => navigate("/users")}>User List</Button>
            <Card>
                <CardBody>
                    <h1>{`${user.fullName}, otherwise known as ${user.displayName}`}</h1>
                    <div>
                        <img src={user?.imageLocation} alt={`Profile picture of ${user.fullName}`} />
                    </div>
                    <p>Email: {user.email}</p>
                    <p>Member since: {user.createDateTime}</p>
                    <p>User type: {user.userType.name}</p>
                </CardBody>
            </Card>
        </>
    )
}