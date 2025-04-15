import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getIssueDetails } from "../service";
import BackButton from "../components/ui/BackButton";
const IssueDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["queryDetails", id],
    queryFn: () => getIssueDetails(id),
  });
  console.log(data, isLoading, isError, error);
  return (
    <div>
      <div className="w-full gap-6 lg:justify-between flex-col flex lg:flex-row p-5 h-full border-2 border-neutral rounded-2xl bg-base-300">
        <div className="lg:w-3/4 h-64 bg-base-100 rounded-xl border-2 border-neutral"></div>
        <div className="lg:w-1/4 h-58 bg-base-100 rounded-xl border-2 border-neutral px-5 py-2">
          <p>Issue Details</p>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
