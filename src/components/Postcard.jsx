import React from 'react'
import service from "./../appwrite/config"
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-md mx-auto rounded-xl bg-card-dark shadow-lg overflow-hidden">
        <img className="w-full h-auto" src={service.getFilePreview(featuredImage)} />
        <p className="text-center text-white py-4 text-lg font-medium">{title}</p>
      </div>

    </Link>
  )
}

export default Postcard
