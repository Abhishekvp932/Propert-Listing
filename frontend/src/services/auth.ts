import { API_ROUTES } from "@/constants/ApiRoutes";
import api from "./api";

export const Login = async (email: string, password: string) => {
  try {
    const response = await api.post(API_ROUTES.login, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const Signup = async (name: string, email: string, phone:string ,password: string) => {
  try {
    const response = await api.post(API_ROUTES.sigup, {
      name,
      email,
      phone,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
