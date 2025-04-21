import React from "react";
import BackButton from "../components/ui/BackButton";
import DetailsCard from "../components/ui/DetailsCard";
import { Ban } from "lucide-react";
import UserInsights from "../components/ui/UserInsights";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserData } from "../service";
import { toast } from "react-toastify";
const UserDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => getUserData(id),
    enabled: !!id,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    toast.error(error || "unable to fetch user details try again!");
    return <div>Error</div>;
  }
  const {
    userInformation: {
      profilePicture,
      userName,
      fullName,
      createdAt,
      email,
      isOnline,
    },
    issuesRaisedByUser,
  } = data?.data?.data || {};
  return (
    data && (
      <div className="relative w-full h-full overflow-y-auto  rounded-xl">
        <div className="sticky gap-4 top-0 z-10 bg-[#1f1f1f]  backdrop-blur-[1px] px-4 h-12 flex justify-between  items-center  border-t border-x border-base-200 rounded-t-xl">
          <BackButton />
        </div>

        <div className=" gradient border-x-1 border-base-200 h-27 w-full" />
        <div className="avatar absolute top-24 left-10 bg-base-300 p-[5px] rounded-full">
          <div className="w-24 rounded-full">
            <img
              src={
                profilePicture
                  ? profilePicture
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
        <div className="bg-base-300 w-full  px-10 gap-5 flex flex-col pb-10 lg:h-[60vh] rounded-b-xl">
          <div className="pt-12  flex flex-row justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-wider">
                {fullName}
              </h1>
              <h1>@{userName}</h1>
            </div>
            <button
              disabled={true}
              className="self-end bg-warning flex flex-row p-1 rounded-sm items-center gap-1 disabled:opacity-25"
            >
              <Ban size={18} />
              <span>BanUser</span>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 h-76 flex flex-col gap-1">
              <h4 className="text-xl font-semibold">User Information</h4>
              <div className=" bg-base-100 p-4 py-4 border-neutral border-2 h-full rounded-xl">
                <div className="w-[80%] flex flex-col gap-2">
                  <DetailsCard
                    IconName="Mail"
                    header="Email"
                    text={email}
                    textSize={16}
                  />
                  <DetailsCard
                    IconName="CalendarDays"
                    header="Joined"
                    text={new Date(createdAt).toLocaleString()}
                    textSize={16}
                  />
                  <DetailsCard
                    IconName="Flag"
                    header="Reports"
                    text={issuesRaisedByUser.length}
                    textSize={16}
                  />
                  <DetailsCard
                    IconName="User"
                    header="Status"
                    text={isOnline ? "Active" : "InActive"}
                    textSize={16}
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 h-full flex flex-col gap-1">
              <h4 className="text-xl font-semibold">User Insights</h4>
              <UserInsights />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserDetails;
