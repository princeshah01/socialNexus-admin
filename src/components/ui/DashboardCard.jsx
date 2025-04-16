import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const DashboardCard = ({
  header,
  number,
  increasedPercentage,
  isWarning = null,
  children,
}) => {
  return (
    <div className="flex flex-col w-[48%] lg:w-[24%]  h-36  bg-base-300  border-2 border-neutral rounded-xl p-3">
      <div className="h-2/3 flex justify-between">
        <div>
          <h3 className="opacity-70">{header}</h3>
          <span className="font-bold text-3xl">{number}</span>
        </div>
        <div className="">
          <div className="w-14 h-14 border-2 border-neutral rounded-xl bg-base-100 flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
      <div
        className={`h-1/3 text-${
          isWarning ? "warning" : "success"
        } flex flex-row gap-2`}
      >
        {isWarning == null ? null : isWarning == true ? (
          <ArrowDown color="oklch(70% 0.191 22.216)" />
        ) : (
          <ArrowUp color="oklch(79% 0.209 151.711)" />
        )}
        <p>{`${
          increasedPercentage ? ` by ${increasedPercentage} % ` : "No change"
        } since yesterday`}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
