import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getIssueDetails } from "../service";
import IssueCard from "../components/ui/IssueCard";
import { toast } from "react-toastify";
const IssueDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["issueDetails", id],
    queryFn: () => getIssueDetails(id),
  });
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError && error) {
    toast.error(error);
  }
  if (data)
    return (
      <div>
        <div className="w-full  flex-col flex lg:flex-row  border-2 border-neutral rounded-2xl bg-base-300">
          <IssueCard
            key={JSON.stringify(data?.data?.data)}
            data={data?.data?.data}
          />
        </div>
      </div>
    );
};

export default IssueDetails;
