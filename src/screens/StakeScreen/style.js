import {css} from '@emotion/native';

export const marginTop = css`
  margin-top: 40px;
`;

export const stakeAmount = (theme) => css`
  color: ${theme.colors.primary.normal};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const center = css`
  justify-content: center;
  align-self: center;
`;

export const icon = css`
  margin-top: 24px;
`;

export const sectionContainer = (theme) => css`
  ${theme.colors.elevatedBackgroundMedium}
  margin-vertical: 16px;
  padding: 24px;
  padding-top: 16px;
  border-radius: 24px;
  shadow-opacity: 0;
`;

export const lowerHalfSectionContainer = (theme) => css`
  padding: 24px;
  padding-top: 40px;
  ${theme.colors.elevatedBackgroundMedium}
  border-top-width: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const availableMdtContainer = (theme) => css`
  border-width: 1px;
  border-color: ${theme.colors.background3};
  border-radius: 24px;
  padding: 8px;
`;

export const alertContainer = (theme) => css`
  background: ${theme.colors.detailBox.error};
  border-radius: 24px;
  padding: 16px;
`;

export const alert = css`
  justify-content: center;
`;

export const notEnought = (theme) => css`
  color: ${theme.colors.textOnError.normal};
  margin-bottom: 8px;
  margin-left: 4px;
`;

export const textAlignCenter = css`
  text-align: center;
`;

export const mediumEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const rowContainer = css`
  flex-direction: row;
`;
