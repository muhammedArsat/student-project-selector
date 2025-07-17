import React, { useContext, useEffect, useState } from "react";
import InboxCard from "../components/InboxCard";
import SearchBar from "../components/SearchBar";
import Paging from "../components/Paging";
import AuthContext from "../hooks/AuthContext";
import { getPendings } from "../apis/AdminApis";
import { toast } from "react-toastify";
import { facultyApproval, getFacultyPending } from "../apis/FacultyApi";
const Inbox = () => {
  const { role, id } = useContext(AuthContext);
  console.log(role);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPendings = async () => {
    try {
      setLoading(true);
      const res = await getPendings(role, id);
      if (res.ok) {
        setData(res.pendingProjects);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchFacultyPending = async () => {
    try {
      const res = await getFacultyPending(id);
      if (res.ok) {
        setData(res.pendingProjects);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const updateByFaculty = async (id, status) => {
    try {
      const res = await facultyApproval(id, status);
      if (res.ok) {
        toast.success("Updated success✅");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const updateByAdmin = async (id, status) => {};
  useEffect(() => {
    if (role === "ADMIN") {
      fetchPendings();
    }

    if (role === "FACULTY") {
      fetchFacultyPending();
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
    <div className="p-2 sm:p-0">
      <h1 className="font-lexend text-subheading">Inbox</h1>
      <p className="font-inter text-body text-gray-400 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, eius
        blanditiis ut perferendis corrupti libero.
      </p>
      <div className="mb-4">
        <SearchBar value={search} handleChange={handleSearch} />
      </div>
      <div className="overflow-auto h-[440px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent p-2">
        {searchedData.length === 0 ? (
          <p className="text-center font-lexend text-gray-400">No Match</p>
        ) : (
          searchedData.map((data, _idx) => (
            <InboxCard
              projectId={data._id}
              projectTitle={data.project.title}
              projectDomain={data.project.domain}
              projectCategory={data.project.category}
              students={data.students}
              guideId={data.guideId}
              guideName={data.guideId.name}
              guideEmail={data.guideEmail}
              guideDepartment={data.guideDepartment}
              abstract={data.abstract}
              key={_idx}
              currPage={"inbox"}
              guideApproval={data.guideApproval}
              tacApproval={data.tacApproval}
              role={role}
              updateByAdmin={updateByAdmin}
              updateByFaculty={updateByFaculty}
            />
          ))
        )}
      </div>
      <Paging />
    </div>
  );
};

export default Inbox;
