import React, { createContext, useContext } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { apiLogin } from './utils/api';
import useLocalStorageState from '../hooks/useLocalStorageState';

interface AuthContextProps {
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useLocalStorageState<string | null>('accessToken', null);
  const [refreshToken, setRefreshToken] = useLocalStorageState<string | null>('refreshToken', null);

  // TODO: add support for 
  // - [x] API/token/pair (LOGIN)
  // - [ ] API/token/refresh (REFRESH)
  // - [ ] API/token/verify ()

  const loginMutation = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await apiLogin(username, password);
      return {
        access: response.access,
        refresh: response.refresh,
      };
    },
    {
      onSuccess: ({ access, refresh, }) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        queryClient.invalidateQueries('user'); // Refresh user data
        router.push('/');
      },
      onError: () => {
        setAccessToken(null);
        setRefreshToken(null);
      },
    }
  );

  const login = (username: string, password: string) => {
    loginMutation.mutate({ username, password });
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    router.push('/login');
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
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
