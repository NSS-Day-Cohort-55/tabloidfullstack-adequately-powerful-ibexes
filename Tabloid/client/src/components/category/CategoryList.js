import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/categoryManager";
import Category from "./Category"
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function CategoryList() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const getCategories = () => {
    getAllCategories().then(cat => setCategory(cat));
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <>
      <Button className="btn btn-primary" onClick={() => navigate("/categories/create")}>Add Category</Button>
      <div className="container">
        <div>
          {category.map((cat) => (
            <Category cat={cat} key={cat.id} />
          ))}
        </div>
      </div>
    </>
  );
}