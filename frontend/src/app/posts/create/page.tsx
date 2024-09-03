"use client";

import { listBlogPosts, createBlogPost } from "@/common/api/blog_posts";
import { useMutation, useQuery } from "react-query";
import { Loader, AlertCircle } from "lucide-react";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import { Tilt } from '@jdion/tilt-react'
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/ui/card";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [newPostContent, setNewPostContent] = useState("");

  // Use mutation to create a new blog post
  const createPostMutation = useMutation(createBlogPost, {
    onSuccess: (data) => {
      // Redirect to the new blog post page
      router.push(`/posts/${data.id}`);
    },
    onError: (error) => {
      console.error("Failed to create a blog post", error);
    }
  });

  const handleCardClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const handleCreatePost = () => {
    createPostMutation.mutate({ content: newPostContent, title: "New Post", author_id: 1 });
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <MicroBlogHeader />
      <section className="container mx-auto py-8 px-4">
        <div className="mb-4">
          {/* Simple markdown text input */}
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Write your blog post here..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleCreatePost}
          disabled={createPostMutation.isLoading}
        >
          {createPostMutation.isLoading ? "Creating..." : "Create Post"}
        </button>
        {createPostMutation.isError && (
          <div className="text-red-500 mt-2 flex items-center">
            <AlertCircle className="mr-2" />
            Failed to create post. Please try again.
            {/* {createPost} */}
          </div>
        )}
        {/* TODO: Add hovering buttons to save the post */}
        TODO: create post view here
      </section>
    </main>
  );
}
