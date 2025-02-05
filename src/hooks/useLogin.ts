import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login } from '@/services/api';
import { LoginRequest, LoginResponse } from '@/types'

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};
