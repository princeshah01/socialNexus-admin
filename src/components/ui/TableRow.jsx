import React from "react";
import { ScanEye } from "lucide-react";
import { statusColors } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";

const TableRow = ({ rowdata }) => {
  let {
    _id,
    userId: { userName },
    status,
    issueType,
    createdAt,
  } = rowdata;
  createdAt = new Date(createdAt);
  const hours = createdAt.getHours().toString().padStart(2, "0");
  const minutes = createdAt.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return (
    <>
      <tbody>
        <tr>
          {/* <td>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs"
            />
          </td> */}
          <td>{userName}</td>
          <td>{issueType}</td>
          <td>{`${time} ${hours > 12 ? "PM" : "AM"}`}</td>

          <td>
            <span
              className={`bg-${statusColors[status]} text-base-100 w-fit py-1 px-2 rounded-lg`}
            >
              {status}
            </span>
          </td>
          <td className="flex gap-4">
            <div />
            <Link to={`/issues/${_id}`} className="">
              <ScanEye size={20} />
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableRow;
