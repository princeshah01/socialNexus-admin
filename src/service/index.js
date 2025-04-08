import api from "./apiConfig";

export const loginUser = (credentials) => api.post("/admin-login", credentials);
export const verifyOtp = (otp, email) =>
  api.post("/verify-otp-admin", { otp: otp, email: email });
export const resendOtp = (email) => api.post("/send-otp-admin", { email });
export const getUser = () => api.get("/admin-view");
