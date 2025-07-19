import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import Paging from "../components/Paging";
import { toast } from "react-toastify";
import { getFaculty } from "../apis/AdminApis";
import { facultyListPage } from "../constants/Constants";
import Loader from "../components/Loader";
const FacultyList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchFacultyList = async () => {
    try {
      setLoader(true);
      const res = await getFaculty();
      if (res.ok) {
        setData(res.faculty);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loader) {
    return (
      <div className="w-full flex justify-center items-center min-h-[80vh]">
        <Loader />
      </div>
    );
  }

  const searchedData = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-2 sm:p-0">
      <div>
        <h1 className="font-lexend text-subheading">Faculty Lists</h1>
        <p className="font-inter text-body text-gray-400 mb-4">
          {facultyListPage}
        </p>
      </div>
      <div className="mb-4">
        <SearchBar value={search} handleChange={handleSearch} />
      </div>
      <div>
        <UserList
          user={"faculty"}
          data={searchedData}
          col2={"Name"}
          col3={"Department"}
          col4={"Email"}
        />
      </div>
      <div className="mt-4">
        <Paging />
      </div>
    </div>
  );
};

export default FacultyList;
