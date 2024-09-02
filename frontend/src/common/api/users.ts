import axios, { AxiosResponse } from "axios";

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

// API Base URL
const API_BASE_URL = "http://localhost:8000/api"; // Update with your actual base URL

// User API Functions

export const createUser = async (
  payload: UserCreateSchema
): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await axios.post(
    `${API_BASE_URL}/users/`,
    payload
  );
  return response.data;
};

export const getUser = async (userId: number): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await axios.get(
    `${API_BASE_URL}/users/${userId}/`
  );
  return response.data;
};

export const updateUser = async (
  userId: number,
  payload: UserUpdateSchema
): Promise<UserSchema> => {
  const response: AxiosResponse<UserSchema> = await axios.put(
    `${API_BASE_URL}/users/${userId}/`,
    payload
  );
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/users/${userId}/`);
};

export const listUsers = async (): Promise<UserSchema[]> => {
  const response: AxiosResponse<UserSchema[]> = await axios.get(
    `${API_BASE_URL}/users/`
  );
  return response.data;
};

// Additional User Endpoint: Get Posts by User ID

export const getUserPosts = async (
  userId: number
): Promise<BlogPostSchema[]> => {
  const response: AxiosResponse<BlogPostSchema[]> = await axios.get(
    `${API_BASE_URL}/users/${userId}/posts`
  );
  return response.data;
};
