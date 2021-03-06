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
import { TagManager } from "./Posts/TagManager"
import CatAddForm from "./category/AddCategoryForm";
import { TagDelete } from "./tag/TagDelete";
import { PostDelete } from "./Posts/PostDelete";
import { CategoryDelete } from "./category/CategoryDelete";
import { TagEdit } from "./tag/TagEdit";
import { CommentList } from "./comment/CommentList";
import { CategoryEdit } from "./category/CategoryEdit";
import { CommentForm } from "./comment/CommentForm";
import UserProfileList from "./userProfile/UserProfileList";
import { UserProfileDetails } from "./userProfile/UserProfileDetails";
import { PostEdit } from "./Posts/PostEdit";



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
            <Route path=":id">
              <Route index element={<PostDetails />} />
              <Route path="tag-manager" element={<TagManager />} />
            </Route>
            <Route path="delete/:id" element={<PostDelete />}/>
            <Route path="edit/:id" element={<PostEdit />} />
            <Route path="user" element={isLoggedIn ? <UserPostList /> : <Navigate to="/login" />} />
            <Route path="create" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
            <Route path=":id/comments" element={<CommentList />} />
            <Route path=":id/comments/create" element={<CommentForm />} />
          </Route>

          <Route path="users">
            <Route index element={<UserProfileList />} />
            <Route path="details/:id" element={<UserProfileDetails />} />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
