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
  Pending: "bg-error",
  Resolved: "bg-success",
  InProgress: "bg-info",
  Rejected: "bg-warning",
};

export const getIcon = {
  Pending: "CircleSlash",
  Resolved: "CheckCircle",
  InProgress: "Clock",
  Rejected: "CircleX",
};

