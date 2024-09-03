"use client";

import { listBlogPosts, createBlogPost } from "@/common/api/blog_posts";
import { useMutation, useQuery } from "react-query";
import { Loader, AlertCircle } from "lucide-react";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import { Tilt } from "@jdion/tilt-react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/ui/card";
import { useState } from "react";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";

export default function Home() {
  const router = useRouter();
  const [newPostContent, setNewPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");

  // Use mutation to create a new blog post
  const createPostMutation = useMutation(createBlogPost, {
    onSuccess: (data) => {
      // Redirect to the new blog post page
      router.push(`/posts/${data.id}`);
    },
    onError: (error) => {
      console.error("Failed to create a blog post", error);
    },
  });

  const handleCardClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const handleCreatePost = () => {
    createPostMutation.mutate({ content: newPostContent, title: postTitle, author_id: 1 });
  };

  return (
    <main className="min-h-screenflex flex-col">
      <MicroBlogHeader />
      <section className="container mx-auto py-12 px-6 max-w-3xl flex flex-col space-y-8">
        {/* Blog Post Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Blog Post</h2>
          <div className="space-y-4">
            {/* Title Input */}
            <div className="flex flex-col">
              <Label htmlFor="Title" className="text-sm font-medium text-gray-700">Title</Label>
              <Input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                type="text"
                id="Title"
                placeholder="Enter your blog title"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Content Input */}
            <div className="flex flex-col">
              <Label htmlFor="Content" className="text-sm font-medium text-gray-700">Content</Label>
              <textarea
                className="mt-1 block w-full h-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                id="Content"
                placeholder="Write your blog post here..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
          </div>
          {/* Create Post Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition ease-in-out duration-150"
              onClick={handleCreatePost}
              disabled={createPostMutation.isLoading}
            >
              {createPostMutation.isLoading ? "Creating..." : "Create Post"}
            </button>
          </div>
          {/* Error Message */}
          {createPostMutation.isError && (
            <div className="mt-4 text-red-600 flex items-center">
              <AlertCircle className="mr-2" />
              Failed to create post. Please try again.
            </div>
          )}
        </div>
        {/* TODO: Add post view component here */}
      </section>
    </main>
  );
}
