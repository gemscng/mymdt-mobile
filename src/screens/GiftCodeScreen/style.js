import {css} from '@emotion/native';

export const image = css`
  width: 100%;
`;

export const container = css`
  flex: 1;
`;

export const title = (theme) => css`
  color: ${theme.colors.background1};
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

export const redeemedAmount = css`
  position: absolute;
  align-self: center;
  width: 100%;
`;
