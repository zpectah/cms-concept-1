import { useForm } from 'react-hook-form';

export const useClientPanelForm = () => {
  const form = useForm();

  return {
    form,
  };
};
