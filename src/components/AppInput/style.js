import {css} from '@emotion/native';

export const textInput = (theme, isFocus, themeColor) => css`
  padding: 14px 16px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${isFocus ? themeColor : 'transparent'};
  margin-vertical: 4px;
  color: ${theme.colors.contrastColor};
  background-color: ${theme.colors.background2};
`;

export const container = css`
  min-width: 65%;
`;

export const labelStyle = (theme) => css`
  color: ${theme.colors.contrastColor};
`;

export const remarkStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const errorStyle = (theme) => css`
  color: ${theme.colors.textOnError.light};
`;
