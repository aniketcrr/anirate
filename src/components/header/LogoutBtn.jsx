import React from 'react'
import { useDispatch } from 'react-redux'
import authService  from "./../../appwrite/auth"
import { logout } from "./../../store/authSlice"
import { useNavigate } from 'react-router-dom'


function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LogoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/")
        })
    }

    return (
        <button
            className="h-10 min-w-[84px] rounded-lg border border-[#7B68EE] px-4 text-sm font-bold text-[#F0F0F0] hover:bg-[#7B68EE]/20 transition-colors"
            onClick={LogoutHandler}
        >logout</button>
    )
}

export default LogoutBtn
