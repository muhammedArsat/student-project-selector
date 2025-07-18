import React, { useCallback, useContext, useEffect } from "react";
import AuthContext from "../hooks/AuthContext";
import SoftwareImg from "/software.jpg";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
const Home = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSoftware = () => {
    if (role === "ADMIN") {
      navigate("/new-software");
    }else{
      navigate('/register-software')
    }
  };

  const handleHardware = () => {
    if (role === "ADMIN") {
      navigate("/new-hardware");
    }else{
      navigate('/register-hardware')
    }
  };

  

  return (
    <div className="flex flex-col sm:flex-row gap-3 px-2 sm:px-0">
      <ProjectCard
        image={SoftwareImg}
        topic={"Software Project"}
        handleClick={handleSoftware}
      />
      <ProjectCard
        image={SoftwareImg}
        topic={"Hardware Project"}
        handleClick={handleHardware}
      />
    </div>
  );
};

export default Home;
