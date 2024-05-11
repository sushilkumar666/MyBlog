import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import MyPost from './pages/MyPost.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import MyForm from './components/MyForm.jsx';
import auth from './database/auth/auth.js';
import EditPage from './pages/EditPage.jsx';
import AddPage from './pages/AddPage.jsx';
import Post from './components/Post.jsx';
import AuthLayout from './components/AuthLayout.jsx';




const router = createBrowserRouter(



  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/my-posts" element={<AuthLayout><MyPost /> </AuthLayout>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/form" element={<MyForm />}></Route>
      <Route path="/post/:slug" element={<Post />}></Route>
      <Route path="/editpost/:slug" element={<EditPage />}></Route>
      <Route path="/addpost" element={<AddPage />}></Route>

    </Route>
  )

)






ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider >
    </Provider>
  </React.StrictMode>
)
