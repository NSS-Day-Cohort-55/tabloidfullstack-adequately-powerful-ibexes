import React, {useEffect, useState} from "react";
import Tag from "./Tag";
import { getAllTags } from "../../modules/tagManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TagList = () => {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
            <Button onClick={() => navigate("/tags/create")}>Add A Tag</Button>
            <h3 className="Title">Tags</h3>
            <div className="">
                {tags.map((tag) => (
                    <Tag tag ={tag} key={tag.id} />
                ))}
            </div>
        </div>
    );
};

export default TagList;