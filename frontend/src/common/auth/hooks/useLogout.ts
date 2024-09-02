import { useMutation } from 'react-query';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const { logout } = useAuth();

  const mutation = useMutation(() => {
    return logout();
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
