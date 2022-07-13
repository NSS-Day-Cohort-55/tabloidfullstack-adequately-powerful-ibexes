import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addCategory } from "../../modules/categoryManager";

export default function CatAddForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    addCategory({ name: category })
      .then(() => navigate("/Category"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          id="category"
          type="textarea"
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}