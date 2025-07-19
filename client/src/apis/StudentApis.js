import axios from "axios";

const BASEURL = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/student`,
  withCredentials: true,
});
export const getSoftwareProjects = async (category) => {
  const res = await BASEURL.get(`/projects?category=${category}`);

  return res.data;
};

export const getStudents = async () => {
  const res = await BASEURL.get("/students");

  return res.data;
};

export const getFaculty = async () => {
  const res = await BASEURL.get("/faculties");
  return res.data;
};

export const newProjectRegister = async (formData) => {
  const res = await BASEURL.post("/project", formData);
  return res.data;
};

export const getProjectForDashboard = async (id) => {
  const res = await BASEURL.get(`/projects/${id}`);
  return res.data;
};
