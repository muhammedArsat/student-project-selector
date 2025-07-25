import React, { use, useContext, useEffect, useState } from "react";
import InboxCard from "../components/InboxCard";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";
import AuthContext from "../hooks/AuthContext";
import { getProjectForDashboard } from "../apis/StudentApis";
import { facultyDashboard } from "../apis/FacultyApi";
import { dashboard } from "../constants/Constants";
import Loader from "../components/Loader";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const { role, id } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const fetchStudentDashboard = async () => {
    try {
      setLoading(true);
      const res = await getProjectForDashboard(id);
      if (res.ok) {
        setData(res.project);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchFacultyDashboard = async () => {
    try {
      setLoading(true);
      const res = await facultyDashboard(id);
      if (res.ok) {
        setData(res.facultyProject);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "STUDENT") {
      fetchStudentDashboard();
    } else if (role === "FACULTY") {
      fetchFacultyDashboard();
    } else {
    }
  }, []);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchedData = data.filter((d) =>
    d.students[0].name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[80vh]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-2 sm:p-2 h-[630px] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
      <h1 className="font-lexend text-subheading">Dashboard</h1>
      <p className="font-inter text-body mb-4 text-gray-400">{dashboard}</p>
      {role !== "STUDENT" && (
        <div className="mb-4">
          <SearchBar value={search} handleChange={handleSearch} />
        </div>
      )}

      {searchedData.length === 0 ? (
        <p className="text-center font-lexend text-gray-400">Empty</p>
      ) : (
        searchedData.map((data, _idx) => (
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
        ))
      )}
    </div>
  );
};

export default DashBoard;
