import {css} from '@emotion/native';

export const container = css`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-items: stretch;
`;

export const merchant = (theme, selected, isError) => css`
  width: 48%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  position: relative;
  border-radius: 16px;
  background-color: 'transparent';
  ${selected
    ? `background-color: ${
        isError
          ? theme.colors.textOnError.normal
          : theme.colors.secondary.normal
      };`
    : 'background-color: transparent;'}
`;

export const stateContainer = css`
  width: 20px;
  height: 20px;
  margin-top: 12px;
`;

export const checkBox = (theme) => css`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 2px solid ${theme.colors.contrastColor};
`;

export const merchantNameStyle = (theme) => css`
  margin-top: 8px;
  margin-bottom: 4px;
  text-align: center;
  color: ${theme.colors.textOnBackground.highEmphasis};
`;
