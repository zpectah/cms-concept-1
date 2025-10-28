import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, MembersDetail } from '@common';
import { getConfig } from '../../../utils';
import { useMembersHelpers, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMembersQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { registeredFormFields } from '../../../enums';
import { MembersDetailFormSchema } from './schema';
import { IMembersDetailForm } from './types';
import { getMembersDetailFormDefaultValues, getMembersDetailFormMapper } from './helpers';

export const useMembersDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast, openConfirmDialog } = useAppStore();
  const { setTitle } = useViewLayoutContext();
  const { membersQuery, membersDetailQuery, membersPatchMutation, membersCreateMutation } = useMembersQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.members);
  const form = useForm<IMembersDetailForm>({
    resolver: zodResolver(MembersDetailFormSchema),
    defaultValues: getMembersDetailFormDefaultValues(),
  });
  const { isAttributeUnique } = useMembersHelpers();

  const { data: members, refetch } = membersQuery;
  const { data: detailData, ...detailQuery } = membersDetailQuery;
  const { mutate: onCreate } = membersCreateMutation;
  const { mutate: onPatch } = membersPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IMembersDetailForm) =>
    onCreate(master as MembersDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.members.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const patchHandler = (master: IMembersDetailForm) =>
    onPatch(master as MembersDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.members.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const deleteConfirmHandler = () => {
    const master = Object.assign({
      ...detailData,
      deleted: true,
    });

    removeItemFromFavorites(master.id);
    patchHandler(master);
  };

  const submitHandler: SubmitHandler<IMembersDetailForm> = (data) => {
    if (!data) return;

    if (data.deleted === true) {
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
      });

      return;
    }

    if (!isAttributeUnique(members ?? [], registeredFormFields.email, data as MembersDetail)) {
      form.setError(registeredFormFields.email, {
        message: t('form:message.error.duplicityEmail'),
      });

      return;
    }

    const master = Object.assign({
      ...data,
    });

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        setTitle(t('button.new.members'));
        form.reset(getMembersDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getMembersDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.members),
    },
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
    isSubmitting: false,
  };
};
