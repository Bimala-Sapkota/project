/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ILogin } from "../types/auth.type";
import api from "./index";

export const login = async (data: ILogin) => {
  try {
    const response = await api.post("/auth/login", data);

    return response.data.data;
  } catch (error: any) {
    throw error.data;
  }
};
