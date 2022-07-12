import React, {useEffect, useState} from "react";
import Tag from "./Tag";
import { getAllTags } from "../../modules/tagManager";

const TagList = () => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
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