import { NavigationMenuLink } from "@/common/ui/navigation-menu";
import NavigationItem, { NavigationListItem } from "../NavigationHeader/NavigationItem";
import { CirclePlus } from "lucide-react";
import { useQuery } from "react-query";
import { listBlogPosts } from "@/common/api/blog_posts";
import { take } from "lodash";

export const BlogPostNavUnit = () => {
  const { data: blogs, error, isLoading } = useQuery("blogs", listBlogPosts);

  // Handle loading state
  if (isLoading) {
    return (
      <NavigationItem key="blog_posts_nav" title="Posts">
        <div className="p-4 text-center">
          <div className="animate-spin text-blue-500 h-6 w-6 mx-auto">Loading...</div>
        </div>
      </NavigationItem>
    );
  }

  // Handle error state
  if (error) {
    return (
      <NavigationItem key="blog_posts_nav" title="Posts">
        <div className="p-4 text-center text-red-500">Error loading posts</div>
      </NavigationItem>
    );
  }

  return (
    <NavigationItem key="blog_posts_nav" title="Posts">
      <ul className="grid gap-4 p-4 md:w-[400px] lg:w-[500px] bg-white rounded-lg shadow-md">
        <NavigationListItem key={-1} href="/posts/create" title={(
          <div className="flex items-center text-blue-600 hover:text-blue-800 transition ease-in-out duration-150">
            <CirclePlus className="h-6 w-6 mr-2" />
            <span className="font-medium">Create New Post</span>
          </div>
        )}></NavigationListItem>
        {
          take(blogs, 10)?.map((blog, idx) => (
            <NavigationListItem
              key={idx}
              href={`/posts/${blog.id}`}
              title={(
                <div className="truncate font-semibold text-gray-800">
                  {blog.title}
                </div>
              )}
              className="truncate ... hover:bg-gray-100 transition ease-in-out duration-150 rounded-md p-2"
            >
              <p className="text-sm text-gray-600 truncate">{blog.content}</p>
            </NavigationListItem>
          ))
        }
      </ul>
    </NavigationItem>
  );
};

export default BlogPostNavUnit;
