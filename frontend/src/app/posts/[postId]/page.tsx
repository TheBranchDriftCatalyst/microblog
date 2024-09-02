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
import MarkdownEditorViewer from "@/common/components/MarkdownEditor/MarkdownEditorViewer";
import { useHeader } from "@/common/components/CatalystHeader/CatalystHeaderProvider";
import { useEffect } from "react";

// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css';

// Only import this to the next file
export function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
      {...props}
      ref={editorRef}
    />
  )
}

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
  const { setTitle } = useHeader();
  const { postId } = params; // Extract postId from URL params

  // Use React Query's useQuery hook to fetch the blog post
  const { data: blog, error, isLoading } = useQuery(["blog", postId], () => fetchPostById(postId), {
    enabled: !!postId, // Only run the query if postId is available
  });

  const userIsAuthor = false // TODO: flesh this out at some point

  // Handle different states: loading, error, and successful data fetching
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blog post</div>;
  }

  // useEffect(() => {
  //   setTitle("Microblog > " + blog.title)
  // }, [postId])

  return (
    <main>
      <MicroBlogHeader />
      <section>
        <article>
          {/* TODO: need to split the page pased on if the user is the */}
          <MDXEditor
            markdown={blog.content}
            plugins={[
              // Example Plugin Usage
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin()
            ]}
            // {...props}
            // ref={editorRef}
          />
        </article>
      </section>
    </main>
  );
}
