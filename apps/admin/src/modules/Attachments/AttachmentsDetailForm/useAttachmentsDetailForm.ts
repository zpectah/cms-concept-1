import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, AttachmentsDetail } from '@common';
import { getConfig } from '../../../config';
import { useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useAttachmentsQuery } from '../../../hooks-query';
import { useModelFavorites, useUserActions } from '../../../hooks';
import { AttachmentsDetailFormSchema } from './schema';
import { IAttachmentsDetailForm } from './types';
import {
  getAttachmentsDetailFormDefaultValues,
  getAttachmentsDetailFormMapper,
  getAttachmentsDetailFormMapperToMaster,
} from './helpers';

export const useAttachmentsDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { attachments: modelActions } = useUserActions();
  const { addToast, openConfirmDialog } = useAppStore();
  const { setTitle } = useViewLayoutContext();
  const { attachmentsQuery, attachmentsDetailQuery, attachmentsPatchMutation } = useAttachmentsQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.attachments);
  const form = useForm<IAttachmentsDetailForm>({
    resolver: zodResolver(AttachmentsDetailFormSchema),
    defaultValues: getAttachmentsDetailFormDefaultValues(),
  });

  const { refetch } = attachmentsQuery;
  const { data: detailData, ...detailQuery } = attachmentsDetailQuery;
  const { mutate: onPatch } = attachmentsPatchMutation;

  const patchHandler = (master: IAttachmentsDetailForm) =>
    onPatch(master as AttachmentsDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.attachments.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError: (err) => {
        addToast(t('message.error.common'), 'error');
        console.warn(err);
      },
    });

  const deleteConfirmHandler = () => {
    if (!modelActions.delete) return;

    const master = Object.assign({
      ...detailData,
      deleted: true,
    });

    removeItemFromFavorites(master.id);
    patchHandler(master);
  };

  const submitHandler: SubmitHandler<IAttachmentsDetailForm> = (data) => {
    if (!modelActions.modify) return;
    if (!data) return;

    if (data.deleted === true) {
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
      });

      return;
    }

    const master = getAttachmentsDetailFormMapperToMaster(data);

    patchHandler(master);
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        setTitle(t('button.new.attachments'));
        form.reset(getAttachmentsDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.file_name);
        form.reset(getAttachmentsDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.attachments),
    },
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
    isSubmitting: false,
  };
};
