import React from "react";
import DashboardCard from "../components/ui/DashboardCard";
import {
  BadgeAlert,
  Handshake,
  MessageCircleHeart,
  User2,
  Users,
} from "lucide-react";
import RadialChart from "../components/ui/RadialChart";
import DonutChart from "../components/ui/DonutChart";
import LineChart from "../components/ui/LineChart";
import PieChart from "../components/ui/PieChart";
import Table from "../components/ui/Table";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../service";
import { getWarning } from "../utils/helperFunctions";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    // refetchInterval: 5000,
  });
  console.log(data, "--data", isLoading, "---isloading", error);

  if (isLoading) {
    // have to create simmer ui
    return <div>Loading</div>;
  }
  if (isError) {
    toast.error(error.response.data.message);
    return <>{error.response.data.message}</>;
  }
  const {
    Issue: {
      totalIssueCount,
      issueRaisedToday,
      increasedPercentage: totalIssueIncreasedPercentage,
      issueCountBasedOnstatus,
      todayIssueCountBasedOnStatus,
    },
    totalMatch: {
      totalMatchCount,
      increasedPercentage: totalMatchIncreasedPercentage,
    },
    totaluser: { totalUser, increasedPercentage },

    totalMessages: {
      totalMessagesCount,
      increasedPercentage: totalMessageIncreasePercentage,
    },
    genderBasedCount,
    userCountPerWeek,
  } = data.data;
  console.log(genderBasedCount);
  return (
    data && (
      <div data-theme="gigaguerilla">
        <div className="flex flex-row justify-between space-y-4 flex-wrap">
          <DashboardCard
            header="Total Users"
            number={totalUser}
            increasedPercentage={increasedPercentage}
            isWarning={getWarning(increasedPercentage)}
          >
            <User2 />
          </DashboardCard>
          <DashboardCard
            header="Total Matches"
            number={totalMatchCount}
            increasedPercentage={totalMatchIncreasedPercentage}
            isWarning={getWarning(totalMatchIncreasedPercentage)}
          >
            <Handshake />
          </DashboardCard>
          <DashboardCard
            header="Total Messages"
            number={totalMessagesCount}
            increasedPercentage={totalMessageIncreasePercentage}
            isWarning={getWarning(totalMessageIncreasePercentage)}
          >
            <MessageCircleHeart />
          </DashboardCard>
          <DashboardCard
            header="Total Issues"
            increasedPercentage={totalIssueIncreasedPercentage}
            number={totalIssueCount}
            isWarning={getWarning(totalIssueIncreasedPercentage)}
          >
            <BadgeAlert />
          </DashboardCard>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="w-full px-2 pt-3 lg:w-1/3 bg-base-300 border-neutral border-2 rounded-xl">
              <LineChart data={userCountPerWeek} />
            </div>
            <div className="w-full h-[24rem] lg:w-2/3 bg-base-300 border-neutral border-2 rounded-xl overflow-y-scroll">
              {/* table content */}
              <div className="w-full h-8 px-4 flex justify-end  items-center ">
                <Link
                  to="/issues"
                  className="hover:border-b-2 w-fit text-right text-sm "
                >
                  See all
                </Link>
              </div>
              {issueRaisedToday ? (
                <Table data={issueRaisedToday} />
              ) : (
                <div className="flex justify-center h-[80%] w-full">
                  No issue raised today
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  gap-4">
            <div className="w-full lg:w-1/3 flex justify-center items-center bg-base-300 border-neutral border-2 rounded-xl">
              <RadialChart
                data={todayIssueCountBasedOnStatus}
                series={[10, 20, 70]}
                labels={["Male", "Female", "Non-Binary"]}
              />
            </div>
            <div className="w-full lg:w-1/3 flex justify-center items-center bg-base-300 border-neutral border-2 rounded-xl">
              {/* donut */}
              <DonutChart
                data={issueCountBasedOnstatus}
                series={[44, 55, 13, 33]}
              />
            </div>
            <div className="w-full lg:w-1/3 flex justify-center items-center bg-base-300 border-neutral border-2 rounded-xl">
              <PieChart data={genderBasedCount} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;

// {/* <DonutChart series={[44, 55, 13, 33]} /> */}
// <LineChart data={[80, 41, 35, 51, 49, 62, 69]} />
