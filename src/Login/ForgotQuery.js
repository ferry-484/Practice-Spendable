export const UserdataOtp = `
mutation  UserdataOtp($email:String){
    UserdataOtp(email:$email)
  }
`;

export const UserdataPasswordforgot = (email, otp, password) =>
  `
mutation  {
  UserdataPasswordforgot(email:"${email}",otp:${otp}, password:"${password}")
}
`;

export const UserdataResendotp = email =>
  `mutation{
    UserdataResendotp(email:"${email}")
  }
`;
