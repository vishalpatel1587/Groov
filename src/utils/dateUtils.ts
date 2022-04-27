import { format } from "date-fns";

export const formatDate = (lastUpdateTime: Date): string => {
  if (!lastUpdateTime) {
    return "";
  }

  return format(new Date(lastUpdateTime), "d MMM yyyy");
};
