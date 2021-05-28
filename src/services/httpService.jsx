// import axios from "axios";
// import swal from "sweetalert";
// import authService from "./authService";

// // axios.defaults.baseURL = "http://40ab23d861c4.ngrok.io";

// axios.interceptors.response.use(null, error => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   console.log("e", expectedError, error);
//   if (!expectedError) {
//     swal("Oops!", "Something went wrong!", "error");
//   }
//   return Promise.reject(error);
// });

// const setApiTokenHeader = () => {
//   const token = authService.getApiToken();
//   if (!token) {
//     window.location = "/";
//     return null;
//   }
//   return {
//     Authorization: `Bearer ${token}`
//   };
// };

// const setAuthTokenHeader = () => {
//   const token = authService.getAuthToken();
//   if (!token) {
//     window.location = "/";
//     return null;
//   }
//   return {
//     Authorization: `Bearer ${token}`
//   };
// };

// export function getMethod(url, isApiToken = false, isAuthToken = false) {
//   let header = {};
//   isApiToken
//     ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
//     : isAuthToken
//     ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
//     : (header = null);

//   if (header) {
//     return axios.get(url, header);
//   }
//   return axios.get(url);
// }

// export function postMethod(url, data, isApiToken = false, isAuthToken = false) {
//   let header = {};
//   isApiToken
//     ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
//     : isAuthToken
//     ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
//     : (header = null);

//   if (header) {
//     return axios.post(url, data, header);
//   }
//   return axios.post(url, data);
// }

// export function putMethod(
//   url,
//   data = {},
//   isApiToken = false,
//   isAuthToken = false
// ) {
//   let header = {};
//   isApiToken
//     ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
//     : isAuthToken
//     ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
//     : (header = null);

//   if (header) {
//     return axios.put(url, data, header);
//   }
//   return axios.put(url, data);

//   // if (isApiToken) {
//   //   return axios.put(url, data, {
//   //     headers: {...setApiTokenHeader()}
//   //   });
//   // } else {
//   //   return axios.put(url, data);
//   // }
// }

// export default {
//   putMethod,
//   getMethod,
//   postMethod
//   // createAPIToken,
//   // verifyApiToken
// };
