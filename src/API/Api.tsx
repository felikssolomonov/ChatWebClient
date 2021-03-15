import axios, { AxiosResponse } from "axios";
import {
  LogInProps,
  RegistrationProps,
  RegistrConfirmProps,
} from "./PropTypes";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface regResponseType {
  status: number;
  message: string;
}

interface responseType {
  status: number;
  message: string;
  token?: string;
}

export const requestServer = {
  registration: async ({ name, email, password }: RegistrationProps) => {
    try {
      const response = await axiosInstance.post<regResponseType>(
        "auth/registration",
        JSON.stringify({
          name,
          email,
          password,
        })
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  },
  registrConfirm: async ({
    email,
    hashPassword,
  }: RegistrConfirmProps): Promise<AxiosResponse<responseType>> => {
    try {
      const response = await axiosInstance.post(
        "auth/registrConfirm",
        JSON.stringify({
          email,
          hashPassword,
        })
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  logIn: async ({ email, password }: LogInProps): Promise<responseType> => {
    try {
      const response = await axiosInstance.post(
        "auth/login",
        JSON.stringify({
          email,
          password,
        })
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  logOut: async (): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.delete("auth/logout");
    console.log(response.data);
    return response.data;
  },
  checkAuth: async (): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.post("auth/checkAuth");
    console.log(response.data);
    return response.data;
  },
};
