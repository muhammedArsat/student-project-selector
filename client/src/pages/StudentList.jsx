import React, { use, useEffect, useState } from "react";
import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";
import Paging from '../components/Paging'
import { allStudent } from "../apis/AdminApis";
import { toast } from "react-toastify";
const StudentList = () => {
  // const data = 
  //   [
  //     {
  //       id: 1,
  //       name: "Ayaan Iqbal",
  //       department: "Computer Science and Engineering",
  //       email: "ayaan.iqbal@example.com",
  //       profile: "https://i.pravatar.cc/150?img=1",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 2,
  //       name: "Fatima Rahman",
  //       department: "Information Technology",
  //       email: "fatima.rahman@example.com",
  //       profile: "https://i.pravatar.cc/150?img=2",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 3,
  //       name: "Zayan Ali",
  //       department: "Electrical and Electronics Engineering",
  //       email: "zayan.ali@example.com",
  //       profile: "https://i.pravatar.cc/150?img=3",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 4,
  //       name: "Ayesha Noor",
  //       department: "Mechanical Engineering",
  //       email: "ayesha.noor@example.com",
  //       profile: "https://i.pravatar.cc/150?img=4",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 5,
  //       name: "Rehan Siddiqui",
  //       department: "Civil Engineering",
  //       email: "rehan.siddiqui@example.com",
  //       profile: "https://i.pravatar.cc/150?img=5",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 6,
  //       name: "Sara Khan",
  //       department: "Biomedical Engineering",
  //       email: "sara.khan@example.com",
  //       profile: "https://i.pravatar.cc/150?img=6",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 7,
  //       name: "Hamza Patel",
  //       department: "Computer Science and Engineering",
  //       email: "hamza.patel@example.com",
  //       profile: "https://i.pravatar.cc/150?img=7",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 8,
  //       name: "Mariam Yusuf",
  //       department: "Electronics and Communication",
  //       email: "mariam.yusuf@example.com",
  //       profile: "https://i.pravatar.cc/150?img=8",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 9,
  //       name: "Imran Sheikh",
  //       department: "Information Technology",
  //       email: "imran.sheikh@example.com",
  //       profile: "https://i.pravatar.cc/150?img=9",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 10,
  //       name: "Layla Shaikh",
  //       department: "Mechanical Engineering",
  //       email: "layla.shaikh@example.com",
  //       profile: "https://i.pravatar.cc/150?img=10",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 11,
  //       name: "Zara Hussain",
  //       department: "Civil Engineering",
  //       email: "zara.hussain@example.com",
  //       profile: "https://i.pravatar.cc/150?img=11",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 12,
  //       name: "Omar Qureshi",
  //       department: "Biomedical Engineering",
  //       email: "omar.qureshi@example.com",
  //       profile: "https://i.pravatar.cc/150?img=12",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 13,
  //       name: "Huda Ansari",
  //       department: "Computer Science and Engineering",
  //       email: "huda.ansari@example.com",
  //       profile: "https://i.pravatar.cc/150?img=13",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 14,
  //       name: "Yusuf Rahim",
  //       department: "Electrical and Electronics Engineering",
  //       email: "yusuf.rahim@example.com",
  //       profile: "https://i.pravatar.cc/150?img=14",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 15,
  //       name: "Nadia Jameel",
  //       department: "Electronics and Communication",
  //       email: "nadia.jameel@example.com",
  //       profile: "https://i.pravatar.cc/150?img=15",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 16,
  //       name: "Bilal Kareem",
  //       department: "Mechanical Engineering",
  //       email: "bilal.kareem@example.com",
  //       profile: "https://i.pravatar.cc/150?img=16",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 17,
  //       name: "Inaya Nadeem",
  //       department: "Civil Engineering",
  //       email: "inaya.nadeem@example.com",
  //       profile: "https://i.pravatar.cc/150?img=17",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 18,
  //       name: "Kabir Mirza",
  //       department: "Information Technology",
  //       email: "kabir.mirza@example.com",
  //       profile: "https://i.pravatar.cc/150?img=18",
  //       isRegistered: false,
  //     },
  //     {
  //       id: 19,
  //       name: "Anaya Zafar",
  //       department: "Biomedical Engineering",
  //       email: "anaya.zafar@example.com",
  //       profile: "https://i.pravatar.cc/150?img=19",
  //       isRegistered: true,
  //     },
  //     {
  //       id: 20,
  //       name: "Tariq Baig",
  //       department: "Electrical and Electronics Engineering",
  //       email: "tariq.baig@example.com",
  //       profile: "https://i.pravatar.cc/150?img=20",
  //       isRegistered: false,
  //     },
  //   ];
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
  return (
    <div className="p-2 sm:p-0  ">
      <div>
        <h1 className="font-lexend text-subheading">Student Lists</h1>
        <p className="font-inter text-body text-gray-400 mb-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          dolorum ut ad voluptates quaerat consectetur!
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
