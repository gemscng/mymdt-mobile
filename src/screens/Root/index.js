import React, {useContext, useEffect} from 'react';
import {Linking} from 'react-native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {NavigationContainer, getStateFromPath} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import OnboardingScreen from '@/screens/OnboardingScreen';
import MerchantSelectScreen from '@/screens/MerchantSelectScreen';
import EnterScreen from '@/screens/EnterScreen';
import VerifyEnterScreen from '@/screens/VerifyEnterScreen';
import UserProfileSetupOnboardingScreen from '@/screens/UserProfileSetupOnboardingScreen';
import BindEmailScreen from '@/screens/BindEmailScreen';
import LoadingScreen from '@/screens/LoadingScreen';
import NotificationPermissionScreen from '@/screens/NotificationPermissionScreen';
import AccountSetupDoneScreen from '@/screens/AccountSetupDoneScreen';
import ChooseCashBackTypeScreen from '@/screens/ChooseCashBackTypeScreen';
import ChooseBindDataSourceOnboardingScreen from '@/screens/ChooseBindDataSourceOnboardingScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import EnjoyCashBackScreen from '@/screens/EnjoyCashBackScreen';
import CongratulationsScreen from '@/screens/CongratulationsScreen';
import SignUpRewardScreen from '@/screens/SignUpRewardScreen';
import HomeTab from '@/screens/HomeTab';
import ChooseRegionScreen from '@/screens/ChooseRegionScreen';
import EmailDataSourceInfoOnboardingScreen from '@/screens/EmailDataSourceInfoOnboardingScreen';
import BankDataSourceInfoOnboardingScreen from '@/screens/BankDataSourceInfoOnboardingScreen';
import LinkedCardsScreen from '@/screens/LinkedCardsScreen';
import LinkedEmailsScreen from '@/screens/LinkedEmailsScreen';

import NotificationScreen from '@/screens/NotificationScreen';
import UserProfileEditScreen from '@/screens/UserProfileEditScreen';
import LinkedEmailsSettingScreen from '@/screens/LinkedEmailsSettingScreen';
import SettingScreen from '@/screens/SettingScreen';
import AppSettingScreen from '@/screens/AppSettingScreen';

import AccountSecurityScreen from '@/screens/AccountSecurityScreen';
import VerifyPhoneNumberScreen from '@/screens/VerifyPhoneNumberScreen';
import ChangePhoneNumberScreen from '@/screens/ChangePhoneNumberScreen';
import PhoneSuccessScreen from '@/screens/PhoneSuccessScreen';
import ChangePinScreen from '@/screens/ChangePinScreen';
import SetupPinScreen from '@/screens/SetupPinScreen';
import ForgetPinScreen from '@/screens/ForgetPinScreen';
import VerifyIdentityScreen from '@/screens/VerifyIdentityScreen';
import ResetPinScreen from '@/screens/ResetPinScreen';
import PinSuccessScreen from '@/screens/PinSuccessScreen';

import MerchantPreferenceEditScreen from '@/screens/MerchantPreferenceEditScreen';
import LinkedCardsSettingScreen from '@/screens/LinkedCardsSettingScreen';
import ChooseRegionSettingScreen from '@/screens/ChooseRegionSettingScreen';
import ChooseCashBackTypeSettingScreen from '@/screens/ChooseCashBackTypeSettingScreen';
import EmailDataSourceInfoSettingScreen from '@/screens/EmailDataSourceInfoSettingScreen';
import BankDataSourceInfoSettingScreen from '@/screens/BankDataSourceInfoSettingScreen';
import ChooseBindDataSourceSettingScreen from '@/screens/ChooseBindDataSourceSettingScreen';
import ReferralScreen from '@/screens/ReferralScreen';

// wallet page
import ConverterScreen from '@/screens/ConverterScreen';
import WithdrawalScreen from '@/screens/WithdrawalScreen';
import MissingReceiptScreen from '@/screens/MissingReceiptScreen';
import TransactionDetailScreen from '@/screens/TransactionDetailScreen';
import TransactionDetailMoreScreen from '@/screens/TransactionDetailMoreScreen';

import MdtDetailScreen from '@/screens/MdtDetailScreen';
import MrpDetailScreen from '@/screens/MrpDetailScreen';
import NewTokenDetailScreen from '@/screens/NewTokenDetailScreen';

import MembershipDetailScreen from '@/screens/MembershipDetailScreen';
import UpgradeScreen from '@/screens/UpgradeScreen';
import CashBackSummaryScreen from '@/screens/CashBackSummaryScreen';
import StakeScreen from '@/screens/StakeScreen';
import GiftCodeScreen from '@/screens/GiftCodeScreen';

import {AuthContext} from '@/context/auth';
import {SetupFlowContext} from '@/context/setupFlow';
import BackAppButton from '@/components/BackAppButton';
import CloseIconButton from '@/components/CloseIconButton';
import BackIconButton from '@/components/BackIconButton';
import AccountIconWithBadge from '@/components/AccountIconWithBadge';
import {APP_BAR_HEIGHT} from '@/constants/layout';

import {styles} from './style';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const setupScreens = [
  // 1st step: welcome screen
  {name: 'welcome', component: WelcomeScreen, appBarShown: false},

  // 2nd step: set up user profile
  {
    name: 'user_profile',
    component: UserProfileSetupOnboardingScreen,
    appBarShown: false,
  },

  // 3rd step: enjoy cash back
  {
    name: 'enjoy_cashback',
    component: EnjoyCashBackScreen,
    appBarShown: false,
  },

  // 4th step: select merchants
  {name: 'merchant_select', component: MerchantSelectScreen},

  // 5th step: bind email (which is skippable)
  {
    name: 'introduction',
    component: ChooseBindDataSourceOnboardingScreen,
    options: {headerShown: false},
  },
  {
    name: 'email_data_source_info_onboarding',
    component: EmailDataSourceInfoOnboardingScreen,
  },
  {
    name: 'add_email',
    component: BindEmailScreen,
  },
  {
    name: 'linked_emails',
    component: LinkedEmailsScreen,
  },
  {
    name: 'choose_region',
    component: ChooseRegionScreen,
  },
  {
    name: 'bank_data_source_info_onboarding',
    component: BankDataSourceInfoOnboardingScreen,
  },
  {
    name: 'linked_cards',
    component: LinkedCardsScreen,
    options: {headerShown: false},
  },

  // 6th step: congratulations
  {
    name: 'congratulations',
    component: CongratulationsScreen,
    appBarShown: false,
  },

  // 7th step: choose cashback type
  {
    name: 'choose_cash_back_type',
    component: ChooseCashBackTypeScreen,
    options: {headerShown: false},
  },

  // 8th step: setup done and gain reward
  {
    name: 'account_setup_done',
    component: AccountSetupDoneScreen,
    options: {headerShown: false},
  },
  {
    name: 'sign_up_reward',
    component: SignUpRewardScreen,
    options: {headerShown: false},
  },

  // 9th step: turn on notification
  {
    name: 'notification_permission',
    component: NotificationPermissionScreen,
    options: {headerShown: false},
  },
];

const authScreens = [
  {
    name: 'home',
    component: HomeTab,
    options: {
      headerLeft: (props) => <AccountIconWithBadge {...props} />,
      headerTransparent: true,
    },
  },
  {
    name: 'upgrade',
    component: UpgradeScreen,
    options: {headerShown: false},
  },
  {
    name: 'membership_detail',
    component: MembershipDetailScreen,
    options: {themeStyle: true},
  },
];

const authModalScreens = [
  {name: 'notification', component: NotificationScreen},
  // {name: 'my_referral_code', component: UserProfileEditScreen},
  // {name: 'enter_invite_code', component: AppSettingScreen},
  {name: 'converter', component: ConverterScreen},
  {name: 'withdrawal', component: WithdrawalScreen},
  {name: 'missing_receipt', component: MissingReceiptScreen},
  {name: 'transaction_detail', component: TransactionDetailScreen},
  {name: 'transaction_detail_more', component: TransactionDetailMoreScreen},
  {
    name: 'cash_back_summary',
    component: CashBackSummaryScreen,
  },
  {name: 'referral', component: ReferralScreen},
  {
    name: 'stake',
    component: StakeScreen,
  },
  {
    name: 'mdt_gift_code',
    component: GiftCodeScreen,
    options: {
      headerTransparent: true,
    },
  },
  {
    name: 'choose_cash_back_type_setting',
    component: ChooseCashBackTypeSettingScreen,
  },
  {
    name: 'choose_bind_data_source_setting',
    component: ChooseBindDataSourceSettingScreen,
  },
];

const settingScreens = [
  {
    name: 'settingsHome',
    component: SettingScreen,
    options: {headerTransparent: true},
  },
  {name: 'edit_profile', component: UserProfileEditScreen},
  {name: 'offers_preference_edit', component: MerchantPreferenceEditScreen},
  {name: 'merchants_preference', component: MerchantSelectScreen},
  {name: 'emails_binding', component: BindEmailScreen}, // same as add_email in setupScreens (but different navigator)
  {name: 'linked_emails_setting', component: LinkedEmailsSettingScreen}, // enter by the user menu
  {name: 'account_security', component: AccountSecurityScreen},
  {name: 'verify_phone_number', component: VerifyPhoneNumberScreen},
  {name: 'change_phone_number', component: ChangePhoneNumberScreen},
  {name: 'phone_success', component: PhoneSuccessScreen},
  {name: 'change_pin', component: ChangePinScreen},
  {name: 'setup_pin', component: SetupPinScreen},
  {name: 'forget_pin', component: ForgetPinScreen},
  {name: 'verify_identity', component: VerifyIdentityScreen},
  {name: 'reset_pin', component: ResetPinScreen},
  {name: 'pin_success', component: PinSuccessScreen},
  {name: 'app_settings', component: AppSettingScreen},
  {name: 'faq_and_support', component: AppSettingScreen},
  {name: 'terms_of_service', component: AppSettingScreen},
  {name: 'privacy_policy', component: AppSettingScreen},
  {name: 'about_us', component: AppSettingScreen},
  {
    name: 'linked_cards_setting',
    component: LinkedCardsSettingScreen,
  },
  {
    name: 'choose_region_setting',
    component: ChooseRegionSettingScreen,
  },
  {
    name: 'email_data_source_info_setting',
    component: EmailDataSourceInfoSettingScreen,
  },
  {
    name: 'bank_data_source_info_setting',
    component: BankDataSourceInfoSettingScreen,
  },
];

const linkingConfig = {
  // invitefd://. (go to invite friend page)
  // secureaccount:// (go to secure account page)
  // bindemail:// (go to bind email page)
  // bindbank:// (go to bind bank account page)
  // internalweb://
  // externalweb://

  // TODO: handle internalweb and externalweb
  initialRouteName: 'home',
  screens: {
    settings: {
      screens: {
        account_security: {
          path: 'secureaccount',
          exact: true,
        },
        emails_binding: {
          path: 'bindemail',
          exact: true,
        },
        linked_cards_setting: {
          path: 'bindbank',
          exact: true,
        },
      },
    },
    referral: {
      path: 'referral',
      exact: true,
    },
    home: {
      // return to home if the path not match
      path: '*',
    },
  },
};

const linking = {
  // e.g. rewardme://secureaccount
  prefixes: ['rewardme://'],
  config: linkingConfig,
  getStateFromPath(path, config) {
    // ignore url from bank sync server
    if (path.startsWith('planto') || path.startsWith('credigo')) {
      return null;
    }
    return getStateFromPath(path, config);
  },
};

const SettingStack = createStackNavigator();
const screenUnderModalOptions = {
  headerTitle: null,
  headerStyle: {
    height: APP_BAR_HEIGHT,
    shadowOffset: {x: 0, y: 0},
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerLeftContainerStyle: {
    paddingLeft: 24,
  },
  headerRightContainerStyle: {
    paddingRight: 24,
  },
  cardStyle: [styles.card],
  headerStatusBarHeight: 16,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

const Setting = ({navigation}) => {
  const theme = useTheme();

  const settingCardStyle = [
    css`
      ${theme.colors.elevatedBackgroundFlat}
    `,
    {
      ...screenUnderModalOptions.cardStyle,
    },
  ];

  const settingHeaderStyle = [
    css`
      ${theme.colors.elevatedBackgroundFlat}
    `,
    {
      ...screenUnderModalOptions.headerStyle,
    },
  ];

  return (
    <SettingStack.Navigator
      screenOptions={{
        ...screenUnderModalOptions,
        cardStyle: settingCardStyle,
        headerStyle: settingHeaderStyle,
        headerLeft: ({onPress}) => {
          return onPress ? (
            <BackIconButton onPress={onPress} />
          ) : (
            <CloseIconButton onPress={() => navigation.goBack()} />
          );
        },
      }}>
      {settingScreens.map(({name, ...props}) => (
        <SettingStack.Screen key={name} name={name} {...props} />
      ))}
    </SettingStack.Navigator>
  );
};

const Main = () => {
  const theme = useTheme();
  const {isLoggedIn} = useContext(AuthContext);
  const {validScreenNames} = useContext(SetupFlowContext);
  const {top} = useSafeAreaInsets();

  const headerStyle = {
    ...styles.header,
    height: top + APP_BAR_HEIGHT,
    backgroundColor: theme.colors.background1,
  };

  const cardStyle = {
    ...styles.card,
    backgroundColor: theme.colors.background1,
  };

  const walletHeaderStyle = {
    height: top + APP_BAR_HEIGHT,
    elevation: 0,
    shadowColor: 'transparent',
    backgroundColor: theme.colors.secondary.walletBackground,
  };

  const walletCardStyle = [
    css`
      ${theme.colors.elevatedDarkerBackgroundFlat}
    `,
    {
      ...styles.card,
    },
  ];

  const walletOptions = {
    cardStyle: walletCardStyle,
    headerStyle: walletHeaderStyle,
  };

  const walletScreens = [
    {
      name: 'mrp_detail',
      component: MrpDetailScreen,
      options: walletOptions,
    },
    {
      name: 'mdt_detail',
      component: MdtDetailScreen,
      options: {
        ...walletOptions,
        headerStyle: {
          ...walletHeaderStyle,
          backgroundColor: theme.colors.primary.walletBackground,
        },
      },
    },
    {
      name: 'newToken_detail',
      component: NewTokenDetailScreen,
      options: walletOptions,
    },
  ];

  return (
    <MainStack.Navigator
      headerMode="screen"
      screenOptions={{
        // TODO: check if any common option is un-necessary
        headerTitleStyle: styles.headerTitle,
        cardStyle: cardStyle,
        headerStyle: headerStyle,
        gestureEnabled: false,
        headerStatusBarHeight: top,
        headerLeftContainerStyle: {
          paddingLeft: 24,
        },
      }}>
      {!isLoggedIn && (
        <>
          <MainStack.Screen
            name="onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="enter"
            component={EnterScreen}
            options={{
              headerTitle: null,
              headerLeft: (props) => <BackAppButton {...props} />,
            }}
          />
          <MainStack.Screen
            name="verify_enter"
            component={VerifyEnterScreen}
            options={{
              headerTitle: null,
              headerLeft: (props) => <BackAppButton {...props} />,
            }}
          />
          {/* TODO: remove seemingly un-used loading screen */}
          <MainStack.Screen
            name="loading"
            component={LoadingScreen}
            options={{
              headerTitle: null,
              headerLeft: (props) => <BackAppButton {...props} />,
            }}
          />
        </>
      )}
      {isLoggedIn
        ? setupScreens
            .filter((setupScreen) => validScreenNames[setupScreen.name])
            .map(({name, appBarShown, options, ...screenProps}) => {
              return (
                <MainStack.Screen
                  key={name}
                  name={name}
                  {...screenProps}
                  options={{
                    headerLeft: (props) =>
                      appBarShown === false ? null : (
                        <BackAppButton {...props} />
                      ),
                    headerStyle: {
                      ...headerStyle,
                      ...(appBarShown === false && {height: top}),
                    },
                    ...options,
                  }}
                />
              );
            })
        : null}
      {isLoggedIn
        ? authScreens.map(({name, options, ...screenProps}) => (
            <MainStack.Screen
              key={name}
              name={name}
              {...screenProps}
              options={{
                headerLeft: BackAppButton,
                ...options,
              }}
            />
          ))
        : null}
      {isLoggedIn
        ? walletScreens.map(({name, options, ...screenProps}) => (
            <MainStack.Screen
              key={name}
              name={name}
              {...screenProps}
              options={{
                headerLeft: (props) => (
                  <BackAppButton colorVariant="white" {...props} />
                ),
                ...options,
              }}
            />
          ))
        : null}
    </MainStack.Navigator>
  );
};

const Root = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const theme = useTheme();

  const rootCardStyle = [
    {
      ...screenUnderModalOptions.cardStyle,
    },
    css`
      ${theme.colors.elevatedBackgroundLow}
    `,
  ];

  const rootHeaderStyle = [
    {
      ...screenUnderModalOptions.headerStyle,
    },
    css`
      ${theme.colors.elevatedBackgroundLow}
    `,
  ];

  const themeCardStyle = {
    ...screenUnderModalOptions.cardStyle,
    backgroundColor: theme.colors.themeBackground,
  };

  const themeHeaderStyle = {
    ...screenUnderModalOptions.headerStyle,
    backgroundColor: theme.colors.themeBackground,
  };

  useEffect(() => {
    Linking.addEventListener('url');
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={{
          ...TransitionPresets.ModalPresentationIOS,
          headerTitle: null,
          cardStyle: [styles.card],
          headerLeft: (props) => <CloseIconButton {...props} />,
          cardOverlayEnabled: true,
          gestureEnabled: true,
          headerStatusBarHeight: 0,
        }}>
        <RootStack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        {isLoggedIn ? (
          <RootStack.Screen
            name="settings"
            component={Setting}
            options={{headerShown: false, cardStyle: styles.modalCard}}
          />
        ) : null}
        {isLoggedIn
          ? authModalScreens.map(({name, options, ...screenProps}) => (
              <RootStack.Screen
                key={name}
                name={name}
                {...screenProps}
                options={{
                  ...screenUnderModalOptions,
                  ...options,
                  headerStyle: options?.themeStyle
                    ? themeHeaderStyle
                    : rootHeaderStyle,
                  cardStyle: [
                    options?.themeStyle ? themeCardStyle : rootCardStyle,
                    styles.modalCard,
                  ],
                }}
              />
            ))
          : null}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
