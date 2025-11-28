/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './index'

//* get wishlist
export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");

    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};



// * add/remove to wishlist
export const addToWishlist = async (productId:string ) => {
  try {
    const response = await api.post("/wishlist",{productId});

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

