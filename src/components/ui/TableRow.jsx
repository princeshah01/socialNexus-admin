import React from "react";
import { ScanEye } from "lucide-react";
import { statusColors } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";

const TableRow = ({ rowdata, idx }) => {
  let {
    _id,
    userId: { userName },
    status,
    issueType,
    createdAt,
  } = rowdata;
  createdAt = new Date(createdAt).toLocaleString();

  return (
    <>
      <tbody>
        <tr>
          <td>{idx + 1}</td>
          <td>{userName}</td>
          <td>{issueType}</td>
          <td>{createdAt}</td>

          <td>
            <p
              className={`${statusColors[status]} border-2 text-base-100 flex items-center justify-center py-[2px] opacity-70 rounded-lg w-18`}
            >
              {status}
            </p>
          </td>
          <td className="flex gap-4">
            <div />
            <Link to={`/issues/${_id}`} className="hover:scale-110">
              <ScanEye size={20} />
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableRow;
