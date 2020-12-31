import React, {useContext} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Linking} from 'react-native';
import {FormattedMessage} from 'react-intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_PROFILE_API} from '@/api/data';
import AppAvator from '@/components/AppAvator';
import inAppBrowser from '@/utils/inAppBrowser';

import {
  listHeader,
  container,
  image,
  name,
  nameContainer,
  profileContainer,
  cardContainer,
  paddingBottom,
  signOut as signOutText,
} from './style';

import ListOption from '@/components/ListOption';
import ScreenContainer from '@/components/ScreenContainer';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';
import {AuthContext} from '@/context/auth';
import {ThemeContext} from '@/context/theme';
import MailIcon from '@/assets/icon_mail.svg';
import SettingIcon from '@/assets/icon_settings.svg';
// import DollarSignIcon from '@/assets/icon_dollar-sign.svg';
import CreditCardIcon from '@/assets/icon_credit-card.svg';
import ShieldIcon from '@/assets/icon_shield.svg';
import HelpIcon from '@/assets/icon_help-circle.svg';
import BookIcon from '@/assets/icon_book-open.svg';
import RewardMeIcon from '@/assets/icon_rewardme.svg';

const SettingScreen = ({navigation}) => {
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_USER_PROFILE_API, {
    fetchPolicy: 'network-only',
  });
  const userName = data?.userProfile?.name;
  const {isDark} = useContext(ThemeContext);
  const {signOut} = useContext(AuthContext);

  const accountSettingList = [
    {
      id: 'linked_emails_setting',
      messageId: 'emails_binding_edit',
      icon: MailIcon,
    },
    // {id: 'offers_preference_edit', icon: CreditCardIcon},
    {
      id: 'linked_cards_setting',
      messageId: 'linkedBankAccounts',
      icon: CreditCardIcon,
    },
    // {id: 'cashback_type', icon: DollarSignIcon},
    {id: 'account_security', icon: ShieldIcon},
  ];

  const generalSettingList = [
    {id: 'app_settings', icon: SettingIcon},
    {
      messageId: 'faq_and_support',
      url: 'https://www.reward.me/faq',
      icon: HelpIcon,
    },
    {
      messageId: 'terms_of_service_and_privacy_policy',
      url: 'https://reward.me/tandc',
      icon: BookIcon,
    },
    {
      messageId: 'about_us',
      icon: RewardMeIcon,
      url: 'https://reward.me/aboutus',
    },
    // TODO: add real url when website ready
  ];

  const backgroundImage = isDark
    ? require('@/assets/setting_background_dark.png')
    : require('@/assets/setting_background_light.png');

  return (
    <ScreenContainer headerTransparent>
      <ScrollView>
        <View style={container(theme)}>
          <View>
            <Image source={backgroundImage} style={image} resizeMode="cover" />
            <View style={profileContainer}>
              <AppAvator
                variant="image"
                sizeVariant="normal"
                imageSrc={require('@/assets/rewardme_avatar.png')}
              />
              <ListOption
                label={
                  <AppText variant="heading3" style={name(theme)}>
                    {userName}
                  </AppText>
                }
                style={nameContainer}
                onPress={() => navigation.navigate('edit_profile')}
              />
            </View>
          </View>
          <View style={[cardContainer(theme), paddingBottom]}>
            <AppText variant="label" style={listHeader(theme)}>
              <FormattedMessage id="account" defaultMessage="Account" />
            </AppText>
            {accountSettingList.map((as) => (
              <ListOption
                key={as.id}
                label={<FormattedMessage id={as.messageId || as.id} />}
                icon={as.icon}
                onPress={() => navigation.navigate(as.id, as.params)}
              />
            ))}
          </View>
          <View style={[cardContainer(theme), paddingBottom]}>
            <AppText variant="label" style={listHeader(theme)}>
              <FormattedMessage
                id="settings_and_support"
                defaultMessage="Settings & Support"
              />
            </AppText>
            {generalSettingList.map((gs) => (
              <ListOption
                key={gs.id || gs.url}
                label={<FormattedMessage id={gs.messageId || gs.id} />}
                icon={gs.icon}
                onPress={() => {
                  if (gs.id) {
                    navigation.navigate(gs.id);
                  } else {
                    inAppBrowser.open(gs.url);
                  }
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={cardContainer(theme)} onPress={signOut}>
            <AppText variant="button" style={signOutText(theme)}>
              <FormattedMessage id="sign_out" defaultMessage="Sign Out" />
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SettingScreen;
