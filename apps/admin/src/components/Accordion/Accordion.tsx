import { useState, ReactNode } from 'react';
import {
  Stack,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  StackProps,
  AccordionProps as MuiAccordionProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionItemProps {
  id?: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  actions?: ReactNode;
  accordionProps?: Partial<MuiAccordionProps>;
  disabled?: boolean;
  hidden?: boolean;
}

interface AccordionProps extends Partial<StackProps> {
  prefix?: string;
  singleOpen?: boolean;
  items: AccordionItemProps[];
  accordionProps?: Partial<MuiAccordionProps>;
}

const Accordion = ({ prefix = 'default', singleOpen, items = [], accordionProps, ...rest }: AccordionProps) => {
  const [activePanel, setActivePanel] = useState(0);

  const panelChangeHandler = (index: number) => setActivePanel(index);

  return (
    <Stack direction="column" gap={0} {...rest}>
      {items.map(({ id, title, subtitle, content, actions, disabled, hidden, ...itemProps }, index) => {
        const isExpanded = activePanel === index;

        if (hidden) return null;

        return (
          <MuiAccordion
            key={id ?? index}
            variant="outlined"
            disableGutters
            expanded={singleOpen ? isExpanded : undefined}
            onChange={singleOpen ? () => panelChangeHandler(index) : undefined}
            disabled={disabled}
            {...accordionProps}
            {...itemProps.accordionProps}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${prefix}-panel-${index}-content`}
              id={`${prefix}-panel-${index}-header`}
            >
              <Stack direction="row" gap={2} alignItems="center">
                <Typography component="span" variant="h4">
                  {title}
                </Typography>
                {subtitle && (
                  <Typography component="span" sx={{ color: 'text.secondary' }}>
                    {subtitle}
                  </Typography>
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
            {actions && <AccordionActions>{actions}</AccordionActions>}
          </MuiAccordion>
        );
      })}
    </Stack>
  );
};

export default Accordion;
