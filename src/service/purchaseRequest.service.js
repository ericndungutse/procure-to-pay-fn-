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
