import React, { useEffect, useState } from "react";
import LucideIcon from "./LucideIcon";
import { statusColors } from "../../utils/helperFunctions";
import { getIcon } from "../../utils/helperFunctions";
const DetailsCard = ({
  IconName,
  header,
  text,
  textSize,
  iconSize,
  gap = 0,
}) => {
  const [isStatus, setIsStatus] = useState(null);
  const [iconName, setIconName] = useState("");
  useEffect(() => {
    if (header.includes("Status")) {
      setIsStatus(true);
      setIconName(getIcon[text]);
    }
  }, [text]);
  return (
    <div className="flex flex-row gap-1">
      <div className="w-1/10 p-1 flex items-start justify-center ">
        <LucideIcon name={isStatus ? iconName : IconName} size={iconSize} />
      </div>
      <div className="w-9/10 flex flex-col" style={{ gap: gap }}>
        <div
          className="text-lg tracking-wide"
          style={{ color: "gray", fontSize: textSize }}
        >
          {header}
        </div>
        <span
          className={`text-lg tracking-wide opacity-90 ${
            isStatus ? `${statusColors[text]} w-fit border-2 px-2` : ""
          } rounded-sm  py-0.5`}
          style={{
            fontSize: textSize,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default DetailsCard;
