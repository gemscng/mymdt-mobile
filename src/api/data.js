import {gql} from 'apollo-boost';

export const TOAST_ERRORS = gql`
  query ToastErrors {
    toastErrors @client {
      id
      text
      variant
    }
  }
`;

export const UPDATE_USER_PROFILE_API = gql`
  mutation UpdateUserProfile(
    $name: String!
    $gender: String!
    $dateOfBirth: Time!
    $referralCode: String!
  ) {
    updateUserProfile(
      name: $name
      gender: $gender
      dateOfBirth: $dateOfBirth
      referralCode: $referralCode
    )
  }
`;

export const UPDATE_USER_PROFILE_EDIT_API = gql`
  mutation UpdateUserProfile(
    $name: String!
    $gender: String!
    $dateOfBirth: Time!
  ) {
    updateUserProfile(name: $name, gender: $gender, dateOfBirth: $dateOfBirth)
  }
`;

export const BIND_EMAIL_ACCOUNT_API = gql`
  mutation BindEmailAccount($email: String!, $token: String!) {
    bindEmailAccount(emailAddress: $email, token: $token)
  }
`;

export const BIND_EMAIL_ACCOUNTS_API = gql`
  mutation BindEmailAccounts($email: String!, $token: String!) {
    bindEmailAccounts(data: {emailAddress: $email, token: $token}) {
      valids {
        id
        emailAddress
      }
      invalids
    }
  }
`;

export const UNBIND_EMAIL_ACCOUNT_API = gql`
  mutation UnbindEmailAccount($id: ID!) {
    unbindEmailAccount(id: $id)
  }
`;

export const UNBIND_EMAIL_ACCOUNTS_API = gql`
  mutation UnbindEmailAccounts($ids: [ID!]!) {
    unbindEmailAccounts(ids: $ids)
  }
`;

export const GET_USER_EMAIL_ACCOUNTS_API = gql`
  query {
    userProfile {
      id
      emailAccounts {
        id
        emailAddress
      }
    }
  }
`;

export const GET_MERCHANTS_API = gql`
  query Merchants {
    merchants {
      id
      name
      logo
    }
  }
`;

export const CHOOSE_MERCHANTS_API = gql`
  mutation ChooseMerchants($ids: [ID!]!) {
    chooseMerchants(ids: $ids)
  }
`;

export const GET_ALLOWED_MERCHANT_NUM = gql`
  query {
    userProfile {
      id
      membership {
        id
        merchantsNumAllowed
      }
    }
  }
`;

export const GET_USER_MEMBERSHIP_API = gql`
  query {
    userProfile {
      name
      id
      membership {
        id
        name
        level
      }
    }
  }
`;

export const GET_MERCHANT_AVAILABLE_AT = gql`
  query {
    userProfile {
      id
      membership {
        merchantsNumAllowed
      }
      merchantAvailableForEditAt
    }
  }
`;

export const GET_USER_MERCHANTS_API = gql`
  query {
    userProfile {
      id
      merchants {
        id
        name
        logo
      }
    }
  }
`;

export const GET_USER_SETUP_STATUS_API = gql`
  query {
    userProfile {
      id
      setupStatus {
        isDataSourceBound
        isProfileCompleted
        isCashbackCurrencyCodeSet
        isMerchantSet
      }
    }
  }
`;

export const UPDATE_USER_CASHBACK_CURRENCY_CODE_API = gql`
  mutation UpdateUserCashbackCurrencyCode($code: CurrencyCode!) {
    updateUserCashbackCurrencyCode(code: $code)
  }
`;

export const GET_USER_REWARDS_API = gql`
  query {
    userProfile {
      id
      rewards {
        id
        value
        taskId
      }
    }
  }
`;

export const GET_APP_CONFIG_API = gql`
  query {
    appConfig {
      accountSetupTaskID
      referralTaskID
    }
  }
`;

export const GET_USER_PROFILE_API = gql`
  query {
    userProfile {
      id
      name
      gender
      birthday
      phoneNumber
    }
  }
`;

export const REPORT_MISSING_RECEIPT = gql`
  mutation reportMissingReceipt(
    $recipient: String!
    $subject: String!
    $sender: String!
    $emailDate: Time!
    $orderNumber: String
    $currencyCode: String
    $amount: Float
  ) {
    reportMissingReceipt(
      recipient: $recipient
      subject: $subject
      sender: $sender
      emailDate: $emailDate
      orderNumber: $orderNumber
      currencyCode: $currencyCode
      amount: $amount
    )
  }
`;

export const GET_USER_TASK_GROUPS_AND_REWARD_API = gql`
  query {
    userProfile {
      id
      taskGroups {
        id
        name
        description
        userTasks {
          taskId
          name
          description
          taskUrl
          maxCompletion
          maxAmountToEarn
          rewardValue
          tasksFinishedCount
          isTaskCompleted
        }
      }
      rewards {
        id
        taskId
        claimedTime
      }
    }
  }
`;

export const CLAIM_REWARD_API = gql`
  mutation ClaimReward($id: ID!) {
    claimReward(id: $id)
  }
`;

export const GET_CHECK_IN_STATUS_API = gql`
  query {
    userProfile {
      id
      checkInStatus {
        today
        hasCheckedInToday
        rewards
      }
      cashbackCurrencyCode
    }
  }
`;

export const CHECK_IN_API = gql`
  mutation CheckIn {
    checkIn
  }
`;

export const CURRENCY_CONVERT_API = gql`
  mutation Convert($amount: Float!, $from: CurrencyCode!, $to: CurrencyCode!) {
    convert(amount: $amount, from: $from, to: $to)
  }
`;

export const GET_CONVERSION_RATE_API = gql`
  query ConversionRate($from: CurrencyCode!, $to: CurrencyCode!) {
    conversionRate(from: $from, to: $to)
  }
`;

export const GET_CURRENCY_BALANCE_API = gql`
  query GetCurrecy($currencyCode: CurrencyCode) {
    userProfile {
      id
      currencyAccounts(currencyCode: $currencyCode) {
        id
        currencyCode
        balance
        wallets {
          type
          address
        }
      }
    }
  }
`;

export const TRANSACTIONS_QUERY = gql`
  query GetCurrecy(
    $cursor: String
    $filter: TransactionFilter
    $currencyCode: CurrencyCode
    $first: Int = 10
  ) {
    userProfile {
      id
      locale
      currencyAccounts(currencyCode: $currencyCode) {
        id
        currencyCode
        balance
        transactions(first: $first, after: $cursor, filter: $filter) {
          edges {
            cursor
            node {
              id
              type
              transactionTime
              amount
              title
              data {
                ... on CheckInTransactionData {
                  day
                }
                ... on ConversionTransactionData {
                  conversionRate
                  from
                  to
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`;

export const BIND_BANK_ITEM = gql`
  mutation BindBankItem(
    $syncServerItemId: String!
    $syncServerItemToken: String!
    $itemName: String!
    $accounts: [BankAccountInput!]!
  ) {
    bindBankItem(
      data: {
        syncServerItemId: $syncServerItemId
        syncServerItemToken: $syncServerItemToken
        itemName: $itemName
        accounts: $accounts
      }
    )
  }
`;

export const UNBIND_BANK_ITEM = gql`
  mutation UnbindBankItem($id: ID!) {
    unbindBankItem(id: $id)
  }
`;

export const GET_BANK_ITEMS = gql`
  query {
    userProfile {
      id
      bankItems {
        id
        name
        bankAccounts {
          id
          accountName
          accountType
          accountSubtype
          isValid
          isSubtypeBySystem
          mask
        }
      }
    }
  }
`;

export const UPDATE_BANK_ACCOUNT_SUBTYPE = gql`
  mutation UpdateBankAccountSubtype($id: ID!, $subtype: BankAccountSubtype!) {
    updateBankAccountSubtype(id: $id, subtype: $subtype)
  }
`;

export const GET_USER_ID = gql`
  query {
    userProfile {
      id
    }
  }
`;

export const GET_USER_SECURITY_SETTINGS = gql`
  query {
    userProfile {
      id
      isPasscodeSet
      isTwofaEnabled
    }
  }
`;

export const GET_CURRENCY_CODE = gql`
  query {
    userProfile {
      id
      cashbackCurrencyCode
    }
  }
`;

export const GET_USER_PHONE_NUMBER = gql`
  query {
    userProfile {
      id
      phoneNumber
    }
  }
`;

export const IS_NOTIFICATION_ENABLED = gql`
  query {
    userProfile {
      id
      isNotificationEnabled
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($enabled: Boolean!) {
    updateNotification(enabled: $enabled) {
      user {
        id
        isNotificationEnabled
      }
    }
  }
`;

export const GET_USER_REFERRAL_CODE = gql`
  query {
    userProfile {
      id
      referralCode
    }
  }
`;

export const GET_USER_REFERRAL_STATUS = gql`
  query {
    userProfile {
      id
      referrals {
        id
        status
        userId
        isReferrer
        friendInfo {
          id
          name
          maskedPhoneNumber
        }
        reward {
          id
          value
          claimedTime
        }
      }
    }
  }
`;

export const GET_AVAILABLE_MEMBERSHIPS = gql`
  query {
    userProfile {
      id
      availableMemberships {
        id
        level
        referralsNumRequired
        dataSourceBindingsNumRequired
        stakingPlan {
          id
          sourceCurrencyCode
          yieldCurrencyCode
          lockupPeriodInDay
          amount
        }
        isInvitationRequired
        operator
        cashbackPercentage
        merchantsNumAllowed
        stakingInterestRate
      }
    }
  }
`;

export const GET_CHECK_USER_CAN_UPGRADE_DATA = gql`
  query {
    userProfile {
      id
      membership {
        id
        level
      }
      availableMemberships {
        id
        level
        referralsNumRequired
        dataSourceBindingsNumRequired
        stakingPlan {
          id
          sourceCurrencyCode
          yieldCurrencyCode
          lockupPeriodInDay
          amount
        }
        isInvitationRequired
        operator
        cashbackPercentage
        merchantsNumAllowed
        stakingInterestRate
      }
      referrals {
        id
        isReferrer
        status
      }
      emailAccounts {
        id
      }
      bankItems {
        id
      }
      staking {
        id
        stakingPlan {
          id
          amount
        }
      }
    }
  }
`;

export const UPDATE_STAKING_PLAN = gql`
  mutation UpdateStakingPlan($id: ID!) {
    updateStakingPlan(id: $id)
  }
`;

export const GET_USER_LOCALE_AND_PHONE_NUMBER = gql`
  query {
    userProfile {
      id
      locale
      phoneNumber
    }
  }
`;

export const GET_USER_LOCALE = gql`
  query {
    userProfile {
      id
      locale
    }
  }
`;

export const GET_INITIAL_USER_DATA = gql`
  query {
    userProfile {
      id
      locale
      setupStatus {
        isDataSourceBound
        isProfileCompleted
        isCashbackCurrencyCodeSet
        isMerchantSet
      }
    }
  }
`;

export const UPGRADE_MEMBERSHIP = gql`
  mutation UpgradeMembership($id: ID!) {
    upgradeMembership(id: $id) {
      id
      membership {
        id
        level
      }
    }
  }
`;

export const UPDATE_USER_LOCALE = gql`
  mutation UpdateUserLocale($locale: Locale!) {
    updateLocale(locale: $locale) {
      user {
        id
        locale
      }
    }
  }
`;

export const GET_USER_TASKS_AND_REFERRALS = gql`
  query {
    userProfile {
      id
      tasks {
        id
        rewardValue
        maxCompletion
      }
      referrals {
        id
        status
        userId
        isReferrer
      }
    }
  }
`;

export const GET_USER_STAKING_INFO = gql`
  query {
    userProfile {
      id
      staking {
        id
        stakeDate
        stakingPlan {
          id
          lockupPeriodInDay
          interestRate
          sourceCurrencyCode
          yieldCurrencyCode
          amount
        }
        payoutInfo {
          nextAmount
          nextPayoutDate
          cumulativeAmount
        }
      }
    }
  }
`;
