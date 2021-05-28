import http from "./httpService"

export function getUsers(){
  return http.getMethod('/api/v1/users',false,true)
}

export default {
    getUsers
}