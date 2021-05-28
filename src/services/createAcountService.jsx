import http from "./httpService";

export function verifyMobileOTP(otp) {
  return http.getMethod(`/api/v1/auth/verifyOTP/${otp}`);
}

export function verifyEmail(encode) {
  return http.getMethod(`/api/v1/auth/verify/${encode}`);
}

export function resendMobileOTP(mobileNo) {
  return http.putMethod(`/api/v1/users/resendOTP/${mobileNo}`);
}

export function resendEmail(email) {
  return http.putMethod(`/api/v1/users/resendEmail/${email}`);
}

export default {
  verifyMobileOTP,
  verifyEmail,
  resendMobileOTP,
  resendEmail
};
