import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
            featuredImage : post?.featuredImage || ""
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        
        try {
            if (post) {
                const file = data.image && data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(post.featuredImage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const file = data.image && data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await service.createPost({ ...data, userId: userData.$id });

                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                } else {
                    console.warn("No image uploaded");
                }
            }
        } catch (err) {
            console.error("Submit error", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="w-full">
  <div className="w-full max-w-5xl mx-auto bg-card-dark rounded-xl border border-white/6 shadow-lg shadow-black/30 p-4 sm:p-6">
    <div className="flex flex-wrap -mx-2">

      <div className="w-full lg:w-2/3 px-2 mb-4 lg:mb-0">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 pb-2">Title : </label>
            <Input
              placeholder="Title"
              className="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30"
              {...register("title", { required: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 pb-2">Content : </label>
            <div className="rounded-lg border border-white/10 bg-white/6 overflow-hidden">
              <RTE
                name="content"
                control={control}
                defaultValue={getValues("content")}
                className="min-h-[220px] sm:min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 px-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 pb-2">Featured Image</label>
            <Input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-white placeholder-slate-400"
              {...register("image", { required: !post })}
            />
          </div>

          {post && (
            <div className="w-full">
              <div className="rounded-lg overflow-hidden border border-white/8">
                <div className="w-full aspect-16/10 overflow-hidden bg-black/10">
                  <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3 py-2 text-sm text-slate-400">
                  Current image
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 pb-2">Status</label>
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30"
              {...register("status", { required: true })}
            />
          </div>

          <div>
            <Button
              type="submit"
              bgcolor={post ? "bg-green-500" : undefined}
              className="w-full py-3 rounded-lg font-semibold shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </div>
      </div>

    </div>
  </div>
</form>

    );
}
