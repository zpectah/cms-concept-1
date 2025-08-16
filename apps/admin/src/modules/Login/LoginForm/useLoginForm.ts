import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from './schema';
import { ILoginForm } from './types';
import { LoginFormDefaults } from './constants';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<ILoginForm>({
    defaultValues: LoginFormDefaults,
    resolver: zodResolver(LoginFormSchema),
  });

  const submitHandler: SubmitHandler<ILoginForm> = (data) => {
    console.log('data', data);
    // TODO
    navigate('/dashboard');
  };

  return { form, onSubmit: form.handleSubmit(submitHandler) };
};
