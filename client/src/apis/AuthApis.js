import axios from "axios";

const BASEURL = axios.create({
  baseURL: "http://localhost:3000/api/auth",
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
