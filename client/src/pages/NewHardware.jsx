import React, { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import { addNewProject } from "../apis/AdminApis";
import { toast } from "react-toastify";

const NewHardware = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Hardware",
    domain: "",
    limit: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const res = await addNewProject(formData);
      if (res.ok) {
        toast.success("Project created ✅");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-2 sm:p-0">
      <h1 className="font-lexend text-subheading ">New Hardware Project</h1>
      <p className="font-inter text-body text-gray-400 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia debitis
        veritatis, quia reiciendis fuga ullam?
      </p>
      <ProjectForm
        formData={formData}
        setFormData={setFormData}
        category={"Hardware"}
        handleUpdate={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default NewHardware;
