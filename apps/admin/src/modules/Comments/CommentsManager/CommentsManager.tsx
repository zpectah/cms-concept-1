import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, Stack, Badge, CircularProgress, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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

  const { t } = useTranslation(['common', 'modules']);
  const { commentsQuery } = useCommentsQuery({ contentType, contentId });

  const { data: comments, isLoading } = commentsQuery;

  if (!isEnabled) return null;

  return (
    <CommentsManagerContextProvider
      value={{
        detailId,
        replyTo,
        setDetailId,
        setReplyTo,
      }}
    >
      {isLoading && <CircularProgress />}

      <Section
        title={
          <Badge badgeContent={comments?.length} color="primary">
            {t('modules:comments.label.comments')}
          </Badge>
        }
        action={
          <Button onClick={() => setExpanded(!expanded)} variant="outlined" color="inherit" size="small">
            {expanded ? t('button.collapse') : t('button.expand')}&nbsp;
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        }
      >
        <Collapse in={expanded}>
          <Stack direction="column" gap={2} alignItems="center">
            <Box sx={{ width: '100%' }}>
              <CommentsList comments={comments ?? []} contentType={contentType} contentId={contentId} />
            </Box>
          </Stack>
        </Collapse>
      </Section>

      <CommentsDetailForm
        open={!!detailId}
        onClose={() => {
          setDetailId(null);
          setReplyTo(null);
        }}
        contentType={contentType}
        contentId={contentId}
      />
    </CommentsManagerContextProvider>
  );
};

export default CommentsManager;
