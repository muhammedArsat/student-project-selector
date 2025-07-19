import React, { use } from "react";
import DefaultProfile from "../assets/default_profile.png";
const UserList = ({ data, profile, col2, col3, col4, user }) => {
  const lastCol = user === "student" ? "isRegistered" : "projects";
  return (
    <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent h-[400px]">
      <table className="w-full border border-gray-500  rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-dark-bg font-lexend text-body">
          <tr>
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">{col2}</th>
            <th className="p-3 text-left">{col3}</th>
            <th className="p-3 text-left">{col4}</th>
            <th className="p-3 text-left">
              {user === "student" ? "Status" : "Projects"}
            </th>
          </tr>
        </thead>
        <tbody className="font-inter text-body">
          {data.length === 0 ? (
            <td className="colspan text-center p-4 border-b" colSpan={5}>
              No Match Found
            </td>
          ) : (
            data.map((data, _idx) => (
              <tr
                key={_idx}
                className="border-b dark:border-b-gray-600 hover:bg-gray-50 dark:hover:bg-[#2c3136] cursor-pointer"
              >
                <td className="p-4">{_idx + 1}</td>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={data.profile ? data.profile : DefaultProfile}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DefaultProfile;
                    }}
                    alt={`profile ${_idx + 1}`}
                    className="rounded-full w-[40px] h-[40px] object-cover"
                  />
                  <span>{data.name}</span>
                </td>

                <td className="p-4">{data.department}</td>
                <td className="p-4 break-words">{data.email}</td>
                <td className="p-4">
                  {user === "student" ? (
                    <span
                      className={` text-white px-3 py-1 rounded-full text-sm ${
                        data.isRegistered ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {data.isRegistered ? "Registered" : "Pending"}
                    </span>
                  ) : (
                    <span className={` px-3 py-1 rounded-full text-sm`}>
                      {data.limit ?? 0}
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
