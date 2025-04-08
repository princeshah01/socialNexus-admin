import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: null,
    token: null,
    isOtpSent: null,
    sendingOtp: null,
    isLoading: null,
    isError: false,
    userInfo: {},
    streamId: null,
  },
  reducers: {
    otpSending: (state) => {
      state.sendingOtp = true;
    },
    otpSent: (state) => {
      state.sendingOtp = false;
      state.isOtpSent = true;
    },
    failedSendingOtp: (state) => {
      state.sendingOtp = false;
    },
    fetchingInit: (state) => {
      state.isLoading = true;
    },
    fetchingDone: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload.token;
      state.streamKey = action.payload.streamKey;
      state.streamId = action.payload.userInfo.streamId;
      state.userInfo = action.payload.userInfo;
    },
    fetchingfailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    updateUser: (state, action) => {},
    logout: (state, action) => {},
  },
});

export const {
  fetchingInit,
  fetchingDone,
  fetchingfailed,
  updateUser,
  logout,
  otpSending,
  otpSent,
  failedSendingOtp,
} = authSlice.actions;
export default authSlice.reducer;
