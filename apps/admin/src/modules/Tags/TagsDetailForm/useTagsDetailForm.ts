import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, tagsColorKeysArray, TagsDetail } from '@common';
import { getConfig } from '../../../utils';
import { useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useTagsQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { TagsDetailFormSchema } from './schema';
import { ITagsDetailForm } from './types';
import { getTagsDetailFormDefaultValues, getTagsDetailFormMapper } from './helpers';

export const useTagsDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { tagsDetailQuery, tagsPatchQuery } = useTagsQuery({ id });
  const { getTypeFieldOptions, getTranslatedOptionsFromList } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.tags);
  const form = useForm<ITagsDetailForm>({
    resolver: zodResolver(TagsDetailFormSchema),
    defaultValues: getTagsDetailFormDefaultValues(),
  });

  const { data: detailData, ...detailQuery } = tagsDetailQuery;
  const { mutate: patchMutate } = tagsPatchQuery;

  const createHandler = (master: ITagsDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: ITagsDetailForm) => {
    patchMutate(master as TagsDetail, {
      onSuccess: () => {
        navigate(`/${routes.tags.path}`);
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

    removeItemFromFavorites(master.id);
    patchHandler(master);
  };

  const submitHandler: SubmitHandler<ITagsDetailForm> = (data) => {
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
        setTitle(t('button.new.tags'));
        form.reset(getTagsDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getTagsDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.tags),
      color: getTranslatedOptionsFromList(tagsColorKeysArray, 'color'),
    },
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
  };
};
