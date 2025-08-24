import { Comments } from '@common';
import { Button } from '@mui/material';

interface CommentsListProps {
  comments: Comments;
  onReact: (parentId: number) => void;
}

const CommentsList = ({ comments = [], onReact }: CommentsListProps) => {
  if (comments.length === 0) return <div>Alert: No comments added yet ...</div>;

  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.subject}
            <br />
            {comment.content}
            <br />
            <Button onClick={() => onReact(comment.id)}>React to this comment</Button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
