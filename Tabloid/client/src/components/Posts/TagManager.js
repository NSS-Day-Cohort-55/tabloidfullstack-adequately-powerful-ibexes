import { useEffect, useState } from "react";
import { Form, Input, Button } from "reactstrap"
import { getAllTags } from "../../modules/tagManager";

export const TagManager = () => {
    const [tagList, setTagList] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    function changeValue(e) {
        setSelectedValue(e.target.value);
    }

    function addTag() {
        
    }

    useEffect(() => {
        getAllTags().then(setTagList);
    }, [])

    return (
        <>
            <Form onSubmit={addTag}>
                <Input type="select">
                    <option value="none" selected disabled hidden>Select a Tag</option>
                {tagList.map(tag => (
                        <option key={tag.id} value={tag.id} onClick={changeValue}>{tag.name}</option>
                    ))}
                </Input>
                <Button>Add Tag</Button>
            </Form>
        </>
    )
}