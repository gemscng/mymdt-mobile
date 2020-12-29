import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const label = (theme, focused) => css`
  color: ${focused
    ? theme.colors.background1
    : theme.colors.textOnBackground.mediumEmphasis};
  margin-top: 8px;
  text-align: center;
`;

export const styles = StyleSheet.create({
  tabBarContainer: {
    height: 72,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  tabBar: {
    maxWidth: 60,
    aspectRatio: 1,
    paddingVertical: 8,
    marginVertical: 6,
    marginHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // shadowColor: 'rgba(33, 206, 219, 0.2)',
    // shadowOffset: {height: 6},
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 1,
  },
  tabBarShadow: {
    shadowColor: 'rgba(33, 206, 219, 0.2)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    display: 'none',
  },
  card: {},
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
