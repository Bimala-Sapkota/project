/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "./index";

export const getAllCategory = async () => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
