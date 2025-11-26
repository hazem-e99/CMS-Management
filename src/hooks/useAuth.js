import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
  });
};

export const useVerify = () => {
  return useMutation({
    mutationFn: authApi.verify,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
};
