import axios from 'axios';

export const fetchPurchaseRequests = async (token) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data.purchase_requests;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const createPurchaseRequest = async (token, body) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/requests/`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return created request (shape depends on backend)
    return response.data.data || response.data;
  } catch (error) {
    const msg = error?.response?.data?.error || error?.response?.data || error.message;
    throw new Error(msg);
  }
};

export const fetchPurchaseRequest = async (token, id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data || response.data;
  } catch (error) {
    const msg = error?.response?.data?.error || error?.response?.data || error.message;
    throw new Error(msg);
  }
};

export const approvePurchaseRequest = async (token, id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/requests/${id}/approve/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data || response.data;
  } catch (error) {
    const msg = error?.response?.data?.error || error?.response?.data || error.message;
    throw new Error(msg);
  }
};

export const rejectPurchaseRequest = async (token, id, payload = {}) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/requests/${id}/reject/`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data || response.data;
  } catch (error) {
    const msg = error?.response?.data?.error || error?.response?.data || error.message;
    throw new Error(msg);
  }
};
