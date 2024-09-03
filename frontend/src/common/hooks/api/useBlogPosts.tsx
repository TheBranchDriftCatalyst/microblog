import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BlogPostCreateSchema, BlogPostSchema, BlogPostUpdateSchema } from './api';
import apiClient from '@/common/api/api_client';

export interface BlogPostCreateSchema {
  title: string;
  content: string;
  author_id: number;
}

export interface BlogPostUpdateSchema {
  title?: string;
  content?: string;
}

export interface BlogPostSchema {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

// Create a new blog post
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: BlogPostCreateSchema): Promise<BlogPostSchema> => {
      const response = await apiClient.post<BlogPostSchema>('/blogs/', payload);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blogPosts']);
      },
    }
  );
};

// Get a blog post by ID
export const useGetBlogPost = (blogPostId: number) => {
  return useQuery<BlogPostSchema>(
    ['blogPost', blogPostId],
    async () => {
      const response = await apiClient.get<BlogPostSchema>(`/blogs/${blogPostId}/`);
      return response.data;
    },
    {
      enabled: !!blogPostId,
    }
  );
};

// Update a blog post by ID
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      blogPostId,
      payload,
    }: {
      blogPostId: number;
      payload: BlogPostUpdateSchema;
    }): Promise<BlogPostSchema> => {
      const response = await apiClient.put<BlogPostSchema>(`/blogs/${blogPostId}/`, payload);
      return response.data;
    },
    {
      onSuccess: (_, { blogPostId }) => {
        queryClient.invalidateQueries(['blogPost', blogPostId]);
        queryClient.invalidateQueries(['blogPosts']);
      },
    }
  );
};

// Delete a blog post by ID
const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (blogPostId: number): Promise<void> => {
      await apiClient.delete(`/blogs/${blogPostId}/`);
    },
    {
      onSuccess: (_, blogPostId) => {
        queryClient.invalidateQueries(['blogPost', blogPostId]);
        queryClient.invalidateQueries(['blogPosts']);
      },
    }
  );
};

// List all blog posts
const useListBlogPosts = () => {
  return useQuery<BlogPostSchema[]>(
    ['blogPosts'],
    async () => {
      const response = await apiClient.get<BlogPostSchema[]>(`/blogs/`);
      return response.data;
    }
  );
};

// Custom hook that bundles all blog post operations
export const useBlogPosts = () => {
  return {
    createBlogPost: useCreateBlogPost(),
    getBlogPost: useGetBlogPost,
    updateBlogPost: useUpdateBlogPost(),
    deleteBlogPost: useDeleteBlogPost(),
    listBlogPosts: useListBlogPosts(),
  };
};
