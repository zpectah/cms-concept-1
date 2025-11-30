import { useTranslation } from 'react-i18next';
import { Box, Button, Paper, Typography, Stack, Alert } from '@mui/material';
import { newItemKey } from '@common';
import { getFormattedDateString } from '../../../../utils';
import { CommentsListItemProps, CommentsListProps } from '../types';
import { useCommentsList } from './useCommentsList';

const CommentsListItem = ({
  id,
  subject,
  content,
  onReply,
  onDetail,
  onToggle,
  onDelete,
  children,
  sender,
  name,
  created,
  active,
}: CommentsListItemProps) => {
  const { t } = useTranslation(['common']);

  return (
    <Box id={name} sx={{ mb: 1.5 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="column" gap={1}>
          <Typography variant="h4">{subject}</Typography>
          <Typography variant="caption">
            {sender} | {getFormattedDateString(created)}
          </Typography>
          <Typography variant="body1">{content}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="start" gap={1} sx={{ mt: 2 }}>
          <Button onClick={() => onReply(id)} variant="outlined" size="small">
            {t('button.reply')}
          </Button>
          <Button onClick={() => onDetail(id)} variant="outlined" size="small">
            {t('button.edit')}
          </Button>
          <Button onClick={() => onToggle(id)} variant="outlined" size="small" color="warning">
            {active ? t('button.disable') : t('button.active')}
          </Button>
          <Button onClick={() => onDelete(id)} variant="outlined" size="small" color="error">
            {t('button.delete')}
          </Button>
        </Stack>
      </Paper>
      {children && children.length > 0 && (
        <Box sx={{ mt: 0.5, ml: 4 }}>
          {children.map((item) => (
            <CommentsListItem key={`${id}_sub_${item.id}`} {...item} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const CommentsList = ({ comments, contentType, contentId }: CommentsListProps) => {
  const { t } = useTranslation(['common', 'modules']);
  const { formattedComments, onDetail } = useCommentsList({
    rawComments: comments,
    contentType,
    contentId,
  });

  return (
    <Stack direction="column" gap={2}>
      {comments.length === 0 && <Alert severity="info">{t('modules:comments.label.noCommentsAdded')}</Alert>}
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            onDetail(newItemKey);
          }}
        >
          {t('modules:comments.button.addComment')}
        </Button>
      </div>
      {formattedComments?.map(({ ...comment }) => {
        return <CommentsListItem key={comment.id} {...comment} />;
      })}
    </Stack>
  );
};

export default CommentsList;
