import React from "react";
import TableRow from "./TableRow";
const Table = ({ data }) => {
  return (
    <div id="scroll" className="overflow-y-auto ">
      <table className="table">
        <thead className="">
          <tr>
            <th>S.No.</th>
            <th>Reported By</th>
            <th>Type</th>
            <th>Reported At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {data.map((row, idx) => (
          <TableRow key={row._id} rowdata={row} idx={idx} />
        ))}
      </table>
    </div>
  );
};

export default Table;
