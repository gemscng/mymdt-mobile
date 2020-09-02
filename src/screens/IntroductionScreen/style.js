import styled, {css} from '@emotion/native';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  padding-bottom: 24px;
  align-items: center;
`;

export const ScrollContainer = styled.ScrollView`
  background: ${props => props.theme.colors.themeBackground};
  padding-left: 24px;
  padding-right: 24px;
`;

export const BackgroundImage = styled.Image`
  align-self: center;
  margin-bottom: 16px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.textOnThemeBackground.highEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;
