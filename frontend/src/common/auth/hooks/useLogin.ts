import { useMutation } from 'react-query';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const { login } = useAuth();

  const mutation = useMutation((credentials: { username: string; password: string }) => {
    return login(credentials.username, credentials.password);
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
