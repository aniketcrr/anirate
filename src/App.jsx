import { Header, Footer } from "./components"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice"
import authService from "./appwrite/auth"
import './App.css'
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {

    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))


  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
