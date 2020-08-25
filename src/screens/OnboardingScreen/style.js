import styled from '@emotion/native';
import {StyleSheet, Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  padding-top: 76px;
  padding-bottom: 24px;
`;

export const ScrollContainer = styled.ScrollView``;

export const ContentContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const ButtonContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const ColorBackground = styled.View`
  color: ${props => props.backgroundColor};
  aspect-ratio: 1;
  border-radius: 24px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const Header = styled(TitleText)`
  font-size: 24px;
  margin-top: 40px;
  line-height: 29px;
  margin-bottom: 10px;
  text-align: center;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
`;

export const Details = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${props => props.theme.colors.textOnBackground.mediumEmphasis};
`;

export const MarginContainer = styled.View`
  margin-top: 12px;
`;

export const SwiperContainer = styled.View``;

export const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    height: 'auto',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  paginationContainer: {},
});
