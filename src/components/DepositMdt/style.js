import {css} from '@emotion/native';

export const mediumEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const highEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const depositAddress = css`
  margin-top: 24px;
  margin-bottom: 8px;
`;

export const rowContainer = css`
  flex-direction: row;
`;

export const copy = css`
  margin-left: 18px;
  flex-basis: 15%;
  align-items: center;
  justify-content: center;
`;

export const copyText = (theme) => css`
  color: ${theme.colors.primary.normal};
`;

export const inputContainer = (theme) => css`
  background-color: ${theme.colors.background2};
  border-radius: 8px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  flex-basis: 70%;
  flex-grow: 1;
`;
