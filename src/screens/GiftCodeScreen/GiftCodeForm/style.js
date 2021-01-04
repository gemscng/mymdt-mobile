import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const formView = (theme) => css`
  flex: 1;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
  padding-horizontal: 24px;
`;
