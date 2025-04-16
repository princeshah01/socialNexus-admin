import React from "react";
import BackButton from "./BackButton";
import DetailsCard from "./DetailsCard";
import { Link } from "react-router-dom";
import LucideIcon from "./LucideIcon";

const IssueCard = ({ data }) => {
  console.log(data, "-----------");
  const {
    message,
    createdAt,
    issueType,
    status,
    userId: { userName },
  } = data;
  console.log(createdAt);
  const raisedAt = new Date(createdAt).toLocaleString();
  return (
    <div className="w-full h-full flex-col flex gap-6">
      <div className="flex flex-row border-neutral  border-b-2 py-3 px-5 w-full justify-between">
        <BackButton />
        <p className="text-2xl tracking-wide font-bold ">Issue Details</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mx-5 my-5 ">
        <div className="w-full lg:w-3/4">
          <div className="p-3 gap-3 flex flex-col bg-base-100 border-2 border-neutral rounded-2xl">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="bg-base-300 p-3 text-lg opacity-90 rounded-2xl min-h-16">
                {message}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Response</h2>
              <textarea
                placeholder="Add a note about this status update..."
                rows="5"
                className="bg-base-300 p-3 rounded-2xl resize-none  focus:outline-2 outline-neutral text-lg"
              ></textarea>
            </div>
            <div className="flex flex-row items-center justify-end gap-8 pr-4 ">
              <p>Mark As:</p>
              <span className="rounded-sm p-1 text-base-100 bg-success opacity-70 hover:opacity-100 hover:scale-105 transform ease-in-out ">
                Resolved
              </span>
              <span className="bg-error rounded-sm p-1 text-base-100 opacity-70 hover:opacity-100 hover:scale-105 transform ease-in-out ">
                Closed
              </span>
              <span className="bg-info rounded-sm p-1 text-base-100 opacity-70 hover:opacity-100 hover:scale-105 transform ease-in-out ">
                InProgress
              </span>
            </div>
          </div>
        </div>
        <div className="w-full  flex flex-col gap-5  lg:w-1/4 ">
          <div className="p-3 flex flex-col gap-[0.5rem] bg-base-100 border-2 border-neutral rounded-2xl">
            <DetailsCard
              IconName="User"
              header="Reported by:"
              text={userName}
            />
            <DetailsCard
              IconName="CalendarDays"
              header="Reported At:"
              text={raisedAt}
            />
            <DetailsCard IconName="Flag" header="Type:" text={issueType} />
            <DetailsCard IconName="Clock" header="Status:" text={status} />
          </div>
          <Link className="btn rounded-2xl flex flex-row items-center gap-3">
            <LucideIcon name="CircleUser" />
            <span className="opacity-90 tracking-wider text-[14px]">
              View User Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
