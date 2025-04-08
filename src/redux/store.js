import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./slice/AuthSlice";
const AppStore = configureStore({
  reducer: {
    Auth: Authreducer,
  },
});

export default AppStore;
