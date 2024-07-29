import axios from "axios";
import Config from "react-native-config";
// helpers
import { removeValue, storeValue } from "./async-storage-functions";

/*
type TokenType = {
    token_type: string;
    access_token: string;
};
const USER_TOKEN = "token";
*/

const baseService = axios.create({
  baseURL: `${Config.URL}`,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000,
});

export const authHeaderName = "Authorization";

export const setAuthHeader = (token: string) => {
  baseService.defaults.headers[authHeaderName] = `Bearer ${token}`;
}

export const saveToken = async (token: TokenType) => {
  await storeValue(USER_TOKEN, JSON.stringify(token));
}

export const clearTokens = async () => {
  baseService.defaults.headers[authHeaderName] = ""
  await removeValue(USER_TOKEN);
}

export default baseService;
