import axios from "axios";

const BASEURL = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  withCredentials: true,
});

export const fetchGetMe = async () => {
  const res = await BASEURL.get("/get-me");
  return res.data;
};

export const logout = async()=>{
  const res = await BASEURL.get('/logout');
  return res.data
}
