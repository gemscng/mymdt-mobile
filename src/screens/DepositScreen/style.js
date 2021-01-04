import {css} from '@emotion/native';

export const marginTop = css`
  margin-top: 16px;
`;

export const lowerHalfSectionContainer = (theme) => css`
  padding: 24px;
  ${theme.colors.elevatedBackgroundMedium}
  border-top-width: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const mediumEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const banner = css`
  margin-bottom: 24px;
`;
