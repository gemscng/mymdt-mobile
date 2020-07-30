import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import TitleText from '@/components/TitleText';
import AppText from '@/components/AppText';
import ThemeButton from '@/components/ThemeButton';
import PhoneIcon from '@/assets/icon_smartphone.svg';
import ShieldIcon from '@/assets/icon_shield.svg';
import LockIcon from '@/assets/icon_lock-with-check.svg';

import {
  layout,
  icons,
  whiteCircle,
  iconShadow,
  dashDot,
  logoPosition,
  title as titleStyle,
  descriptionBoxContainer,
  descriptionLineContainer,
  descriptionLineTexts,
  descriptionLineTitle,
  descriptionLineCaption,
  descriptionLineSeparator,
} from './style';

const DescriptionLine = ({title, caption}) => {
  const theme = useTheme();
  return (
    <View style={descriptionLineContainer}>
      <LockIcon />
      <View style={descriptionLineTexts}>
        <TitleText style={descriptionLineTitle(theme)}>{title}</TitleText>
        <AppText style={descriptionLineCaption(theme)}>{caption}</AppText>
      </View>
    </View>
  );
};

const Layout = ({logo, rightIcon, title, descriptions, onContinuePress}) => {
  const theme = useTheme();

  return (
    <View style={layout}>
      <View style={icons}>
        <View style={[whiteCircle, iconShadow]}>
          <PhoneIcon />
        </View>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={dashDot} />
        ))}
        <View>
          <ShieldIcon style={iconShadow} />
          <View style={logoPosition}>{logo}</View>
        </View>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={dashDot} />
        ))}
        <View style={[whiteCircle, iconShadow]}>{rightIcon}</View>
      </View>
      <TitleText style={titleStyle}>{title}</TitleText>
      <View style={descriptionBoxContainer(theme)}>
        {descriptions.map((descriptionLine, i) => [
          <DescriptionLine
            key={descriptionLine.title}
            title={descriptionLine.title}
            caption={descriptionLine.caption}
          />,
          i < descriptions.length - 1 && (
            <View key={`separator-${i}`} style={descriptionLineSeparator} />
          ),
        ])}
      </View>
      <ThemeButton onPress={onContinuePress}>Continue</ThemeButton>
    </View>
  );
};

export default Layout;
