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
  Pending: "warning",
  Resolved: "success",
  InProgress: "info",
  Rejected: "error",
};
