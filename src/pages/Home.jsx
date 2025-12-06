import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, Postcard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts({}).then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="w-full max-w-2xl mx-auto p-4">
                        <div className="rounded-xl bg-card-dark border border-white/10 shadow-lg shadow-black/20 p-5 text-center">
                            <h1 className="text-2xl font-bold text-white hover:text-slate-300 transition">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home