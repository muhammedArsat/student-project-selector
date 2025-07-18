import { meta } from "@eslint/js";
import axios from "axios";

const BASEURL = axios.create({
  baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
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

export const getFaculty = async()=>{
  const res = await BASEURL.get('/faculties');
  console.log(res.data)
  return res.data
}

export const updateTacApproval = async(projectId, status)=>{
  const res = await BASEURL.put(`/projects/${projectId}?status=${status}`);
  return res.data;
}