export const userdataSignup = (email, accessCode, password) =>
  `
mutation  {
    UserdataSignup(email:"${email}",accessCode:"${accessCode}", password:"${password}",role:"Guardian")
}
`;
