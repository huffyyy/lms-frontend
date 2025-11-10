import { apiInstanceAuth } from "../utils/axios";

export const getOverviews = async () => apiInstance.get("/overviews").then((res) => res.data);
