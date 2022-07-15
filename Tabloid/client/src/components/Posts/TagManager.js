import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "reactstrap"
import { addTagToPost } from "../../modules/postManager";
import { getAllTags } from "../../modules/tagManager";
import firebase from "firebase/app";
import "firebase/auth";

export const TagManager = () => {
    const [tagList, setTagList] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(firebase.auth().currentUser.uid);

    function changeValue(e) {
        setSelectedValue(e.target.value);
    }

    function addTag(e) {
        e.preventDefault();
        console.log(userId)
        console.log(selectedValue, id);
        addTagToPost(id, selectedValue)
            .then(() => {
                navigate(`/posts/${id}/`)
            })
    }

    useEffect(() => {
        getAllTags().then(setTagList);
    }, [])

    return (
        <>
            <Form onSubmit={addTag}>
                <Input defaultValue={"none"} type="select" onChange={changeValue}>
                    <option value="none" disabled hidden>Select a Tag</option>
                {tagList.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </Input>
                <Button>Add Tag</Button>
            </Form>
        </>
    )
}