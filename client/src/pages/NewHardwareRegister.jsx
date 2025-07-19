import React, { useState } from "react";
import RegisterProject from "../components/RegisterProject";
import { TbWashDryP } from "react-icons/tb";
import { toast } from "react-toastify";
import { hardwareProjectadd } from "../constants/Constants";
import { newProjectRegister } from "../apis/StudentApis";
const NewHardwareRegister = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (formData, setFormData) => {
    try {
      setLoading(true);
      const res = await newProjectRegister(formData);
      if (res.ok === true) {
        toast.success("Registered successfully");
        setFormData({
          students: [""], // Starts with 1 student
          type: "",
          project: "",
          guide: "",
          category: "Hardware",
          domain: domain || "",
          abstract: "",
        });
      } else if (res.ok === "clientError") {
        toast.warning("Add unregistered student ");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-auto h-[600px] p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 ">
      <h1 className="font-lexend text-subheading">New Hardware Project</h1>
      <p className="font-inter text-body text-gray-400">{hardwareProjectadd}</p>
      <RegisterProject
        category={"Hardware"}
        handleSubmit={handleSubmit}
        domain={"Hardware"}
        loading={loading}
      />
    </div>
  );
};

export default NewHardwareRegister;
