import styled from '@emotion/native';

export const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.grey.light
      : props.theme.colors.black.normal};
  text-transform: uppercase;
  font-size: 14px;
  min-height: 33px;
  ${props =>
    props.small
      ? `padding: 9.5px 24px;
  border-radius: 28px;`
      : `padding: 20px 50px;
  border-radius: 42px;`}
  ${props => props.width && `width: ${props.width}; align-self: center;`}
  ${props =>
    props.reverse &&
    `background-color: ${props.theme.colors.white.normal}; border: 1px solid ${
      props.theme.colors.black.normal
    };`}
`;

export const Text = styled.Text`
  color: ${props =>
    props.disabled
      ? props.theme.colors.black.superLight
      : props.theme.colors.white.normal};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  color: ${props =>
    props.reverse
      ? props.theme.colors.black.normal
      : props.theme.colors.white.normal};
`;
