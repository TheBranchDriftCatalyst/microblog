"use client";

import { useAuth } from "@/common/auth/hooks/useAuth";
import { API_URL } from "@/common/auth/utils/api";
import CatalystHeader from "@/common/components/CatalystHeader/CatalystHeader";
import UserNavigationUnit from "@/common/components/navigation_units/UserNavigationUnit";
import StoriesNavigation from "@/common/components/navigation_units/BlogPostNavUnit";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import MarkdownEditorViewer from "@/common/components/MarkdownEditor/MarkdownEditorViewer";
import { useHeader } from "@/common/components/CatalystHeader/CatalystHeaderProvider";
import { useEffect } from "react";
import { useControls } from "leva";
import { AlertCircle } from "lucide-react";

// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { getBlogPost } from "@/common/api/blog_posts";
import Markdown from "react-markdown";

export function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}

// Define a function to fetch the blog post by ID
export default function Home() {
  const params = useParams();
  const { setTitle } = useHeader();
  const { postId } = params; // Extract postId from URL params

  // Use React Query's useQuery hook to fetch the blog post
  const { data: blog, error, isLoading } = useQuery(["blog", postId], () => getBlogPost(postId), {
    enabled: !!postId, // Only run the query if postId is available
  });

  const { userIsAuthor } = useControls({ userIsAuthor: false }); // TODO: flesh this out at some point

  // Handle different states: loading, error, and successful data fetching
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-red-600 flex items-center">
          <AlertCircle className="mr-2" />
          Error fetching blog post
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <MicroBlogHeader />
      <section className="container mx-auto py-12 px-6 max-w-4xl">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500">By Author ID: {blog.author_id}</p>
          {/* Additional Info or Navigation */}
          <div className="mt-4 flex justify-end space-x-4">
            {userIsAuthor && (
              <>
                <button
                  className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-150"
                  onClick={() => console.log("Save Post")}
                >
                  Save Post
                </button>
                <button
                  className="text-red-600 hover:text-red-800 transition ease-in-out duration-150"
                  onClick={() => console.log("Delete Post")}
                >
                  Delete Post
                </button>
              </>
            )}
            <button
              className="text-gray-600 hover:text-gray-800 transition ease-in-out duration-150"
              onClick={() => console.log("Switch Mode")}
            >
              {userIsAuthor ? "View Post" : "Edit Post"}
            </button>
          </div>
        </header>

        {/* Post Content */}
        <article className="bg-white p-6 rounded-lg shadow-md">
          {userIsAuthor ? (
            <InitializedMDXEditor
              editorRef={null}
              markdown={blog.content}
            />
          ) : (
            <Markdown className="prose">{blog.content}</Markdown>
          )}
        </article>
      </section>
    </main>
  );
}
