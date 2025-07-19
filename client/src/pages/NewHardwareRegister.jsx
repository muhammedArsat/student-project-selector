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
          students: [""],
          type: "",
          project: "",
          guide: "",
          category: "Hardware",
          domain: "",
          abstract: "",
        });
        return; // stop further execution
      }

      if (res.ok === "clientError") {
        toast.warning("Add unregistered student");
        return;
      }

      // If res.ok is false or any other unexpected value
      toast.error("Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
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
