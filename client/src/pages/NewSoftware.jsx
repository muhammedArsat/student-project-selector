import React, { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import { toast } from "react-toastify";
import { addNewProject } from "../apis/AdminApis";
const NewSoftware = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Software",
    domain: "",
    limit: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      const res = await addNewProject(formData);
      if (res.ok) {
        toast.success("Project created ✅");
        setFormData({
          title: "",
          category: "Software",
          domain: "",
          limit: "",
        });
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-0">
      <h1 className="font-lexend text-subheading">Add Software Project</h1>
      <p className="font-inter text-body mb-4 text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        architecto maxime tempora sit.
      </p>
      <ProjectForm
        category={"Software"}
        formData={formData}
        setFormData={setFormData}
        handleUpdate={handleUpdate}
        loading={loading}
        errMsg={errMsg}
      />
    </div>
  );
};

export default NewSoftware;
