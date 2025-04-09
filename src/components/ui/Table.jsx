import React from "react";
import { Ellipsis, Eye, ScanEye } from "lucide-react";
const Table = () => {
  return (
    <div id="scroll" className="overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="checkbox checkbox-xs" />
            </th>
            <th>Reported By</th>
            <th>Type</th>
            <th>Reported At</th>
            <th>Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs"
              />
            </td>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>3:00PM</td>

            <td>
              <span className="bg-warning w-fit py-1 px-2 rounded-lg">
                Blue
              </span>
            </td>
            <td className="">
              <botton className="">
                <ScanEye size={20} />
              </botton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
