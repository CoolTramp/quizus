import { MIN_LENGTH_PASSWORD } from "../scripts/constants";

export const isPassword = (passwordLength: number): boolean => {
  return passwordLength > MIN_LENGTH_PASSWORD;
};

export function removeItems() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("animationDone");
}
