import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../service";
import {
  fetchingDone,
  fetchingfailed,
  fetchingInit,
} from "../redux/slice/AuthSlice";
import OtpVerification from "../components/ui/OtpVerification";
import LoginBox from "../components/ui/LoginBox";
import Loader from "../components/ui/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOtpSent, isAuthenticated, isLoading } = useSelector(
    (store) => store.Auth
  );
  const [email, setEmail] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(fetchingfailed("No token found"));
      setInitialLoading(false);
      return;
    }

    dispatch(fetchingInit());
    try {
      const response = await getUser();
      if (response.status === 200) {
        dispatch(fetchingDone({ ...response?.data?.data, token }));
      }
    } catch (error) {
      dispatch(
        fetchingfailed(error?.response?.data?.message || "An error occurred")
      );
      localStorage.removeItem("token");
    } finally {
      setInitialLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!initialLoading) return;
      setInitialLoading(false);
      fetchUser();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchUser, initialLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (initialLoading) {
    return <Loader fullScreen />;
  }

  if (isLoading) {
    return <Loader fullScreen />;
  }
  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div
          data-theme="gigaguerilla"
          className="w-96 p-8 rounded-xl shadow-lg bg-base-100 border-2 border-neutral"
        >
          {isOtpSent ? (
            <OtpVerification email={email} />
          ) : (
            <LoginBox email={email} setEmail={setEmail} />
          )}
        </div>
      </div>
    );
  }
};
export default React.memo(Login);
