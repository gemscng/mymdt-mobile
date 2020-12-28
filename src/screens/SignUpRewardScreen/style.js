import {css} from '@emotion/native';

export const gotRewardText = (theme) => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
`;

export const readyContainer = css`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

export const openContainer = css`
  flex: 1;
`;

export const inner = (theme) => css`
  padding-horizontal: 24px;
  margin-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;

export const giftContainer = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const textContainer = css`
  margin-top: 30px;
  align-self: center;
`;
