import axios, { AxiosResponse } from "axios";
import apiClient from "./api_client";

// User Interfaces
export interface UserCreateSchema {
  username: string;
  email: string;
  password: string;
  // Add any other required fields for user creation
}

export interface UserUpdateSchema {
  username?: string;
  email?: string;
  // Add any other updatable fields for users
}

export interface UserSchema {
  id: number;
  username: string;
  email: string;
  created_at: string; // Assuming this is a DateTime field
  updated_at: string; // Assuming this is a DateTime field
  // Add any other fields relevant to the User model
}

// Blog Post Interfaces (for getUserPosts)
export interface BlogPostSchema {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string; // Assuming this is a DateTime field
  updated_at: string; // Assuming this is a DateTime field
}

export const createUser = async (
  payload: UserCreateSchema
): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await apiClient.post(
    `/users/`,
    payload
  );
  return response.data;
};

export const getUser = async (userId: number): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await apiClient.get(
    `/users/${userId}/`
  );
  return response.data;
};

export const updateUser = async (
  userId: number,
  payload: UserUpdateSchema
): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await apiClient.put(
    `/users/${userId}/`,
    payload
  );
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/users/${userId}/`);
};

export const listUsers = async (): Promise<UserSchema[]> => {
  const response: AxiosResponse<UserSchema[]> = await apiClient.get(
    `/users/`
  );
  return response.data;
};

// Additional User Endpoint: Get Posts by User ID

export const getUserPosts = async (
  userId: number
): Promise<BlogPostSchema[]> => {
  const response: AxiosResponse<BlogPostSchema[]> = await apiClient.get(
    `/users/${userId}/posts`
  );
  return response.data;
};

export const getMe = async (): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await apiClient.get(
    `/users/me`
  );
  return response.data;
}