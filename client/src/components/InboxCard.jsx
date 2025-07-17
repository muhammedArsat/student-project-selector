import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const InboxCard = ({
  projectId,
  projectTitle,
  projectDomain,
  projectCategory,
  students,
  guideId,
  guideName,
  guideEmail,
  guideDepartment,
  abstract,
  guideApproval,
  tacApproval,
  currPage,
  role,
  updateByAdmin,
  updateByFaculty,
}) => {
  const [isBottomCardOpen, setIsBottomCardOpen] = useState(() => {
    return currPage === "dashboard";
  });
  const handleBottomCard = () => {
    setIsBottomCardOpen((prev) => !prev);
  };
  return (
    <div className="w-full  rounded-lg shadow-soft dark:shadow-darkSoft p-2 dark:bg-dark-bg mb-3 transition-colors duration-500">
      {/* top card */}
      <div className="flex flex-col mb-1">
        <div className="grid grid-cols-2 sm:flex sm:justify-between sm:items-center gap-3 border-b dark:border-b-gray-500 mb-2 pb-3">
          <div>
            <h1 className="font-lexend text-body">{projectTitle}</h1>
            <p className="font-inter text-body text-gray-400">
              {projectDomain}
            </p>
          </div>
          <div>
            <h1 className="font-lexend text-body">Team Leader</h1>
            <p className="font-inter text-body text-gray-400">
              {students[0].name}
            </p>
          </div>
          <div>
            <h1 className="font-lexend text-body">Guide</h1>
            <p className="font-inter text-body text-gray-400">{guideName}</p>
          </div>
          <div className={`${currPage === "dashboard" ? "block" : "hidden"}`}>
            <h1 className="font-lexend text-body">Guide Status</h1>
            <p
              className={`font-inter  text-white   rounded-full flex justify-center items-center px-3 py-1 ${
                guideApproval === "Approved" ? "bg-green-400" : "bg-red-500"
              }`}
            >
              {guideApproval}
            </p>
          </div>
          <div>
            <h1 className="font-lexend text-body">Tac Status</h1>
            <p
              className={`font-inter  text-white   rounded-full flex justify-center items-center px-3 py-1 ${
                tacApproval === "Approved" ? "bg-green-400" : "bg-red-500"
              }`}
            >
              {tacApproval}
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-3 ${
              currPage === "dashboard" ? "hidden" : ""
            }`}
          >
            <button
              className="p-2 bg-green-400 rounded-lg active:bg-green-500 transition-all duration-300 hover:cursor-pointer text-white font-lexend text-body"
              onClick={() =>
                role === "FACULTY"
                  ? updateByFaculty(projectId,true)
                  : updateByAdmin(projectId,true)
              }
            >
              Approve
            </button>
            <button className="p-2 bg-red-400 rounded-lg active:bg-red-500 transition-all duration-300 hover:cursor-pointer text-white font-lexend text-body"
              onClick={() =>
                role === "FACULTY"
                  ? updateByFaculty(projectId,false)
                  : updateByAdmin(projectId,false)
              }>
              Reject
            </button>
          </div>
        </div>
        <h1
          className={`font-lexend text-body flex justify-center items-center w-fit gap-3 ${
            isBottomCardOpen ? "text-blue-500" : ""
          }`}
        >
          Details{" "}
          <span
            className={`hover:cursor-pointer ${
              currPage === "dashboard" ? "hidden" : "block"
            }`}
            onClick={handleBottomCard}
          >
            <IoIosArrowDown
              className={`transition-transform duration-300 ${
                isBottomCardOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </h1>
      </div>

      {/* bottom card */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isBottomCardOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } grid grid-cols-1 sm:flex sm:flex-row sm:justify-between sm:items-start `}
      >
        <div>
          <h1 className="font-lexend text-body ">Student Details</h1>
          {students.map((student, _idx) => (
            <div className="mb-3" key={_idx}>
              <span className="flex flex-col sm:flex-row ">
                <h1 className="font-inter text-body w-[140px] ">
                  {_idx === 0 ? "Team Leader:" : `Team Member ${_idx + 1}: `}
                </h1>
                <p className="font-inter text-body text-gray-500 dark:text-gray-400">
                  {student.name}
                </p>
              </span>

              <span className="flex flex-col sm:flex-row ">
                <h1 className="font-inter text-body w-[140px] ">Department:</h1>
                <p className="font-inter text-body text-gray-500 dark:text-gray-400">
                  {student.department}
                </p>
              </span>
              <span className="flex flex-col sm:flex-row ">
                <h1 className="font-inter text-body w-[140px] "> Email:</h1>
                <p className="font-inter text-body text-gray-500 dark:text-gray-400">
                  {student.email}
                </p>
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <h1 className="font-lexend text-body ">Project Details</h1>
          <span className="flex flex-col sm:flex-row ">
            <h1 className="font-inter text-body w-[100px] ">Title:</h1>
            <p className="font-inter text-body text-gray-500 dark:text-gray-400">
              {projectTitle}
            </p>
          </span>

          <span className="flex flex-col sm:flex-row ">
            <h1 className="font-inter text-body w-[100px] ">Category:</h1>
            <p className="font-inter text-body text-gray-500 dark:text-gray-400">
              {projectCategory}
            </p>
          </span>
          <span className="flex flex-col sm:flex-row ">
            <h1 className="font-inter text-body w-[100px] "> Domain:</h1>
            <p className="font-inter text-body text-gray-500 dark:text-gray-400">
              {projectDomain}
            </p>
          </span>
          <span className="flex flex-col sm:flex-row ">
            <h1 className="font-inter text-body w-[100px] ">Abstract:</h1>
            <p className="font-inter text-body text-gray-500 max-w-[200px] sm:max-w-[350px] dark:text-gray-400">
              {abstract}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InboxCard;
