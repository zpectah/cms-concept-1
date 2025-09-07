import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, AttachmentsDetail } from '@common';
import { getConfig } from '../../../utils';
import { useModelMenuItems } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useAttachmentsQuery } from '../../../hooks-query';
import { AttachmentsDetailFormSchema } from './schema';
import { IAttachmentsDetailForm } from './types';
import { getAttachmentsTypeDefaultValue, getAttachmentsDetailFormDefaultValues } from './helpers';

export const useAttachmentsDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { attachmentsDetailQuery, attachmentsPatchQuery } = useAttachmentsQuery(id);
  const { typeFieldOptions } = useModelMenuItems(modelKeys.attachments);
  const form = useForm<IAttachmentsDetailForm>({
    resolver: zodResolver(AttachmentsDetailFormSchema),
    defaultValues: getAttachmentsDetailFormDefaultValues(),
  });

  const { data: detailData, ...detailQuery } = attachmentsDetailQuery;
  const { mutate: patchMutate } = attachmentsPatchQuery;

  const createHandler = (master: IAttachmentsDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: IAttachmentsDetailForm) => {
    patchMutate(master as AttachmentsDetail, {
      onSuccess: () => {
        navigate(`/${routes.attachments.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        console.info('onSuccess', master);
      },
      onError: () => {
        addToast(t('message.error.common'), 'error');
        console.info('onError', master);
      },
    });
  };

  const deleteConfirmHandler = () => {
    const master = Object.assign({
      ...detailData,
      deleted: true,
    });

    patchHandler(master);
  };

  const submitHandler: SubmitHandler<IAttachmentsDetailForm> = (data) => {
    if (!data) return;

    if (data.deleted === true) {
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
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
        setTitle(t('button.new.attachments'));
        form.reset(getAttachmentsDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(detailData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    typeFieldOptions,
    typeFieldDefault: getAttachmentsTypeDefaultValue(),
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
  };
};
