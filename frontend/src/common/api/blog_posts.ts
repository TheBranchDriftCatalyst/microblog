import { title } from "process";
import axios, { AxiosResponse } from "axios";

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
  created_at: string; // Assuming this is a DateTime field
  updated_at: string; // Assuming this is a DateTime field
}

// Create a new blog post
export const createBlogPost = async (
  payload: BlogPostCreateSchema
): Promise<BlogPostSchema> => {
  const response: AxiosResponse<BlogPostSchema> = await apiClient.post(
    `/blogs/`,
    payload
  );
  return response.data;
};

// Get a blog post by ID
export const getBlogPost = async (
  blogPostId: number
): Promise<BlogPostSchema> => {
  const response: AxiosResponse<BlogPostSchema> = await apiClient.get(
    `/blogs/${blogPostId}/`
  );
  return response.data;
};

// Update a blog post by ID
export const updateBlogPost = async (
  blogPostId: number,
  payload: BlogPostUpdateSchema
): Promise<BlogPostSchema> => {
  const response: AxiosResponse<BlogPostSchema> = await apiClient.put(
    `/blogs/${blogPostId}/`,
    payload
  );
  return response.data;
};

// Delete a blog post by ID
export const deleteBlogPost = async (
  blogPostId: number
): Promise<void> => {
  await apiClient.delete(`/blogs/${blogPostId}/`);
};

// List all blog posts
export const listBlogPosts = async (): Promise<BlogPostSchema[]> => {
  const response: AxiosResponse<BlogPostSchema[]> = await apiClient.get(
    `/blogs/`
  );
  return response.data;
};
import { get } from "http";
import apiClient from "./api_client";

