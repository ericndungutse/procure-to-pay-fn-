import axios from 'axios';

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/accounts/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.non_field_errors[0]);
  }
};
