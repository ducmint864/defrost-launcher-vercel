"use client";
import React from "react";

function LaunchpadPage() {
  return (
    <div className="p-5 font-sans #16202B min-h-screen ">
      {/* Upcoming Project Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Upcoming Project</h2>
        <div className="flex items-center justify-between">
          <button className="bg-gray-400 text-white rounded-full p-3 text-lg hover:bg-gray-500">
            {"<"}
          </button>
          <div className="flex justify-center gap-5 flex-1">
            <div className="w-36 h-52 border-2 border-gray-300 rounded-lg bg-gray-50"></div>
            <div className="w-36 h-52 border-2 border-gray-300 rounded-lg bg-gray-50"></div>
            <div className="w-36 h-52 border-2 border-gray-300 rounded-lg bg-gray-50"></div>
          </div>
          <button className="bg-gray-400 text-white rounded-full p-3 text-lg hover:bg-gray-500">
            {">"}
          </button>
        </div>
        <button className="mt-4 bg-gray-300 py-2 px-5 rounded-lg hover:bg-gray-400">
          Add Project
        </button>
      </div>

      {/* Funded Project Section */}
      {/* <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Funded Project</h2>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-gray-200 p-4 rounded-lg text-center">
            Funded Projects:
          </div>
          <div className="bg-gray-200 p-4 rounded-lg text-center">
            Unique Participants:
          </div>
          <div className="bg-gray-200 p-4 rounded-lg text-center">
            Total raised:
          </div>
        </div>
      </div> */}

      {/* Table Section */}
      <div className=" rounded-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">Project Name</th>
              <th className="p-2 border-b">Type</th>
              <th className="p-2 border-b">Participants</th>
              <th className="p-2 border-b">Raised fund</th>
              <th className="p-2 border-b">End Date</th>
            </tr>
          </thead>
          <tbody>{/* Add dynamic data rows here */}</tbody>
        </table>
      </div>
    </div>
  );
}

export default LaunchpadPage;
