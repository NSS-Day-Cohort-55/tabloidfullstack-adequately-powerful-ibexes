import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CategoryList from "./CategoryList";
import Hello from "./Hello";
import { PostList } from "./Posts/PostList.js";
import { UserPostList } from "./Posts/UserPostList";
import TagList from "./tag/TagList";

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
          <Route path="Category" element={<CategoryList/>}/>
          <Route path="/tagManagement" element={<TagList />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
        <Route path="posts">
          <Route index element={<PostList/>} />
          <Route path="user" element={isLoggedIn ? <UserPostList /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </main>
  );
};
