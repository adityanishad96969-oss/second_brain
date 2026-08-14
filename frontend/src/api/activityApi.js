
import api from "./api";

export const getActivities = async () => {
  const response = await api.get("/activity/");
  return response.data;
};