import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {
  container,
  errorStyle,
  remarkStyle,
  labelStyle,
  textInput,
} from './style';
import {useField} from 'formik';

import AppText from '@/components/AppText2';

/**
 * @typedef {import('react-native').ViewStyle} ViewStyle
 * @typedef {import('react-native').TextStyle} TextStyle
 *
 * @typedef {Object} Props
 * @property {string} name
 * @property {JSX.Element} label
 * @property {boolean} required
 * @property {JSX.Element} remark
 * @property {boolean} readOnly
 * @property {TextStyle} remarkOuterStyle
 * @property {TextStyle} textStyle
 * @property {ViewStyle} style
 * @property {'secondary|primary'} colorVariant
 *
 * @typedef {import('react-native').TextInputProps} TextInputProps
 * @type {import('react').FunctionComponent<TextInputProps & Props>}
 */
const Input = ({
  name,
  label,
  required,
  remark,
  readOnly,
  remarkOuterStyle,
  textStyle,
  style,
  colorVariant,
  ...props
}) => {
  const theme = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error;
  const themeColor =
    colorVariant === 'secondary'
      ? theme.colors.secondary.normal
      : theme.colors.primary.normal;

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleOnBlur = (e) => {
    field.onBlur(name)(e);
    setIsFocus(false);
  };

  return (
    <View style={[container, style]}>
      <AppText
        variant="label"
        style={[
          labelStyle(theme),
          isFocus && {color: themeColor},
          isError && {color: theme.colors.textOnError.normal},
        ]}
        numberOfLines={1}
        ellipsizeMode="clip">
        {label ? label : ' '}
        {required && '*'}
      </AppText>
      <TextInput
        {...props}
        onFocus={handleOnFocus}
        onChangeText={field.onChange(name)}
        onBlur={handleOnBlur}
        value={field.value}
        autoCapitalize="none"
        isError={isError}
        placeholderTextColor={theme.colors.textOnBackground.disabled}
        style={[
          textInput(theme, isFocus, themeColor),
          isError && {
            color: theme.colors.textOnError.normal,
            backgroundColor: theme.colors.errorBackground,
          },
          isFocus && {
            backgroundColor: theme.colors.inputFocusBackground,
          },
          textStyle,
        ]}
      />
      {remark && (
        <AppText
          variant="caption"
          style={[remarkStyle(theme), remarkOuterStyle]}>
          {remark}
        </AppText>
      )}
      <AppText
        variant="caption"
        style={errorStyle(theme)}
        numberOfLines={1}
        ellipsizeMode="clip">
        {isError ? meta.error : ' '}
      </AppText>
    </View>
  );
};

Input.defaultProps = {
  colorVariant: 'secondary',
};

export default Input;
