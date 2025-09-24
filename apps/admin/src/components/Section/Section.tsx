import { Stack, Typography } from '@mui/material';
import { Card } from '../Card';
import { SectionProps } from './types';
import { sectionSpacingKeys } from './enums';

const Section = ({
  children,
  title,
  cardContent,
  cardProps,
  contentSpacing = sectionSpacingKeys.none,
  stackProps,
}: SectionProps) => {
  const renderContent = () => {
    switch (contentSpacing) {
      case sectionSpacingKeys.default:
        return <Stack gap={0.5}>{children}</Stack>;

      case sectionSpacingKeys.content:
        return <Stack gap={2}>{children}</Stack>;

      case sectionSpacingKeys.form:
        return <Stack gap={1}>{children}</Stack>;

      case sectionSpacingKeys.none:
      default:
        return children;
    }
  };

  return (
    <Stack component="section" gap={2} {...stackProps}>
      {title && <Typography variant="h3">{title}</Typography>}
      {cardContent ? <Card {...cardProps}>{renderContent()}</Card> : renderContent()}
    </Stack>
  );
};

export default Section;
