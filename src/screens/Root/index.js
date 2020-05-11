import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer as Container} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';

import {UpperSafeAreaView, LowerSafeAreaView} from './style';

import OnboardingScreen from '@/screens/OnboardingScreen';
import BrandSelectScreen from '@/screens/BrandSelectScreen';
import BrandSelectConfirmScreen from '@/screens/BrandSelectConfirmScreen';
import SignInScreen from '@/screens/SignInScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import BindEmailScreen from '@/screens/BindEmailScreen';
import LoadingScreen from '@/screens/LoadingScreen';
import NotificationScreen from '@/screens/NotificationScreen';
import AccountSetupDoneScreen from '@/screens/AccountSetupDoneScreen';
import VerifyPhoneNumberScreen from '@/screens/VerifyPhoneNumberScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import HomeStack from '@/screens/HomeStack';
import ModalStack from '@/screens/ModalStack';

import BackButton from '@/components/BackButton';

const Stack = createStackNavigator();

const screens = [
  {name: 'onboarding', component: OnboardingScreen},
  {name: 'sign_in', component: SignInScreen},
  {name: 'welcome', component: WelcomeScreen},
  {name: 'brand_select', component: BrandSelectScreen},
  {name: 'brand_select_confirm', component: BrandSelectConfirmScreen},
  {name: 'verify_phone_number', component: VerifyPhoneNumberScreen},
  {name: 'loading', component: LoadingScreen},
];

const noBackScreen = [
  'onboarding',
  'loading',
  'notification',
  'account_setup_done',
];

const Root = () => {
  const {authToken, isEmailBound, isProfileCompleted} = useContext(AuthContext);
  console.log('authToken', authToken);
  return (
    <>
      <UpperSafeAreaView />
      <LowerSafeAreaView>
        <Container>
          {authToken == null ? (
            <Stack.Navigator>
              {screens.map(screen => (
                <Stack.Screen
                  name={screen.name}
                  component={screen.component}
                  options={{
                    headerTransparent: true,
                    headerTitleStyle: styles.headerTitle,
                    cardStyle: styles.card,
                    headerStyle: styles.header,
                    headerLeft: () =>
                      noBackScreen.includes(screen.name) ? null : (
                        // <HeaderButton root="onboarding" />
                        <BackButton />
                      ),
                  }}
                />
              ))}
            </Stack.Navigator>
          ) : (
            <Stack.Navigator mode="modal" headerMode="none">
              {!isProfileCompleted && (
                <Stack.Screen
                  name="user_profile"
                  component={UserProfileScreen}
                  options={{cardStyle: styles.card}}
                />
              )}
              {!isEmailBound && (
                <Stack.Screen
                  name="bind_email"
                  component={BindEmailScreen}
                  options={{cardStyle: styles.card}}
                />
              )}
              <Stack.Screen name="home" component={HomeStack} />
              <Stack.Screen name="modal" component={ModalStack} />
              <Stack.Screen
                name="notification"
                component={NotificationScreen}
                options={{cardStyle: styles.card}}
              />
              <Stack.Screen
                name="account_setup_done"
                component={AccountSetupDoneScreen}
                options={{cardStyle: styles.card}}
              />
            </Stack.Navigator>
          )}
        </Container>
      </LowerSafeAreaView>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({
  headerTitle: {
    display: 'none',
  },
  header: {
    height: 80,
  },
  card: {
    backgroundColor: 'white',
  },
});
