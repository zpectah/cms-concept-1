import { useEffect, useState, forwardRef, useMemo } from 'react';
import Editor, {
  createButton,
  Toolbar,
  Separator,
  useEditorState,
  EditorProvider,
  ContentEditableEvent,
} from 'react-simple-wysiwyg';
import { styled, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import { WysiwygProps } from './types';

// https://www.npmjs.com/package/react-simple-wysiwyg

const FieldWrapper = styled(Stack, {
  shouldForwardProp: (propName) => propName !== 'isError',
})<{ readonly isError?: boolean }>(({ theme, isError }) => ({
  '& .rsw-editor': {
    border: 0,
    borderRadius: 0,
  },
  '& .rsw-toolbar': {
    background: 'none',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey['700'] : theme.palette.grey['400'],
    borderRadius: theme.shape.borderRadius,
    borderBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    '.rsw-btn': {
      color: theme.palette.text.primary,
      lineHeight: 1,

      '&:hover': {
        background: theme.palette.background.paper,
      },

      '&[data-active="true"]': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
      },
    },
    '.rsw-separator': {
      marginLeft: 0,
      marginRight: 0,
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey['700'] : theme.palette.grey['400'],
    },
    '.rsw-dd': {},
  },
  '& .rsw-ce': {
    // marginTop: theme.spacing(0.5),
    minHeight: '250px',
    padding: theme.spacing(1.5),
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: isError
      ? theme.palette.error.main
      : theme.palette.mode === 'dark'
      ? theme.palette.grey['700']
      : theme.palette.grey['400'],
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: '1px',
    color: theme.palette.text.primary,

    '&.rsw-html': {},
  },
}));

// In case of missing translations for button captions, redesign all buttons similar to 'ButtonHtml' and create events via 'document.execCommand()'

const ButtonUndo = createButton('Undo', <UndoIcon fontSize="inherit" />, 'undo');
const ButtonRedo = createButton('Redo', <RedoIcon fontSize="inherit" />, 'redo');
const ButtonBold = createButton('Bold', <FormatBoldIcon fontSize="inherit" />, 'bold');
const ButtonItalic = createButton('Italic', <FormatItalicIcon fontSize="inherit" />, 'italic');
const ButtonUnderline = createButton('Underline', <FormatUnderlinedIcon fontSize="inherit" />, 'underline');
const ButtonStrikeThrough = createButton(
  'strikeThrough',
  <FormatStrikethroughIcon fontSize="inherit" />,
  'strikeThrough'
);
const ButtonNumberedList = createButton(
  'orderedList',
  <FormatListNumberedIcon fontSize="inherit" />,
  'insertOrderedList'
);
const ButtonBulletList = createButton(
  'bulletList',
  <FormatListBulletedIcon fontSize="inherit" />,
  'insertUnorderedList'
);
const ButtonLink = createButton('Link', <LinkIcon fontSize="inherit" />, () => {
  document.execCommand('createLink', false, prompt('URL', '') || undefined);
});
const ButtonUnLink = createButton('Unlink', <LinkOffIcon fontSize="inherit" />, 'unlink');
const ButtonClearFormatting = createButton('Remove format', <FormatClearIcon fontSize="inherit" />, 'removeFormat');
const ButtonHtml = ({ ...rest }) => {
  const editorState = useEditorState();

  const clickHandler = () => {
    editorState.update({
      htmlMode: !editorState.htmlMode,
    });
  };

  return (
    <button
      className="rsw-btn"
      data-active={editorState.htmlMode}
      onClick={clickHandler}
      tabIndex={-1}
      title="HTML code"
      type="button"
      {...rest}
    >
      {editorState.htmlMode ? <CodeOffIcon fontSize="inherit" /> : <CodeIcon fontSize="inherit" />}
    </button>
  );
};

const Wysiwyg = forwardRef<HTMLInputElement, WysiwygProps>(
  ({ value, onChange, name, isError, disabled, required }, ref) => {
    const [html, setHtml] = useState<string>(value ?? '');
    const [focused, setFocused] = useState(false);

    const wrapperClassName = useMemo(() => {
      const classNames: string[] = [];

      if (focused) classNames.push('is-focused');
      if (isError) classNames.push('is-error');

      return classNames.join(' ');
    }, [focused, isError]);

    const changeHandler = (event: ContentEditableEvent) => {
      const newValue = event.target.value;

      setHtml(newValue);

      onChange?.(newValue, event);
    };
    const focusHandler = () => setFocused(true);
    const blurHandler = () => setFocused(false);

    useEffect(() => setHtml(value ?? ''), [value]);

    return (
      <EditorProvider>
        <FieldWrapper className={wrapperClassName} isError={isError}>
          <Editor
            name={name}
            value={html}
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            containerProps={{
              style: { resize: 'vertical', borderColor: 'red' },
              'aria-required': required,
              'aria-disabled': disabled,
            }}
            ref={ref}
            disabled={disabled}
          >
            <Toolbar>
              <ButtonBold />
              <ButtonItalic />
              <ButtonUnderline />
              <ButtonStrikeThrough />
              <Separator />
              <ButtonNumberedList />
              <ButtonBulletList />
              <Separator />
              <ButtonLink />
              <ButtonUnLink />
              <Separator />
              <ButtonClearFormatting />
              <Separator />
              <ButtonUndo />
              <ButtonRedo />
              <Separator />
              <ButtonHtml />
              <Separator />
            </Toolbar>
          </Editor>
        </FieldWrapper>
      </EditorProvider>
    );
  }
);

export default Wysiwyg;
