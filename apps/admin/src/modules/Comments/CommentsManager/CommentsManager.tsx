import { useEffect, useState } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Model } from '@common';
import { useCommentsQuery } from '../../../hooks-query';
import { CommentsList } from './CommentsList';
import { CommentsDetailForm } from './CommentsDetailForm';

interface CommentsManagerProps {
  isEnabled: boolean;
  contentType: Model;
  contentId?: string;
}

const CommentsManager = ({ isEnabled, contentType, contentId }: CommentsManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { commentsQuery } = useCommentsQuery({ contentType, contentId: Number(contentId) });

  const { data: comments, isLoading } = commentsQuery;

  useEffect(() => {
    console.log('comments', comments);
  }, [comments]);

  if (!comments || !isEnabled) return null;

  return (
    <>
      {isLoading && <>Is loading ... please wait</>}

      <Accordion
        sx={{ mt: 1 }}
        slotProps={{
          root: {
            variant: 'outlined',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="comments-manager-content"
          id="comments-manager-header"
        >
          <Typography component="span" variant="h6">
            Comments ({comments?.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comments && (
            <CommentsList
              comments={comments}
              onReact={(parentId) => {
                setDialogOpen(true);
                console.log('react to comment with id', parentId);
              }}
            />
          )}
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained" color="secondary" onClick={() => setDialogOpen(true)}>
            New comment
          </Button>
        </AccordionActions>
      </Accordion>

      <CommentsDetailForm open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default CommentsManager;
