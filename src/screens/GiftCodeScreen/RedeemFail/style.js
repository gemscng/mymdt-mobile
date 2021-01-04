import {css} from '@emotion/native';

export const container = (theme) => css`
  flex: 1;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
  padding-horizontal: 24px;
`;

export const redeemMsg = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  text-align: center;
  margin-top: 48px;
  margin-bottom: 24px;
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  text-align: center;
`;

export const email = (theme) => css`
  color: ${theme.colors.primary.normal};
`;

export const image = css`
  align-self: center;
`;
