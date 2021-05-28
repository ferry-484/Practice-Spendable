import { URLDATA } from "./Config";

export const fetchMethod = async (Query, Variables) => {
  const token = await localStorage.getItem("token");
  return fetch(URLDATA.url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      query: Query,
      variables: Variables
    }),
    headers: {
      "Content-type": "application/json",
      access_token: token
    }
  });
};
