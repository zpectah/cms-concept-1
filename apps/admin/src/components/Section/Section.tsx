import { Stack, Typography } from '@mui/material';
import { UI_SPACING } from '../../constants';
import { Card } from '../Card';
import { SectionProps } from './types';
import { sectionSpacingKeys } from './enums';

const Section = ({
  children,
  title,
  subtitle,
  cardContent,
  cardProps,
  contentSpacing = sectionSpacingKeys.default,
  stackProps,
  titleSlot,
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
      <Stack direction="column" gap={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {title && <Typography variant="h3">{title}</Typography>}
          {titleSlot && titleSlot}
        </Stack>
        {subtitle && (
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </Stack>
      {cardContent ? <Card {...cardProps}>{renderContent()}</Card> : renderContent()}
    </Stack>
  );
};

export default Section;
