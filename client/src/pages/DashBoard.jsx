import React, { useContext, useEffect, useState } from "react";
import InboxCard from "../components/InboxCard";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";
import AuthContext from "../hooks/AuthContext";
import { getProjectForDashboard } from "../apis/StudentApis";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const { role, id } = useContext(AuthContext);
  const fetchStudentDashboard = async () => {
    try {
      const res = await getProjectForDashboard(id);
      if (res.ok) {
        setData(res.project);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (role === "STUDENT") {
      fetchStudentDashboard();
    }
  }, []);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchedData = data.filter((d) =>
    d.students[0].name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-2 sm:p-2 h-[630px] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
      <h1 className="font-lexend text-subheading">Dashboard</h1>
      <p className="font-inter text-body mb-4 text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit quia
        expedita provident natus voluptas blanditiis?
      </p>
      <div className="mb-4">
        <SearchBar value={search} handleChange={handleSearch} />
      </div>
      {searchedData.map((data, _idx) => (
        <InboxCard
          projectId={data.id}
          projectTitle={data.project.title}
          projectDomain={data.project.domain}
          projectCategory={data.project.category}
          students={data.students}
          guideId={data.guideId}
          guideName={data.guideId.name}
          guideDepartment={data.guideId.department}
          guideEmail={data.guideId.email}
          tacApproval={data.tacApproval}
          guideApproval={data.guideApproval}
          abstract={data.abstract}
          currPage={"dashboard"}
          key={_idx}
        />
      ))}
    </div>
  );
};

export default DashBoard;
