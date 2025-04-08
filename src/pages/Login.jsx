import OtpVerification from "../components/ui/OtpVerification";
import LoginBox from "../components/ui/LoginBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../service";
import { useNavigate } from "react-router-dom";
import {
  fetchingDone,
  fetchingfailed,
  fetchingInit,
} from "../redux/slice/AuthSlice";
const Login = () => {
  const navigate = useNavigate();
  const { isOtpSent, isAuthenticated, isLoading } = useSelector(
    (store) => store.Auth
  );
  console.log(isLoading);
  console.log(isAuthenticated);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async function () {
      dispatch(fetchingInit());
      try {
        let response = await getUser();
        if (response.status === 200) {
          dispatch(fetchingDone({ ...response?.data?.data, token }));
        }
      } catch (error) {
        dispatch(fetchingfailed());
        console.log(error);
      }
    })();
  }, [token]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className="w-full h-[100vh] bg-base-100"></div>;
  }
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
};

export default Login;
