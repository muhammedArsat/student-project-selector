import React from "react";

const ProjectCard = ({ image, topic, handleClick }) => {
  return (
    <div
      className="flex flex-col  shadow-soft dark:shadow-darkSoft rounded-lg dark:bg-dark-bg cursor-pointer  hover:scale-105 transition-all duration-500   sm:w-[250px]"
      onClick={handleClick}
    >
      <img src={image} alt="project Image"  className="object-cover"/>
      <h1 className="font-lexend text-body text-center">{topic}</h1>
    </div>
  );
};

export default ProjectCard;
