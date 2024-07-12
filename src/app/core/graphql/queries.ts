import { DocumentNode, gql } from "@apollo/client/core";

export const SIGN_IN_MUTATION: DocumentNode = gql`
  mutation login($email: String!, $password: String!) {
    login(
      loginInput: {email: $email, password: $password}
    ) {
      jwt,
      user {
        id,
        email, role, firstName, lastName, picture
      }
    }
  }
`
export const REGISTER_MUTATION: DocumentNode = gql`
    mutation registerNewUser($password: String!, $email: String!) {
      registerNewUser(
        loginInput: {email: $email, password: $password}
      ) {
        jwt,
        user {
          id,
          email
        }
      }
    }
`

export const ME_QUERY: DocumentNode = gql`
  query me {
    Me {
      email, role, firstName, lastName, picture
    }
  }
`
