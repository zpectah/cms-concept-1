import { DialogBase } from '../../../../components';

interface CommentsDetailFormProps {
  open: boolean;
  onClose: () => void;
}

const CommentsDetailForm = ({ open, onClose }: CommentsDetailFormProps) => {
  return (
    <DialogBase
      open={open}
      onClose={onClose}
      dialogProps={{
        maxWidth: 'md',
        fullWidth: true,
      }}
      content={<form>form to create new comment</form>}
    />
  );
};

export default CommentsDetailForm;
