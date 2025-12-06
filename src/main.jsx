import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Signuppage from './pages/Signuppage.jsx'
import AllPostpage from './pages/AllPostpage.jsx'
import Addpostpage from './pages/Addpostpage.jsx'
import Editpostpage from './pages/Editpostpage.jsx'
import Postpage from './pages/Postpage.jsx'
import AuthLayout from './components/AuthLayout.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Loginpage />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signuppage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPostpage />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Addpostpage />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:postId",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Editpostpage />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:postId",
            element: <Postpage />,
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
