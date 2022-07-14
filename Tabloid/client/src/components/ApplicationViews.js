import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CategoryList from "./category/CategoryList";
import Hello from "./Hello";
import { PostList } from "./Posts/PostList.js";
import { UserPostList } from "./Posts/UserPostList";
import TagList from "./tag/TagList";
import { PostDetails } from "./Posts/PostDetails";
import { PostForm } from "./Posts/PostForm";
import { TagForm } from "./tag/TagForm";
import CatAddForm from "./category/AddCategoryForm";
import { TagDelete } from "./tag/TagDelete";
import { CategoryDelete } from "./category/CategoryDelete";
import { TagEdit } from "./tag/TagEdit";
import { CategoryEdit } from "./category/CategoryEdit";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="categories" >
            <Route index element={<CategoryList />} />
            <Route path="create" element={<CatAddForm />} />
            <Route path="delete/:id" element={<CategoryDelete />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
          </Route>

          <Route path="tags">
            <Route index element={<TagList />} />
            <Route path="create" element={<TagForm />} />
            <Route path="delete/:id" element={<TagDelete />} />
            <Route path="edit/:id" element={<TagEdit />} />
          </Route>

          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path=":id" element={<PostDetails />} />
            <Route path="user" element={isLoggedIn ? <UserPostList /> : <Navigate to="/login" />} />
            <Route path="create" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
