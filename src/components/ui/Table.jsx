import React from "react";
import TableRow from "./TableRow";
const Table = ({ data }) => {
  return (
    <div id="scroll" className="overflow-y-auto ">
      <table className="table">
        <thead>
          <tr>
            {/* <th>
            <input type="checkbox" className="checkbox checkbox-xs" /> 
          </th> */}
            <th>Reported By</th>
            <th>Type</th>
            <th>Reported At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {data.map((row) => (
          <TableRow key={row._id} rowdata={row} />
        ))}
      </table>
    </div>
  );
};

export default Table;
