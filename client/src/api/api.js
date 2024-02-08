import axios from 'axios';

// const baseURL = `https://api.365gainfuldice.com/api/v1/`;
const baseURL = `http://127.0.0.1:6002/api/v1/`;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const createAccount = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/signUp',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logIn = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/loginUser',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/forgotPassword',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const resetPassword = async (data, token) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: `users/resetPassword/${token}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getMetals = async () => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: 'product',
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const buyMetals = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'order',
      data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const secureMetals = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'vault',
      data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateMe = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: 'users/updateMe',
      data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getOrders = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: 'order/getOrdersUser',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getVaults = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: 'vault/getVaultsUser',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updatePassword = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: 'users/updatePassword',
      data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logOut = async () => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/logout',
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
