import { NavigationMenuLink } from "@/common/ui/navigation-menu";
import NavigationItem, { NavigationListItem } from "../NavigationHeader/NavigationItem";
import { title } from "process";
import { CirclePlus } from "lucide-react";
import { useQuery } from "react-query";
import { listBlogPosts } from "@/common/api/blog_posts";
import { take } from "lodash";

export const BlogPostNavUnit = ({}) => {

  const { data: blogs, error, isLoading } = useQuery("blogs", listBlogPosts);
  
  return (
    <NavigationItem key="blog posts_nav" title="Posts">
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <NavigationListItem key={-1} href="/posts/create" title={(
          <div className="flex">
            <CirclePlus className="h-6 w-6" />
            <div>
              Create New
            </div>
          </div>
        )}></NavigationListItem>
        {
        take(blogs, 10)?.map((blog, idx) => (
          <NavigationListItem key={idx} href={`/docs/{postId}`} title={blog.title} className="truncate ...">
            {blog.content}
          </NavigationListItem>
        ))
      }
      </ul>
    </NavigationItem>
  );
};

export default BlogPostNavUnit;
