import React, { createContext, useContext } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { apiLogin } from './utils/api';
import useLocalStorageState from '../hooks/useLocalStorageState';
import axios from 'axios';
import { createUser, getMe } from '../api/users';
import { useToast } from '../ui/use-toast';

interface AuthContextProps {
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  register: (data) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast()

  const [accessToken, setAccessToken] = useLocalStorageState<string | null>('accessToken', null);
  const [refreshToken, setRefreshToken] = useLocalStorageState<string | null>('refreshToken', null);
  const [user, setUser] = useLocalStorageState<string | null>('user', null);

  // TODO: add support for 
  // - [x] API/token/pair (LOGIN)
  // - [ ] API/token/refresh (REFRESH)
  // - [ ] API/token/verify ()
  const onSetAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  }

  const registerMutation = useMutation(
    async (data) => {
      console.log("register mutation", {data})
      const response = await createUser(data);
      return response
      // return {
      //   access: response.access,
      //   refresh: response.refresh,
      // };
    },
    {
      onSuccess: async (_, {password, email}) => {
        toast({
          title: "Created New User!!!",
          description: "Sweet! welcome to the site!",
          variant: "secondary"
        })
        console.log("boom time", {email, password})
        login(email, password)
        queryClient.invalidateQueries('user'); // Refresh user data
        router.push('/posts');
      },
      onError: (e: Error) => {
        toast({
          title: "Error Creating User",
          description: e.message,
          variant: "destructive"
        })
        setAccessToken(null);
        setRefreshToken(null);
      },
    }
  );


  const loginMutation = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await apiLogin(username, password);
      return {
        // change this to response.access if not using sliding tokens
        access: response.token,
        // refresh: response.refresh,
      };
    },
    {
      onSuccess: async ({ access, refresh, }) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        queryClient.invalidateQueries('user'); // Refresh user data
        router.push('/posts');
      },
      onError: (e: Error) => {
        toast({
          title: "Unable to Login",
          variant: "destructive",
          description: e.message,
        })
        setAccessToken(null);
        setRefreshToken(null);
      },
    }
  );

  const login = (username: string, password: string) => {
    console.log("now logging in", {username, password})
    loginMutation.mutate({ username, password });
  };

  const register = ({username, avatar, password, email}) => {
    username ||= email
    avatar = "https://cdn.fakercloud.com/avatars/nilshoenson_128.jpg"
    console.log("register", {username, avatar, password, email})
    registerMutation.mutate({username, avatar, password, email});
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.clear()
    router.push('/');
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
