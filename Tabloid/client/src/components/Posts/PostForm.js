import React from "react";
import { addPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";
import { useEffect, useState } from "react";
import {Button,Form,FormGroup,Input,Label} from 'reactstrap';
import { useNavigate } from "react-router-dom";

export const PostForm = () => {
const [categories, setCategories] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [post, setPost] = useState({
  title: '',
  content: '',
  categoryId: '',
  imageLocation: ''
  }
)
const navigate = useNavigate();

const handleFieldChange = (evt) => {
  const newPost = {...post}
  let selectedVal = evt.target.value
  newPost[evt.target.id] = selectedVal
  setPost(newPost)
}

const handleSaveClick = (evt) => {
  evt.preventDefault();

  if (post.categoryId === '0' || post.title === '' || post.content === '') {
    window.alert("Whoops, make sure you fill out all fields")
    setIsLoading(false)
  } else {
    setIsLoading(true)
    post.categoryId = parseInt(post.categoryId)
    addPost(post)
    .then(() => navigate('/posts/user'))
  }
}

useEffect(() => {
  getAllCategories()
  .then(cats => setCategories(cats))
  .then(setIsLoading(false))
}, [])

  return (
    <Form>
      <FormGroup>
          <Label for="title">Title:</Label>
          <Input type="text" 
                  name="title" 
                  id="title"
                  onChange={handleFieldChange}
                  value={post.title}
                  placeholder="Post Title" />
      </FormGroup>
      <FormGroup>
          <Label for="content">Content:</Label>
          <Input type="text" 
                  name="content" 
                  id="content"
                  onChange={handleFieldChange}
                  value={post.content}
                  placeholder="Post Content" />
      </FormGroup>
      <FormGroup>
          <Label for="imageLocation">Header Image URL:</Label>
          <Input type="text" 
                  name="imageLocation" 
                  id="imageLocation"
                  onChange={handleFieldChange}
                  value={post.imageLocation}
                  placeholder="Header Image URL" />
      </FormGroup>
      <FormGroup>
          <Label for="content">Category:</Label><br/>
          <select value={post.categoryId} name="categories" id="categoryId" form="categoryForm" onChange={handleFieldChange}>
            <option value="0">Select a Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
      </FormGroup>
      <Button onClick={handleSaveClick}>Add Post</Button>
    </Form>
  )
}