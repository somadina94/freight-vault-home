import axios from 'axios';

const baseURL = `https://freightvaulthome.jahbyte.com/api/v1/`;
// const baseURL = `http://127.0.0.1:6002/api/v1/`;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const logIn = async (data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: 'users/loginAdmin',
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUsers = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: 'users',
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
      url: 'order/getOrdersAdmin',
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
      url: 'vault/getVaultsAdmin',
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

export const block = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: `users/block/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const unblock = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: `users/unblock/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const approveVault = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: `vault/approve/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteVault = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'DELETE',
      url: `vault/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getOneVault = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `vault/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const UpdateVault = async (data, id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: `vault/${id}`,
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

export const approveOrder = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'PATCH',
      url: `order/approve/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteOrder = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: 'DELETE',
      url: `order/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
