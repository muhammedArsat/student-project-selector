import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import UserList from '../components/UserList';
import Paging from '../components/Paging';
import { toast } from 'react-toastify';
import { getFaculty } from '../apis/AdminApis';
const FacultyList = () => {
  const [data, setData] = useState([]);

  const fetchFacultyList = async()=>{
    try{
      const res = await getFaculty();
      if(res.ok){
        setData(res.faculty)
      }
    }catch(err){
      toast.error('Something went wrong')
    }
  }

  useEffect(()=>{
    fetchFacultyList();
  },[])

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
        <UserList user={"faculty"} data={searchedData} col2={"Name"} col3={"Department"} col4={"Email"} />
      </div>
      <div className='mt-4'>
        <Paging/>
      </div>
    </div>
  )
}

export default FacultyList
