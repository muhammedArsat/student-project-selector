import axios from "axios";

const BASEURL = axios.create({
  baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/v1/faculty`,
  withCredentials:true
})


export const getFacultyPending = async(id)=>{
  const res = await BASEURL.get(`/pending/${id}`);
  console.log(res.data)
  return res.data
}

export const facultyApproval = async(id, status)=>{
  const res = await BASEURL.put(`/project/${id}?status=${status}`);
  console.log(res.data)
  return res.data
}


export const facultyDashboard = async(id)=>{
  const res = await BASEURL.get(`/dashboard/${id}`);
  console.log(res.data);
  return res.data;
}