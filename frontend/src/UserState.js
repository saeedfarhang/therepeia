import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { axiosInstance } from "./axios";

export const isLoggedIn = () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return true;
  } else {
    return false;
  }
};

export const UserId = () => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    const user_id = jwt_decode(access_token).user_id;
    return user_id;
  }
};
