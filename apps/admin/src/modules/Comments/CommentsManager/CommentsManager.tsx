import { useState } from 'react';
import { Button, Collapse, Stack, Badge } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { newItemKey, Model } from '@common';
import { useCommentsQuery } from '../../../hooks-query';
import { Section } from '../../../components';
import { CommentsList } from './CommentsList';
import { CommentsDetailForm } from './CommentsDetailForm';
import { CommentsManagerContextProvider } from './CommentsManager.context';

interface CommentsManagerProps {
  isEnabled: boolean;
  contentType: Model;
  contentId: number;
}

const CommentsManager = ({ isEnabled, contentType, contentId }: CommentsManagerProps) => {
  const [expanded, setExpanded] = useState(false);
  const [detailId, setDetailId] = useState<number | typeof newItemKey | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const { commentsQuery } = useCommentsQuery({ contentType, contentId });

  const { data: comments, isLoading } = commentsQuery;

  if (!isEnabled) return null;

  return (
    <CommentsManagerContextProvider
      value={{
        detailId,
        setDetailId: setDetailId,
        replyTo,
        setReplyTo,
      }}
    >
      {isLoading && <>Is loading ... please wait</>}

      <Section
        title={
          <Badge badgeContent={comments?.length} color="primary">
            Comments
          </Badge>
        }
        action={
          <Button onClick={() => setExpanded(!expanded)} variant="outlined" color="inherit" size="small">
            Expand &nbsp;
            <ExpandMoreIcon />
          </Button>
        }
      >
        <Collapse in={expanded}>
          <Stack direction="column" gap={2} alignItems="center">
            <CommentsList
              comments={comments ?? []}
              onReply={(parent) => {
                setDetailId(newItemKey);
                setReplyTo(parent);
                console.log('react to comment with id', parent);
              }}
              onDetail={(id) => {
                setDetailId(id);
                setReplyTo(null);
                console.log('detail id', id);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setDetailId(newItemKey);
                setReplyTo(null);
              }}
            >
              New comment
            </Button>
          </Stack>
        </Collapse>
      </Section>

      <CommentsDetailForm
        open={!!detailId}
        onClose={() => setDetailId(null)}
        contentType={contentType}
        contentId={contentId}
      />
    </CommentsManagerContextProvider>
  );
};

export default CommentsManager;
