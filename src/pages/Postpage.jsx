import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Postpage() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (postId) {
            appwriteService.getPost(postId).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [postId, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <article className="w-full max-w-3xl mx-auto space-y-6">
                    <div className="relative rounded-xl overflow-hidden border border-white/6 bg-card-dark shadow-lg shadow-black/30">
                        <div className="w-full">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto object-cover block"
                            />
                        </div>

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full p-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgcolor="bg-green-500"
                                        className="px-3 py-1 text-sm rounded-md shadow-sm hover:brightness-95"
                                    >
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    bgcolor="bg-red-500"
                                    onClick={deletePost}
                                    className="px-3 py-1 text-sm rounded-md shadow-sm hover:brightness-95"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <header className="px-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                            {post.title}
                        </h1>
                        <div className="mt-2 text-sm text-slate-400">
                            {post.authorName ? post.authorName + " • " : ""}{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                        </div>
                    </header>

                    <div className="prose prose-invert max-w-none px-2 text-slate-200">
                        <div className="mt-2">
                            {parse(post.content)}
                        </div>
                    </div>
                </article>
            </Container>

        </div>
    ) : null;
}