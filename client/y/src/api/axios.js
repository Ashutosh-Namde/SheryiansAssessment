import axios from "axios";

export const registerUser = async (data) => {
  const res = await axios.post("http://localhost:3000/register", data);
  return res.data;
};