import { useMutation } from 'react-query';
import { apiRegister } from '../utils/api';
import { useAuth } from './useAuth';

export const useRegister = () => {
  const { login } = useAuth();

  const mutation = useMutation((credentials: { username: string; password: string }) => {
    return apiRegister(credentials.username, credentials.password);
  }, {
    onSuccess: (data, variables) => {
      // Automatically log in after successful registration
      login(variables.username, variables.password);
    }
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
