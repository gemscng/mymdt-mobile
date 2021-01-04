import {css} from '@emotion/native';

export const container = (theme) => css`
  background: ${theme.colors.primary.walletBackground};
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 24px;
`;

export const total = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const totalBalance = css`
  justify-content: center;
`;

export const amount = css`
  justify-content: center;
`;

export const textAlignCenter = css`
  text-align: center;
`;

export const rowContainer = css`
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

export const marginRight = css`
  margin-right: 8px;
`;

export const banner = css`
  margin-top: 16px;
`;

export const sectionMargin = css`
  margin-top: 16px;
`;
