"use client";
import { useAuth } from "@/common/auth/hooks/useAuth";
import { API_URL } from "@/common/auth/utils/api";
import CatalystHeader from "@/common/components/CatalystHeader/CatalystHeader";
import UserNavigationUnit from "@/common/components/navigation_units/LoginNavUnit";
import StoriesNavigation from "@/common/components/navigation_units/StoriesNavUnit";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import axios from "axios";
import { useQuery } from "react-query";
// import axios from "axios";

// Define a function to fetch the blogs
const fetchPosts = async () => {
  const { data } = await axios.get(`${API_URL}/api/blogs/`)
  return data;
};

export default function Home() {
  // Use React Query's useQuery hook to fetch blogs
  const { data: blogs, error, isLoading } = useQuery("blogs", fetchPosts);

  // Handle different states: loading, error, and successful data fetching
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs</div>;
  }

  return (
    <main>
      <MicroBlogHeader />
      <section>
        <ul>
          {blogs.map((blog: { id: number; title: string; content: string }) => (
            <li key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
