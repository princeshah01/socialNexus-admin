import React from "react";
import { BadgeAlert, Handshake, MessageCircleHeart, User2 } from "lucide-react";

const DashboardSkeleton = () => {
  return (
    <div data-theme="gigaguerilla" className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="card rounded-xl bg-base-200 h-32 animate-pulse border-neutral border-2"
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="h-6 w-24 bg-base-300 rounded"></div>
                <div className="h-10 w-10 bg-base-300 rounded-full"></div>
              </div>
              <div className="h-8 w-16 bg-base-300 rounded mt-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Section Skeleton */}
      <div className="flex flex-col gap-6">
        {/* First Row - Line Chart and Issues Table */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/3 h-[400px]  bg-base-200 border-neutral border-2 rounded-xl p-4 animate-pulse h-64">
            <div className="h-full w-full bg-base-300 rounded"></div>
          </div>

          <div className="relative w-full lg:w-2/3 h-[400px] overflow-y-auto border-neutral border-2 rounded-md animate-pulse">
            <div className="sticky top-0 z-10 backdrop-blur-xl px-4 h-12 flex justify-between items-center border-b border-neutral rounded-sm">
              <div className="h-6 w-32 bg-base-300 rounded"></div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-32 bg-base-300 rounded"></div>
                <div className="h-6 w-16 bg-base-300 rounded"></div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="h-12 w-full bg-base-300 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Charts Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((chart) => (
            <div
              key={chart}
              className="bg-base-200 border-neutral border-2 rounded-xl p-4 animate-pulse h-64"
            >
              <div className="h-full w-full bg-base-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
