import React, { useState } from "react";
import RegisterProject from "../components/RegisterProject";
import { toast } from "react-toastify";
import { newProjectRegister } from "../apis/StudentApis";
import { softwareProjectadd } from "../constants/Constants";

const NewSoftwareRegister = () => {
  const [loading, setLoading] = useState("");
  const handleSubmit = async (formData, setFormData) => {
    try {
      setLoading(true);
      const res = await newProjectRegister(formData);
      if (res.ok === true) {
        toast.success("Project registered");
        setFormData({
          students: [""], // Starts with 1 student
          type: "",
          project: "",
          guide: "",
          category: "Software",
          domain: domain || "",
          abstract: "",
        });
      } else if (res.ok === "clientError") {
        toast.warning("Add unregistered student");
      }
    } catch (err) {
      toast.error("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-auto h-[600px] p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 ">
      <h1 className="font-lexend text-subheading">
        Software Project Registration
      </h1>
      <p className="font-inter text-body mb-4 text-gray-400">
        {softwareProjectadd}
      </p>
      <RegisterProject
        category={"Software"}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default NewSoftwareRegister;
