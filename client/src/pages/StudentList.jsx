import React, { use, useEffect, useState } from "react";
import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";
import Paging from '../components/Paging'
import { allStudent } from "../apis/AdminApis";
import { toast } from "react-toastify";
import{studentListPage} from '../constants/Constants'
import Loader from '../components/Loader'
const StudentList = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAllStudents = async()=>{
    try{ 
      setLoading(true);
      const res = await allStudent();
      if(res.ok){
        setData(res.students);
      }

      
    }catch(err){
      toast.error("Something went wrong ❌")
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchAllStudents();
  },[])
  const [search, setSearch] = useState('');
 
  const handleSearchChange = (e)=>{
    setSearch(e.target.value)
  }

const searchedData = data.filter((d) =>
  d.name.toLowerCase().includes(search.toLowerCase())
);

if(loading){
  return(
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <Loader/>
    </div>
  )
}
  return (
    <div className="p-2 sm:p-0  ">
      <div>
        <h1 className="font-lexend text-subheading">Student Lists</h1>
        <p className="font-inter text-body text-gray-400 mb-4">
        {studentListPage}
        </p>
      </div>
      <div className="mb-4">
        <SearchBar value={search} handleChange={handleSearchChange} />
      </div>
      <div className="w-full">
        <UserList data={searchedData} user={"student"} col2={"Name"} col3={"Department"} col4={"Email"} />
      </div>
      <div className="mt-4">
        <Paging/>
      </div>
    </div>
  );
};

export default StudentList;
