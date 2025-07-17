import axios from "axios";

const BASEURL = axios.create({
  baseURL:'http://localhost:3000/api/v1/admin',
  withCredentials:true
})

export const addNewProject = async(formData)=>{
  const res = await BASEURL.post('/projects',formData);
  return res.data
}

export const allStudent = async()=>{
  const res = await BASEURL.get('/students');
  return res.data
}

export const getPendings = async(role,id)=>{
  const res = await BASEURL.get(`/pending`)
  console.log(res.data)
  return res.data;
}