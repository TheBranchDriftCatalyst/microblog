"use client";

import { listBlogPosts } from "@/common/api/blog_posts";
import { useQuery } from "react-query";
import { Loader, AlertCircle } from "lucide-react";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import { Tilt } from "@jdion/tilt-react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/ui/card";
import Markdown from "react-markdown";

export default function Home() {
  const router = useRouter();
  const params = useParams();

  // Use React Query's useQuery hook to fetch blogs
  const { data: blogs, error, isLoading } = useQuery("blogs", listBlogPosts);

  // Handle different states: loading, error, and successful data fetching
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-red-500">
        <AlertCircle className="w-12 h-12" />
        <p className="ml-2">Error fetching blogs</p>
      </div>
    );
  }

  const handleCardClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <main className="min-h-screen">
      <MicroBlogHeader />
      <section className="container mx-auto py-10 px-6">
        <ul className="space-y-8">
          {blogs?.map((blog: { id: number; title: string; content: string, created_at: string }) => (
            <li key={blog.id}>
              <Tilt
                className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Card
                  className="cursor-pointer rounded-lg p-6"
                  onClick={() => handleCardClick(blog.id)}
                >
                  <CardHeader className="border-b pb-4 mb-4">
                    <CardTitle className="text-2xl font-bold">
                      {blog.title}
                    </CardTitle>
                    <p className="text-sm mt-2">{new Date(blog.created_at).toLocaleDateString()}</p>
                  </CardHeader>
                  <CardContent >
                    <Markdown className="prose line-clamp-3">{blog.content}</Markdown>
                  </CardContent>
                </Card>
              </Tilt>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
