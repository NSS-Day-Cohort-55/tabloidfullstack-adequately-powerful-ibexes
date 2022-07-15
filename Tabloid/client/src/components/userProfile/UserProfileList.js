import React, { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function UserProfileList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    getAllUserProfiles().then(up => setUsers(up));
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <>
      <Button className="btn btn-primary" onClick={() => navigate("/")}>Return Home</Button>
      <div className="container">
        <div>
          {users.map((user) => (
            <UserProfile up={user} key={user.id} />
          ))}
        </div>
      </div>
    </>
  );
}