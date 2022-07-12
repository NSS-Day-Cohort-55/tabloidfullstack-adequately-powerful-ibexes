import React, {useEffect, useState} from "react";
import { getAllCategories } from "../modules/categoryManager.js";
import Category from "./Category.js";

export default function CategoryList() {
  const [category, setCategory] = useState([]);

  const getCategories = () => {
    getAllCategories().then(cat => setCategory(cat));
  }

  useEffect(()=> {
    getCategories();
  }, [])

  return (
    <>
    <div className="container">
      <div>
        {category.map((cat) => (
          <Category cat={cat} key={cat.id}/>
        ))}
      </div>
    </div>
    </>
  );
}