import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import UserList from '../components/UserList';
import Paging from '../components/Paging';
const FacultyList = () => {
  const data = [
  {
    id: 1,
    name: "Dr. Aamir Khan",
    department: "Computer Science and Engineering",
    email: "aamir.khan@example.com",
    profile: "https://i.pravatar.cc/150?img=21",
    projects: 3,
  },
  {
    id: 2,
    name: "Prof. Fatima Sheikh",
    department: "Information Technology",
    email: "fatima.sheikh@example.com",
    profile: "https://i.pravatar.cc/150?img=22",
    projects: 1,
  },
  {
    id: 3,
    name: "Dr. Rehan Mirza",
    department: "Electrical and Electronics Engineering",
    email: "rehan.mirza@example.com",
    profile: "https://i.pravatar.cc/150?img=23",
    projects: 0,
  },
  {
    id: 4,
    name: "Prof. Ayesha Nadeem",
    department: "Mechanical Engineering",
    email: "ayesha.nadeem@example.com",
    profile: "https://i.pravatar.cc/150?img=24",
    projects: 4,
  },
  {
    id: 5,
    name: "Dr. Imran Baig",
    department: "Civil Engineering",
    email: "imran.baig@example.com",
    profile: "https://i.pravatar.cc/150?img=25",
    projects: 2,
  },
  {
    id: 6,
    name: "Prof. Mariam Khan",
    department: "Biomedical Engineering",
    email: "mariam.khan@example.com",
    profile: "https://i.pravatar.cc/150?img=26",
    projects: 1,
  },
  {
    id: 7,
    name: "Dr. Hamza Yusuf",
    department: "Computer Science and Engineering",
    email: "hamza.yusuf@example.com",
    profile: "https://i.pravatar.cc/150?img=27",
    projects: 3,
  },
  {
    id: 8,
    name: "Prof. Zara Siddiqui",
    department: "Electronics and Communication",
    email: "zara.siddiqui@example.com",
    profile: "https://i.pravatar.cc/150?img=28",
    projects: 0,
  },
  {
    id: 9,
    name: "Dr. Bilal Qureshi",
    department: "Information Technology",
    email: "bilal.qureshi@example.com",
    profile: "https://i.pravatar.cc/150?img=29",
    projects: 2,
  },
  {
    id: 10,
    name: "Prof. Huda Jameel",
    department: "Mechanical Engineering",
    email: "huda.jameel@example.com",
    profile: "https://i.pravatar.cc/150?img=30",
    projects: 4,
  },
];

  const [search, setSearch] = useState('');
  const handleSearch = (e)=>{
    setSearch(e.target.value);
  }

  const searchedData = data.filter((d)=> d.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className='p-2 sm:p-0'>
      <div>
        <h1 className='font-lexend text-subheading'>Faculty Lists</h1>
        <p className='font-inter text-body text-gray-400 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci repellendus sint dolor. Blanditiis, repellendus impedit?</p>
      </div>
      <div className='mb-4'>
        <SearchBar value={search} handleChange={handleSearch}/>
      </div>
      <div>
        <UserList user={"faculty"} data={searchedData} col2={"Name"} col3={"Department"} col4={"Email"}/>
      </div>
      <div className='mt-4'>
        <Paging/>
      </div>
    </div>
  )
}

export default FacultyList
