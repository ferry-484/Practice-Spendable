import http from "./httpService";

export async function login(data) {
  const response = await http.postMethod("/api/v1/auth/login", {
    email: data.email,
    password: data.password
  });
  if (response && response.data) {
    setAuthToken(response.data.authToken);
    await createApiToken();
  }
}

export function logout() {
  // localStorage.removeItem('authToken')
  localStorage.clear();
}

const createApiToken = async () => {
  try {
    const apiTokenResponse = await http.postMethod(
      "/api/v1/auth/keys",
      null,
      false,
      true
    );
    setApiToken(apiTokenResponse.data);
  } catch (ex) {}
};

export function verifyApiToken(apiToken) {
  http.getMethod(`/api/v1/auth/keys/${apiToken}`);
}

export function setApiToken(apiToken) {
  localStorage.setItem("apiToken", apiToken);
}

export function getApiToken() {
  return localStorage.getItem("apiToken");
}

export function setAuthToken(token) {
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem("user"));
}

export function setUserInfo(data) {
  return localStorage.setItem("user", JSON.stringify(data));
}
// http.setHttpToken(getToken())

export default {
  login,
  logout,
  setAuthToken,
  getAuthToken,
  getApiToken,
  setUserInfo,
  getUserInfo
  // getData
};
