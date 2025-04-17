import React, { useEffect, useState } from "react";
import LucideIcon from "./LucideIcon";
import { statusColors } from "../../utils/helperFunctions";
import { getIcon } from "../../utils/helperFunctions";
const DetailsCard = ({ IconName, header, text }) => {
  const [isStatus, setIsStatus] = useState(null);
  const [iconName, setIconName] = useState("");
  useEffect(() => {
    if (header.includes("Status")) {
      setIsStatus(true);
      setIconName(getIcon[text]);
    }
  }, [text]);
  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/10 p-1 flex items-start justify-center ">
        <LucideIcon name={isStatus ? iconName : IconName} />
      </div>
      <div className="w-9/10 ">
        <div className="text-lg tracking-wide" style={{ color: "gray" }}>
          {header}
        </div>
        <span
          className={`text-lg tracking-wide opacity-90 ${
            isStatus ? statusColors[text] : ""
          } rounded-sm px-2 py-0.5`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default DetailsCard;
