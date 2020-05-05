import {gql} from 'apollo-boost';

export const UPDATE_USER_PROFILE_API = gql`
  mutation UpdateUserProfile(
    $name: String!
    $gender: String!
    $dateOfBirth: Time!
    $referalCode: String!
  ) {
    updateUserProfile(
      name: $name
      gender: $gender
      dateOfBirth: $dateOfBirth
      referalCode: $referalCode
    )
  }
`;

export const BIND_EMAIL_ACCOUNTS = gql`
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
