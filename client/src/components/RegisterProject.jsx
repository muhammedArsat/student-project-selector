import React, { useState, useEffect } from "react";
import Button from "./Button";
import {
  getFaculty,
  getSoftwareProjects,
  getStudents,
} from "../apis/StudentApis";
import Loader from "./Loader";

const RegisterProject = ({ category, domain, handleSubmit, loading }) => {
  const [formData, setFormData] = useState({
    students: [""], // Starts with 1 student
    type: "",
    project: "",
    guide: "",
    category: category || "",
    domain: domain || "",
    abstract: "",
  });

  const [projectList, setProjectList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [guideList, setGuideList] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await getSoftwareProjects(category);
      if (res.ok) {
        setProjectList(res.projects);
      }
    } catch (err) {
    } finally {
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      if (res.ok) {
        setStudentList(res.students);
      }
    } catch (err) {}
  };

  const fetchGuide = async () => {
    try {
      const res = await getFaculty();
      if (res.ok) {
        setGuideList(res.guides);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProjects();
    fetchStudents();
    fetchGuide();
  }, []);

  const handleAddStudent = () => {
    if (formData.students.length < 4) {
      setFormData((prev) => ({
        ...prev,
        students: [...prev.students, ""],
      }));
    }
  };

  const handleDeleteStudent = () => {
    const index = formData.students.length - 1;
    const updatedStudent = formData.students.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      students: updatedStudent.length > 0 ? updatedStudent : [""],
    }));
  };

  const studentHandleChange = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type" && value === "External") {
      setFormData((prev) => ({
        ...prev,
        project: "",
        domain: "",
      }));
    }
    if (name === "project") {
      const selectedProject = projectList.find((p) => p._id === value);
      setFormData((prev) => ({
        ...prev,
        project: value,
        domain: selectedProject ? selectedProject.domain : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStudentChange = (e, index) => {
    const updatedStudent = [...formData.students];
    updatedStudent[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      students: updatedStudent,
    }));
  };
  const handleConsole = () => {
    console.log(formData);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };
  return (
    <form className="flex flex-col gap-3  " onSubmit={handleRegister}>
      {/* student list */}
      <div className="flex flex-col gap-3">
        {formData.students.map((student, _idx) => (
          <div className="flex flex-col sm:flex-row sm:items-center" key={_idx}>
            <label htmlFor="" className="w-[100px] font-inter">
              {`Member ${_idx + 1}`}
            </label>
            <select
              name="students"
              value={student}
              id=""
              onChange={(e) => handleStudentChange(e, _idx)}
              className="w-full border outline-none border-gray-400 bg-transparent px-4 py-2 rounded-lg"
              required
            >
              <option
                value=""
                disabled
                className="font-inter bg-transparent dark:bg-dark-bg"
              >
                --Select Student--
              </option>
              {studentList.map((individual, idx) => (
                <option
                  value={individual._id}
                  className="dark:bg-dark-bg"
                  key={idx}
                >
                  {`${individual.name}-${individual.userId}-${individual.department}`}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* add button */}
      {formData.students.length >= 4 ? (
        <div className="flex justify-end items-center">
          <button
            className="button-base"
            onClick={handleDeleteStudent}
            type="button"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex justify-end items-center">
          <button
            className="button-base"
            onClick={handleAddStudent}
            type="button"
          >
            Add
          </button>
        </div>
      )}

      {/* project type  */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="" className="w-[100px] font-inter">
          Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          id=""
          className="w-full border outline-none border-gray-400 bg-transparent px-4 py-2 rounded-lg"
          required
        >
          <option
            value=""
            selected
            disabled
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            --Select Type--
          </option>
          <option
            value={"Internal"}
            onChange={handleChange}
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            Internal
          </option>
          <option
            value={"External"}
            onChange={handleChange}
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            External
          </option>
        </select>
      </div>

      {/* project  */}
      {formData.type === "Internal" ? (
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label htmlFor="" className="w-[100px] font-inter">
            Project
          </label>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full border outline-none border-gray-400 bg-transparent px-4 py-2 rounded-lg"
            required
          >
            <option
              value=""
              disabled
              className="font-inter bg-transparent dark:bg-dark-bg"
            >
              --Select Project--
            </option>
            {projectList.map((project, idx) => (
              <option value={project._id} className="dark:bg-dark-bg">
                {project.title}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label htmlFor="" className="w-[100px] font-inter">
            Project
          </label>
          <input
            type="text"
            className="input-base"
            name="project"
            required
            value={formData.project}
            onChange={handleChange}
          />
        </div>
      )}

      {/* guide  */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="" className="w-[100px] font-inter">
          Guide
        </label>
        <select
          name="guide"
          value={formData.guide}
          onChange={handleChange}
          id=""
          required
          className="w-full border outline-none border-gray-400 bg-transparent px-4 py-2 rounded-lg"
        >
          <option
            value=""
            disabled
            className="font-inter bg-transparent dark:bg-dark-bg"
          >
            --Select Guide--
          </option>
          {guideList.map((guide, id) => (
            <option
              value={guide._id}
              onChange={handleChange}
              className="font-inter bg-transparent dark:bg-dark-bg"
              key={id}
            >
              {guide.name} - {guide.userId} - {guide.email}
            </option>
          ))}
        </select>
      </div>

      {/* category  */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="" className="w-[100px] font-inter">
          Category
        </label>
        <input
          type="text"
          className="input-base "
          disabled
          value={category}
          required
        />
      </div>

      {/* domain  */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="" className="w-[100px] font-inter">
          Domain
        </label>
        <input
          type="text"
          className="input-base"
          name="domain"
          value={formData.domain}
          disabled={formData.type === "Internal" ? true : false}
          onChange={handleChange}
          required
        />
      </div>

      {/* abstract  */}
      <div className="flex flex-col sm:flex-row sm:items-start">
        <label htmlFor="" className="w-[100px] font-inter">
          Abstract
        </label>
        <textarea
          className="input-base min-h-[200px] font-inter"
          name="abstract"
          value={formData.abstract}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* submit button */}
      <div className="flex justify-end items-center">
        <Button type={"submit"}>
          <span>{loading ? <Loader /> : "Submit Project"}</span>
        </Button>
      </div>
    </form>
  );
};

export default RegisterProject;
