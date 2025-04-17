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
  // const hours = createdAt.getHours().toString().padStart(2, "0");
  // const minutes = createdAt.getMinutes().toString().padStart(2, "0");
  // const time = `${hours}:${minutes}`;

  return (
    <>
      <tbody>
        <tr>
          <td>
            {/* <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs"
            /> */}
            {idx + 1}
          </td>
          <td>{userName}</td>
          <td>{issueType}</td>
          <td>{createdAt}</td>

          <td>
            <p
              className={`${statusColors[status]} text-base-100 flex items-center justify-center py-1 rounded-lg w-20`}
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
