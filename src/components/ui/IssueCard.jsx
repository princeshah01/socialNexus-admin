import React, { useState } from "react";
import BackButton from "./BackButton";
import DetailsCard from "./DetailsCard";
import { Link } from "react-router-dom";
import LucideIcon from "./LucideIcon";
import { statusColors } from "../../utils/helperFunctions";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIssue } from "../../service";
import { useParams } from "react-router-dom";
const btns = ["Resolved", "Rejected", "InProgress"];
const IssueCard = ({ data }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateIssue,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["issueDetails", id]);
      toast.success(response.data.message);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "unable to update Issue Details"
      );
    },
  });
  const [newResponse, setResponse] = useState("");
  const HandelSumit = (e) => {
    if (newResponse.length <= 10) {
      toast.error("Add some note..");
      return;
    }
    let post = {
      newResponse,
      status: e.target.innerText,
    };
    console.log(post);
    mutate({ id, post });
    // setResponse("");
  };
  const {
    message,
    createdAt,
    issueType,
    status,
    response,
    userId: { userName, _id: Uid },
  } = data;
  const raisedAt = new Date(createdAt).toLocaleString();
  return (
    <div className="w-full h-full flex-col flex gap-6">
      <div className="flex flex-row border-neutral  border-b-2 py-3 px-5 w-full justify-between">
        <BackButton />
        <p className="text-xl tracking-wide font-semibold ">Issue Details</p>
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
                value={
                  response && status === "Resolved" ? response : newResponse
                }
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Add a note about this status update..."
                rows="5"
                className="bg-base-300 p-3 rounded-2xl resize-none  focus:outline-2 outline-neutral text-lg"
              ></textarea>
            </div>
            <div className="flex flex-row items-center justify-end gap-8 pr-4 ">
              <p>Mark As:</p>
              {btns.map((btn) => (
                <button
                  disabled={status === "Resolved"}
                  onClick={HandelSumit}
                  key={btn}
                  className={`${statusColors[btn]} border-2 text-sm rounded-sm p-1  opacity-70 hover:opacity-100 hover:scale-105 transform ease-in-out disabled:hover:scale-100 disabled:opacity-30`}
                >
                  {btn}
                </button>
              ))}
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
            <DetailsCard
              textSize={14}
              IconName="Clock"
              header="Status:"
              text={status}
            />
          </div>
          <Link
            to={`/users/${Uid}`}
            className="btn rounded-2xl flex flex-row items-center gap-3"
          >
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
