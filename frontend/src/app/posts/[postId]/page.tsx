"use client";
import { useAuth } from "@/common/auth/hooks/useAuth";
import { API_URL } from "@/common/auth/utils/api";
import CatalystHeader from "@/common/components/CatalystHeader/CatalystHeader";
import UserNavigationUnit from "@/common/components/navigation_units/LoginNavUnit";
import StoriesNavigation from "@/common/components/navigation_units/StoriesNavUnit";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";

// Define a function to fetch the blog post by ID
const fetchPostById = async (postId: string | string[] | undefined) => {
  if (!postId) {
    throw new Error("Post ID is required");
  }
  const { data } = await axios.get(`${API_URL}/api/blogs/${postId}`);
  return data;
};

export default function Home() {
  const params = useParams();
  console.log(params)
  const { postId } = params; // Extract postId from URL params

  // Use React Query's useQuery hook to fetch the blog post
  const { data: blog, error, isLoading } = useQuery(["blog", postId], () => fetchPostById(postId), {
    enabled: !!postId, // Only run the query if postId is available
  });

  // Handle different states: loading, error, and successful data fetching
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blog post</div>;
  }

  return (
    <main>
      <MicroBlogHeader />
      <section>
        <article>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </article>
      </section>
    </main>
  );
}
