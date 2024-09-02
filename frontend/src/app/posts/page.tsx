"use client";

import { listBlogPosts } from "@/common/api/blog_posts";
import { useQuery } from "react-query";
import { Loader, AlertCircle } from "lucide-react";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import { Tilt } from '@jdion/tilt-react'
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/ui/card";

export default function Home() {
  const router = useRouter();
  const params = useParams();

  // Use React Query's useQuery hook to fetch blogs
  const { data: blogs, error, isLoading } = useQuery("blogs", listBlogPosts);

  // Handle different states: loading, error, and successful data fetching
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="ml-2 text-red-500">Error fetching blogs</p>
      </div>
    );
  }

  const handleCardClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <MicroBlogHeader />
      <section className="container mx-auto py-8 px-4">
        <ul className="space-y-6">
          {blogs.map((blog: { id: number; title: string; content: string }) => (
            <li key={blog.id}>
              <Tilt
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                // tiltMaxAngleY={10}
                // scale={1.05}
                // glareEnable={true}
                // glareMaxOpacity={0.2}
                onClick={() => handleCardClick(blog.id)}
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{blog.content}</p>
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
