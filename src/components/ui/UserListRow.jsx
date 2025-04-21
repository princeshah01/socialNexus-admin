import React, { useState } from "react";
import { statusColors } from "../../utils/helperFunctions";
import { Table } from "react-daisyui";
import { CheckCircle, EllipsisIcon, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const UserListRow = ({
  profilePicture,
  userName,
  email,
  locationName,
  createdAt,
  isOnline,
  issueCount,
  _id,
  idx,
}) => {
  const [actionOpen, setActionOpen] = useState(false);

  return (
    <Table.Row className="hover:bg-base-200">
      <span>{idx + 1} .</span>
      <div className="flex items-center space-x-2 truncate w-15 lg:w-fit ">
        <img
          className="w-[60px] h-[60px] rounded-full object-cover"
          src={profilePicture}
        />
        <div>
          <div className="font-bold">@{userName}</div>
          <span className="text-sm opacity-50 capitalize">{locationName}</span>
        </div>
      </div>
      <div>{email}</div>
      <div>{new Date(createdAt).toDateString()}</div>
      <div>
        <span className={`${statusColors[isOnline ? "Active" : "InActive"]}`}>
          {isOnline ? "Online" : "offline"}
        </span>
      </div>
      <span>{issueCount}</span>
      <div className="relative">
        <button
          onClick={() => {
            setActionOpen(!actionOpen);
          }}
          className="p-1 rounded-sm opacity-75 hover:opacity-100 bg-base-300  active:opacity-75"
        >
          <EllipsisIcon />
        </button>

        {actionOpen && (
          <div className="absolute right-10 w-30 h-[4rem] flex flex-col gap-2 bg-base-300 justify-center items-center border-neutral border-2 rounded-xl">
            <Link to={`/users/${_id}`} className="flex  flex-row gap-2">
              <Eye size="18" />
              <span className="text-xs">View Profile</span>
            </Link>
            <div className="flex  flex-row gap-2">
              <CheckCircle size="18" />
              <span className="text-xs">Unban user</span>
            </div>
          </div>
        )}
      </div>
    </Table.Row>
  );
};

export default UserListRow;
