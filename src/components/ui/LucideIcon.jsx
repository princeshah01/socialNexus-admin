import React from "react";
import * as Icon from "lucide-react";
const LucideIcon = ({ name, size = 26 }) => {
  const IconComponent = Icon[name];
  if (!IconComponent) {
    return <Icon.HelpCircle size={size} color={"gray"} />;
  }
  return <IconComponent size={size} color={"gray"} />;
};
export default LucideIcon;
