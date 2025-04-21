export const getWarning = (increasedPercentage) => {
  if (increasedPercentage == 0) {
    return null;
  } else if (increasedPercentage > 0) {
    return false;
  } else {
    return true;
  }
};
export const statusColors = {
  Pending: "text-error",
  Resolved: "text-success",
  InProgress: "text-info",
  Rejected: "text-warning",
  Active: "text-success",
  InActive: "text-warning",
};

export const getIcon = {
  Pending: "CircleSlash",
  Resolved: "CheckCircle",
  InProgress: "Clock",
  Rejected: "CircleX",
  Active: "ShieldCheck",
  InActive: "ShieldX",
};
