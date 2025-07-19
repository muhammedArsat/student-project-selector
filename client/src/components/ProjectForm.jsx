import React, { useEffect, useState } from "react";
import { softwareDomains, hardwareDomains } from "../constants/Constants";
import Loader from "../components/Loader";
import Button from "./Button";

const ProjectForm = ({
  category,
  formData,
  setFormData,
  handleUpdate,
  loading,
  errMsg,
}) => {




  
  const projectDomain =
    category === "Software" ? softwareDomains : hardwareDomains;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
      <div className="flex justify-evenly  sm:items-center gap-4 flex-col sm:flex-row">
        <label htmlFor="" className="w-28">
          Title
        </label>
        <input
          type="text"
          className="input-base "
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-evenly  sm:items-center gap-4 flex-col sm:flex-row">
        <label htmlFor="" className="w-28">
          Domain
        </label>
        <select
          className="w-full border outline-none border-gray-400 bg-transparent px-4 py-2 rounded-lg"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          required
        >
          <option
            value=""
            disabled
            selected
            hidden
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            --Select Domain--
          </option>
          {projectDomain.map((domain, _idx) => (
            <option
              value={domain}
              className="font-inter bg-transparent dark:bg-dark-bg p-2"
              key={_idx}
            >
              {domain}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-evenly  sm:items-center gap-4 flex-col sm:flex-row">
        <label htmlFor="" className="w-28">
          Category
        </label>
        <input
          type="text"
          className="input-base "
          value={category}
          onChange={handleChange}
          name="category"
          disabled
        />
      </div>
      <div className="flex justify-evenly sm:items-center gap-4 flex-col sm:flex-row">
        <label htmlFor="" className=" w-28">
          Limit
        </label>
        <select
          className="w-full border border-gray-400 bg-transparent px-4 py-2 rounded-lg"
          name="limit"
          value={formData.limit}
          onChange={handleChange}
          required
        >
          <option
            value=""
            disabled
            selected
            hidden
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            --Select Limit--
          </option>
          <option
            value="1"
            className="font-inter bg-transparent dark:bg-dark-bg p-2"
          >
            1
          </option>
          <option
            value="2"
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            2
          </option>
          <option
            value="3"
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            3
          </option>
          <option
            value="4"
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            4
          </option>
        </select>
      </div>
      <div className="flex sm:justify-end w-full ">
        <Button type={"submit"}>
          <span className="w-full">
            {loading ? (
              <div className="flex justify-center items-center w-full"> 
                <Loader />
              </div>
            ) : (
              "Create Project"
            )}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
