import { Stack, Typography } from '@mui/material';
import { UI_SPACING } from '../../constants';
import { Card } from '../Card';
import { SectionProps } from './types';
import { sectionSpacingKeys } from './enums';

const Section = ({
  children,
  title,
  cardContent,
  cardProps,
  contentSpacing = sectionSpacingKeys.default,
  stackProps,
}: SectionProps) => {
  const renderContent = () => {
    switch (contentSpacing) {
      case sectionSpacingKeys.default:
        return <Stack gap={UI_SPACING.default}>{children}</Stack>;

      case sectionSpacingKeys.form:
        return <Stack gap={UI_SPACING.form}>{children}</Stack>;

      case sectionSpacingKeys.content:
        return <Stack gap={UI_SPACING.content}>{children}</Stack>;

      case sectionSpacingKeys.none:
      default:
        return children;
    }
  };

  return (
    <Stack component="section" gap={UI_SPACING.content} {...stackProps}>
      {title && <Typography variant="h3">{title}</Typography>}
      {cardContent ? <Card {...cardProps}>{renderContent()}</Card> : renderContent()}
    </Stack>
  );
};

export default Section;
