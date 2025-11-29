import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import { useCommentsList } from './useCommentsList';
import { CommentsListItemProps, CommentsListProps } from '../types';

const CommentsListItem = ({
  id,
  subject,
  content,
  onReply,
  onDetail,
  children,
  sender,
  name,
  created,
}: CommentsListItemProps) => {
  return (
    <Box id={name} sx={{ mb: 1.5 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="column" gap={1}>
          <Typography variant="h4">{subject}</Typography>
          <Typography variant="caption">
            {sender} | {created}
          </Typography>
          <Typography variant="body1">{content}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="start" gap={1} sx={{ mt: 2 }}>
          <Button onClick={() => onReply(id)} variant="outlined" size="small">
            Reply
          </Button>
          <Button onClick={() => onDetail(id)} variant="outlined" size="small">
            Edit
          </Button>
          <Button variant="outlined" size="small" color="warning">
            Disable
          </Button>
          <Button variant="outlined" size="small" color="error">
            Delete
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

const CommentsList = ({ comments, onReply, onDetail }: CommentsListProps) => {
  const { formattedComments } = useCommentsList(comments, onReply, onDetail);

  if (comments.length === 0) return <div>Alert: No comments added yet ...</div>;

  return (
    <div>
      {formattedComments?.map(({ ...comment }) => {
        return <CommentsListItem key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default CommentsList;
