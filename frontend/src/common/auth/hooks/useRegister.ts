import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';
import { createUser } from '@/common/api/users';
import { toast } from '@/common/ui/use-toast';
import router from 'next/router';

export const useRegister = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => {
      console.log("register mutation", {data})
      const response = await createUser(data);
      return response
    },
    {
      onSuccess: async (_data, {password, email}) => {
        toast({
          title: "Created New User!!!",
          description: "Sweet! welcome to the site!",
          variant: "secondary"
        })
        console.log("boom time", {_data, email, password})
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
      },
    }
  );

  return {
    register: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
