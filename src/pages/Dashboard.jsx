import React from "react";
import DashboardCard from "../components/ui/DashboardCard";
import { User2 } from "lucide-react";
import RadialChart from "../components/ui/RadialChart";
import DonutChart from "../components/ui/DonutChart";
import LineChart from "../components/ui/LineChart";
import PieChart from "../components/ui/PieChart";
import Table from "../components/ui/Table";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  return (
    <div data-theme="gigaguerilla">
      <div className="flex flex-row justify-between space-y-4 flex-wrap">
        <DashboardCard
          header="Total Users"
          number="231"
          para="10% less then yesterday"
          isWarning={true}
        >
          <User2 />
        </DashboardCard>
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="w-full px-2 pt-3 lg:w-1/3 bg-base-300 border-neutral border-2 rounded-xl">
            <LineChart data={[80, 41, 35, 51, 49, 62, 69]} />
          </div>
          <div className="w-full h-[25rem] lg:w-2/3 bg-base-300 border-neutral border-2 rounded-xl overflow-y-scroll">
            {/* table content */}
            <div className="w-full h-8 px-4 flex justify-end  items-center ">
              <Link
                to="/issues"
                className="hover:border-b-2 w-fit text-right text-sm "
              >
                See all
              </Link>
            </div>
            <Table />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row  gap-4">
          <div className="w-full lg:w-1/3 flex justify-center items-center bg-base-300 border-neutral border-2 rounded-xl">
            <RadialChart
              series={[10, 20, 70]}
              labels={["Male", "Female", "Non-Binary"]}
            />
          </div>
          <div className="w-full lg:w-1/3 flex justify-center items-center bg-base-300 border-neutral border-2 rounded-xl">
            {/* donut */}
            <DonutChart series={[44, 55, 13, 33]} />
          </div>
          <div className="w-full lg:w-1/3 flex justify-center items-center bg-base-300 border-neutral border-2 rounded-xl">
            <PieChart
              series={[10, 20, 70]}
              labels={["Male", "Female", "Non-Binary"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// {/* <DonutChart series={[44, 55, 13, 33]} /> */}
// <LineChart data={[80, 41, 35, 51, 49, 62, 69]} />
