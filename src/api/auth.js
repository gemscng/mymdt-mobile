import {gql} from 'apollo-boost';

export const AUTH_TOKENS = gql`
  query AuthTokens {
    tokensInitialized @client
    accessToken @client
    refreshToken @client
    isRefreshTokenExpired @client
  }
`;

export const GET_OTP_API = gql`
  mutation RequestOtpCode(
    $phoneNumber: String!
    $locale: Locale!
    $action: SMSOtpAction!
  ) {
    requestOtpCode(phoneNumber: $phoneNumber, locale: $locale, action: $action)
  }
`;

export const ENTER_API = gql`
  mutation Enter(
    $phoneNumber: String!
    $otp: String!
    $locale: Locale!
    $deviceId: String!
  ) {
    enter(
      phoneNumber: $phoneNumber
      otp: $otp
      locale: $locale
      deviceId: $deviceId
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_API = gql`
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken)
  }
`;

export const SETUP_PIN_API = gql`
  mutation SetupPin($pin: String!, $confirmedPin: String!) {
    setupPin(pin: $pin, confirmedPin: $confirmedPin)
  }
`;

export const CHANGE_PIN_API = gql`
  mutation ChangePin(
    $oldPin: String!
    $newPin: String!
    $newConfirmedPin: String!
  ) {
    changePin(
      oldPin: $oldPin
      newPin: $newPin
      newConfirmedPin: $newConfirmedPin
    )
  }
`;

export const RESET_PIN_API = gql`
  mutation ResetPin(
    $otp: String!
    $newPin: String!
    $newConfirmedPin: String!
  ) {
    resetPin(otp: $otp, newPin: $newPin, newConfirmedPin: $newConfirmedPin)
  }
`;

export const VERIFY_PIN_API = gql`
  mutation VerifyPin($pin: String!) {
    verifyPin(pin: $pin)
  }
`;

export const CHANGE_PHONE_NUMBER_API = gql`
  mutation ChangePhoneNumber(
    $oldPhoneOtp: String!
    $newPhoneOtp: String!
    $pin: String!
  ) {
    changePhoneNumber(
      oldPhoneOtp: $oldPhoneOtp
      newPhoneOtp: $newPhoneOtp
      pin: $pin
    )
  }
`;

export const REGISTER_DEVICE = gql`
  mutation RegisterDevice(
    $deviceId: String!
    $platform: String!
    $pushToken: String!
  ) {
    registerDevice(
      deviceId: $deviceId
      platform: $platform
      pushToken: $pushToken
    )
  }
`;

export const REDEEM_GIFT_CODE = gql`
  mutation RedeemGiftCode($code: String!) {
    redeemGiftCode(code: $code) {
      value
    }
  }
`;
