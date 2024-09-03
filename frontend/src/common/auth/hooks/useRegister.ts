import { useMutation } from 'react-query';
import { useAuth } from './useAuth';
import { createUser } from '@/common/api/users';

export const useRegister = () => {
  const { login } = useAuth();

  const mutation = useMutation(({ username, email, password }) => {
    console.log(username, email, password)
    return createUser({
      username: username,
      email: username,
      password: password,
    });
  }, {
    onSuccess: (data, variables) => {
      console.log({ cata, variables })
      // Automatically log in after successful registration
      // login(variables.username, variables.password);
    }
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
