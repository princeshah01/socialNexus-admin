import React, { useEffect, useState } from "react";
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
import DashboardSkeleton from "../components/ui/SimmerUI/DashBoardPage";
const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    refetchInterval: 3000,
  });
  useEffect(() => {
    if (data) {
      setFilteredData(data?.data?.Issue?.issueRaisedToday);
    }
  }, [data]);
  if (isLoading) {
    // have to create simmer ui
    return <DashboardSkeleton />;
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
  } = data?.data || {};

  const handelSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const newData = issueRaisedToday.filter(
      (item) =>
        item.userId.userName.toLowerCase().includes(query) ||
        item.issueType.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );

    setFilteredData(newData);
  };

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

            <div className="relative w-full h-[400px] overflow-y-auto  border-neutral border-2 rounded-md">
              <div className="sticky gap-4 top-0 z-10 backdrop-blur-xl px-4 h-12 flex justify-end items-center border-b border-neutral rounded-sm">
                <div className="h-full py-2">
                  <input
                    value={searchQuery}
                    onChange={handelSearch}
                    type="text"
                    className="h-full border-1 rounded-lg border-neutral focus:outline-none p-1 shadow-2xl"
                    placeholder="Search"
                    list="issue"
                  />
                  <datalist id="issue">
                    {filteredData &&
                      filteredData.map((d) => (
                        <option key={d._id} value={d.userId.userName} />
                      ))}
                  </datalist>
                </div>
                <Link
                  to="/issues"
                  className="hover:border-b-2 w-fit text-right text-sm"
                >
                  See all
                </Link>
              </div>

              {issueRaisedToday.length > 0 ? (
                <Table data={filteredData} />
              ) : (
                <div className="text-xl flex justify-center h-[80%] w-full items-center">
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
